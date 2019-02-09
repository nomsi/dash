import { Client, Command, Message, Time } from '@yamdbf/core';
import { MessageEmbed, Guild } from 'discord.js';

const { version, author } = require('../../../package');

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

    public async action(message: Message): Promise<void> {
        const embed: MessageEmbed = new MessageEmbed()
            .setTitle('Dash')
            .setThumbnail(this.client.user.defaultAvatarURL)
            .setURL('https://dash.nomsy.net/')
            .setColor('007eff')
            .setDescription(`Yet another Discord bot.`)
            .addField('Servers', this.client.guilds.size.toString(), true)
            .addField('Channels', this.client.channels.size.toString(), true)
            .addField('Users', this.client.guilds.map((guild: Guild) => guild.memberCount)
                .reduce((memA: number, memB: number) => memA + memB), true)
            .addField('Memory Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb`, true)
            .addField('Uptime', Time.difference(this.client.uptime * 2, this.client.uptime).toString(), true)
            .addField('\u200b', `To see currently avaliable commands, type <@${this.client.user.id}> help`, true);
        message.channel.send(embed);
    }
}
