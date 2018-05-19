import { RichEmbed } from 'discord.js';
import { CommandDecorators, Client, Command, Message, GuildStorage } from 'yamdbf';

const { guildOnly, aliases, group, name, desc, usage } = CommandDecorators;

@guildOnly
@aliases('run-tag', 'tags')
@group('tag')
@name('tags')
@desc('Run a tag, either by running "<prefix>tagName" or "<prefix>tags tagname')
@usage('<prefix>tags <name>')
export class Tags extends Command<Client> {

    private storage: GuildStorage;

    public async action(message: Message, args: string[]): Promise<void> {
       if (this.storage.exists(`guild_tags.${args[0]}`)) {
            let tag = await this.storage.get(`guild_tags.${args[0]}`);
            message.channel.send(tag);
       } else {
           await message.react('❌');
       }
    }

}
