import { Client, Command, Message, Middleware, CommandDecorators } from '@yamdbf/core';
import { GuildMember, MessageEmbed } from 'discord.js';
import * as moment from 'moment';

const { aliases, info, group, using, guildOnly, usage, name, desc } = CommandDecorators;
const { expect, resolve } = Middleware;

@name('user-info')
@desc('Shows information about a user')
@aliases('ui', 'userinfo')
@info('Shows information about a user')
@group('info')
@guildOnly
@usage('<prefix>user-info [member]')
export class UserInfo extends Command<Client> {

    /**
     * Converts Presence to an appropriate color
     * @param {string} status
     * @returns {string}
     */
    private presenceType(status: string): string {
        switch (status) {
            case 'online':
                return '8db600';
            case 'offline':
                return '6e7f80';
            case 'idle':
                return 'ffbf00';
            case 'dnd':
                return 'e32636';
            default:
                return '007eff';
        }
    }

    /**
     * Command for grabbing user information
     * @param {Message} message
     * @param {GuildMember} member
     */
    @using(resolve('member: Member'))
    @using(expect({ 'member': 'Member' }))
    public async action(message: Message, [member]: [GuildMember]): Promise<void> {
        if (!member) message.reply('You must provide a valid member!');

        const embed: MessageEmbed = new MessageEmbed()
            .setColor(this.presenceType(member.user.presence.status))
            .setThumbnail(member.user.defaultAvatarURL)
            .addField('Nickname', `${member.nickname !== null ? `Nick: ${member.nickname}` : 'No nick'}`, true)
            .addField('Roles', `${member.roles.map((r) => '``' + r.name + '``').join(' ')}`, true)
            .addField('Joined', `${moment.utc(member.joinedTimestamp).fromNow()}`, true)
            .addField('Created', `${moment.utc(member.user.createdAt).fromNow()}`, true);
        await message.channel.send(embed);
    }

}
