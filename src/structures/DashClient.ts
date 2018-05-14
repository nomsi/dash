import { Client as DClient, ListenerUtil, logger, Logger, LogLevel, Providers } from 'yamdbf';
import { join } from 'path';
import { GuildMember, User } from 'discord.js';

const { Client } = require('@spectacles/cache');
const { on, once } = ListenerUtil;

export class DashClient extends DClient {

    /**
     * @readonly logger singleton
     */
    @logger public readonly logger: Logger;

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
     * @returns {Promise<void>}
     */
    @once('pause')
    public async onPause(): Promise<void> {
        await this.setDefaultSetting('prefix', process.env.PREFIX);
        this.emit('continue');
    }

    /**
     * Discord.js Debug Event
     * @param {string} message Debug message
     */
    @on('debug')
    public onDebug(message: string): void {
        if (message.includes('Authenticated using token') || message.includes('heartbeat'))
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
    }

}
