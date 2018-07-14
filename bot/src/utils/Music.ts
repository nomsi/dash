import { Client as Lavalink } from 'lavaqueue';
import { Client } from 'discord.js';

export class LavalinkClient extends Lavalink {
    public constructor(client: Client) {
        super({
            password: '',
            userID: '',
            hosts: {

            }
        });
    }
    public async send(): Promise<void> {
    }
}
