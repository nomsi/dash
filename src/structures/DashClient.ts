import { Client, ListenerUtil, logger, Logger, LogLevel, Providers } from 'yamdbf';
import { join } from 'path';
import { GuildMember, User } from 'discord.js';

const { on, once } = ListenerUtil;

export class DashClient extends Client {

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
            unknownCommandError: false,
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
        const guildMemeber: Promise<GuildMember>[] = [];
        for (let guild of this.guilds.values()) {
            if (guild.me) continue;
            guildMemeber.push(guild.fetchMember(this.user));
        }
        await this.setDefaultSetting('prefix', 'd!');
        await Promise.all(guildMemeber);

        this.emit('continue');
    }

    /**
     * Discord.js Debug Event
     * @param {string} message Debug message
     */
    @on('debug')
    public onDebug(message: string): void {
        if (message.includes('Authenticated using token') || message.includes('Heartbeat'))
            return;
        this.logger.log('discord.js', message);
    }

    /**
     * Discord.js Warn Event
     * @param {string} message Warn message
     */
    @on('warn')
    public onWarn(message: string): void {
        this.logger.warn('discord.js', message);
    }

    /**
     * Discord.js Error Event
     * @param {Error} err Error message
     */
    @on('error')
    public onError(err: Error): void {
        this.logger.error('discord.js', err.toString());
    }
}
