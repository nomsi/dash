import { Client as Lavalink } from 'lavaqueue';
import { Client } from 'discord.js';
import * as Redis from 'ioredis';

export class MusicClient extends Lavalink {
    private client: Client;

    /**
     * MusicClient is the handler between {DashClient}|{}
     * that handles the packets between guilds, redis, and
     * Lavalink.js
     * @param {Client} client discord.js client
     */
    public constructor(client: Client) {
        super({
            password: 'thisistheendtimes',
            userID: client.user.id,
            hosts: {
                rest: `http://${process.env.LAVALINK_HOST || 'lavalink'}:8081`,
                ws: `ws://${process.env.LAVALINK_HOST || 'lavalink'}:8080`,
                redis: new Redis(process.env.REDIS)
            },
        });

        this.client = client;
    }

    public async send(guild: string, packet: any) {
        if (this.client.guilds.has(guild)) {
            await (this.client as any).ws.send(packet);
        }
        return Promise.resolve();
    }
}
