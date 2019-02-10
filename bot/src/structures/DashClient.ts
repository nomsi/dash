import { Client, ListenerUtil, logger, Logger, LogLevel, Providers, Message, GuildStorage } from '@yamdbf/core';
import { join } from 'path';
import { Lavalink as MusicClient } from 'lavaqueue';
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
     * MusicClient is the handler between {DashClient}|{}
     * that handles the packets between guilds, redis, and
     * Lavaqueue by [https://github.com/appellation](appellation)
     * @class {MusicClient} Lavaqueue alias
     * @description Initialize MusicClient using Lavaqueue
     */
    public music: MusicClient = new MusicClient({
        password: process.env.LAVALINK_PASS || 'thisistheendtimes'!,
        userID: this.user.id,
        hosts: {
            rest: `http://${process.env.LAVALINK_HOST || 'lavalink'}:8081`,
            ws: `ws://${process.env.LAVALINK_HOST || 'lavalink'}:8080`,
            redis: process.env.REDIS
        },
        send: async (guild: string, packet: any): Promise<void> => {
            if (this.guilds.has(guild)) {
                await (this as any).ws.send(packet);
            }
        }
    });

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
    }

}
