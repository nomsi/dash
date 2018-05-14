import { CommandDecorators as c, Client, Command, Message, Guild } from 'yamdbf';
import { GuildMember, RichEmbed, User } from 'discord.js';
import * as moment from 'moment';

@c.aliases('ui', 'userinfo')
@c.info('Shows information about a user')
@c.group('info')
export class UserInfo extends Command<Client> {
    public constructor() {
        super({
            name: 'user-info',
            desc: 'Shows information about a user',
            usage: '<prefix>user-info [member]'
        });
    }
    public async action(message: Message, [member]: [GuildMember]): Promise<void> {
        if (!member)
            message.reply('You must provide a valid member!');

        const embed: RichEmbed = new RichEmbed()
            .setColor('007eff')
            .addField('Nickname', `${member.nickname !== null ? `Nick: ${member.nickname}` : 'No nick'}`)
            .addField('Roles', `${member.roles.map((r) => r.name).join(' ')}`)
            .addField('Joined', `${moment.utc(member.joinedTimestamp).fromNow()}`)
            .addField('Created', `${moment.utc(member.user.createdAt).fromNow()}`)
            .addField('Status', `${member.user.presence.status}`)
            .addField('Game', `${member.user.presence.game ? member.user.presence.game.name : 'None'}`);
        message.channel.send({embed: embed});
    }
}
