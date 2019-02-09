/**
 * @todo Join voice channel command
 */
import { CommandDecorators, Client, Command, Message, GuildStorage } from '@yamdbf/core';
const { guildOnly, aliases, group, name, desc, usage } = CommandDecorators;

@guildOnly
@aliases('join-vc', 'join')
@group('music')
@name('join')
@desc('Join voice channel for music!')
@usage('<prefix>join')
export class Join extends Command<Client> {
    public async action(message: Message, args: string[]): Promise<void> {

    }
}
