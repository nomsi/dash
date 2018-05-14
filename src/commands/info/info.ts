import { Client, Command, Message, Time } from 'yamdbf';
import { RichEmbed, Guild } from 'discord.js';

const { version } = require('../../../package');

export default class extends Command<Client> {
    public constructor() {
        super({
            name: 'about',
            aliases: ['info'],
            desc: 'About Dash',
            usage: '[prefix]info',
            group: 'utils',
            guildOnly: true
        });
    }

    public action(message: Message): void {
        const embed: RichEmbed = new RichEmbed()
            .setAuthor('Dash', this.client.user.avatarURL)
            .setColor(0x2ECC71)
            .setDescription(`Dash v${version} is yet another Discord bot.`)
            .addField('Servers', this.client.guilds.size.toString(), true)
            .addField('Channels', this.client.channels.size.toString(), true)
            .addField('Users', this.client.guilds.map((guild: Guild) => guild.memberCount)
                .reduce((memA: number, memB: number) => memA + memB), true)
            .addField('Memory Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb`, true)
            .addField('Uptime', Time.difference(this.client.uptime * 2, this.client.uptime).toString(), true)
            .addField('Help', `To see currently avaliable commands, type <@${this.client.user.id}> help`, true);
        message.channel.send({ embed });
    }
}
