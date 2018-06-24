import { Client, ListenerUtil, logger, Logger, LogLevel, Providers, Message, GuildStorage } from 'yamdbf';
import { join } from 'path';
import { Guild, GuildMember, User } from 'discord.js';
import { RedisClient } from './RedisClient';
import { Guild as CacheGuild } from '@spectacles/types';

const { on, once } = ListenerUtil;

export class DashClient extends Client {

    @logger public readonly logger: Logger;
    public redis: RedisClient = new RedisClient();
    public test: string;

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

        this.user.setActivity(`for d!help in ${this.guilds.size.toString()} guilds.`, {
            url: `https://dash.nomsy.net/`,
            type: 'WATCHING'
        });

        this.continue();
    }

    /**
     * Triggers when GuildEvent is emitted
     * @returns {Promise<void>}
     */
    @on('guildCreate')
    public async onGuildCreate(): Promise<void> {
        this.user.setActivity(`for d!help in ${this.guilds.size.toString()} guilds.`, {
            url: `https://dash.nomsy.net/`,
            type: 'WATCHING'
        });
    }

    /**
     * Emitted when the bot enters a ready state
     * @returns {void}
     */
    @on('ready')
    public onReady(): void {
        this.redis.publish('bot.event', 'Bot ready!');
    }

    /**
     * Discord.js Debug Event
     * @param {string} message Debug message
     * @returns {void}
     */
    @on('debug')
    public onDebug(message: string): void {
        if (message.includes('Authenticated using token') || message.toLocaleLowerCase().includes('heartbeat'))
            return;
        this.logger.log('Dash', message);
    }

    /**
     * Discord.js warn event
     * @param {string} message Warn message
     * @returns {void}
     */
    @on('warn')
    public onWarn(message: string): void {
        this.logger.warn('Dash', message);
    }

    /**
     * Discord.js error event handler
     * @param {Error} err Error message
     * @returns {void}
     */
    @on('error')
    public onError(err: Error): void {
        this.logger.error('Dash', err.toString());
        this.redis.publish('bot.error', err.message);
    }

    /**
     * Event handler for when an ``unknownCommand`` event is emitted.
     * @param {string} name Command name
     * @param {any[]} args Arguments
     * @param {Message} message Message
     * @returns {Promise<void>}
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
