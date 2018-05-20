import { Client, ListenerUtil, logger, Logger, LogLevel, Providers, Message, GuildStorage } from 'yamdbf';
import { join } from 'path';
import { Guild, GuildMember, User } from 'discord.js';
import { RedisClient } from './RedisClient';

const { on, once } = ListenerUtil;

export class DashClient extends Client {

    @logger public readonly logger: Logger;
    public redis: RedisClient = new RedisClient();

    public constructor() {
        super({
            owner: process.env.OWNER,
            pause: true,
            plugins: [],
            provider: Providers.PostgresProvider(process.env.PGSQL),
            unknownCommandError: true,
            token: process.env.TOKEN,
            commandsDir: join(__dirname, '..', 'commands')
        },
        {
            disableEveryone: true,
            messageCacheMaxSize: 10
        });
    }

    /**
     * Events to handle before Client is ready
     * @todo Music - Lavalink
     * @returns {Promise<void>}
     */
    @once('pause')
    public async onPause(): Promise<void> {
        await this.setDefaultSetting('prefix', process.env.PREFIX);
        await this.setDefaultSetting('volume', 1);
        this.redis.publish('bot.event', 'BOT_PAUSED');
        this.continue();
    }

    /**
     * Discord.js Debug Event
     * @param {string} message Debug message
     */
    @on('debug')
    public onDebug(message: string): void {
        if (message.includes('Authenticated using token') || message.toLocaleLowerCase().includes('heartbeat'))
            return;
        this.logger.log('Dash', message);
    }

    /**
     * Discord.js Warn Event
     * @param {string} message Warn message
     */
    @on('warn')
    public onWarn(message: string): void {
        this.logger.warn('Dash', message);
    }

    /**
     * Discord.js Error Event
     * @param {Error} err Error message
     */
    @on('error')
    public onError(err: Error): void {
        this.logger.error('Dash', err.toString());
        this.redis.publish('bot.error', err.message);
    }

    /**
     * Unknown command handler
     * @param {string} name Command name
     * @param {any[]} args Arguments
     * @param {Message} message Message
     */
    @on('unknownCommand')
    public async onUnknownCommand(name: string, args: any[], message: Message): Promise<void> {
        await this.commands.resolve('tags').action(message, [name]);

        this.redis.publish('bot.unknownCommand', JSON.stringify({
            guild: message.guild.id,
            user: message.member.user.tag,
            command: name
        }));
    }
}
