import { RichEmbed } from 'discord.js';
import { CommandDecorators, Client, Command, Message, GuildStorage } from 'yamdbf';

const { guildOnly, aliases, group, name, desc, usage } = CommandDecorators;

@guildOnly
@aliases('manage-tag', 'tag')
@group('tag')
@name('tag')
@desc('Manage tags')
@usage('<prefix>tag [add|delete|update|list] <name> [details]')
export class Tag extends Command<Client> {

    private storage: GuildStorage;

    public async action(message: Message, args: string[]): Promise<void> {

        const action: string = args[0];
        this.storage = message.guild.storage;

        if (!await this.storage.exists('guild_tags')) {
            await this.storage.set('guild_tags', {});
        }

        switch (action) {
            case 'add':
                this.add(message, this.storage, args);
                break;
            case 'delete':
                this.delete(message, this.storage, args);
                break;
            case 'update':
                this.update(message, this.storage, args);
                break;
            case 'list':
                this.list(message, this.storage);
                break;
            default: break;
        }

    }

    /**
     * Add new tag
     * @param {Message} message message object
     * @param {GuildStorage} _storage storage constructor
     * @param {string[]} data argument data
     */
    private async add(message: Message, _storage: GuildStorage, data: string[]): Promise<void> {
        if (await _storage.exists(`guild_tags.${data[1]}`)) {
            message.channel.send(`The tag already exists.`);
        } else {
            await _storage.set(`guild_tags.${data[1]}`, data.slice(2).join(' '));
            message.channel.send(`Tag '${data[1]}' added`);
        }
    }

    /**
     * Delete existing tag
     * @param {Message} message message object
     * @param {GuildStorage} _storage storage constructor
     * @param {string[]} data argument data
     */
    private async delete(message: Message, _storage: GuildStorage, data: string[]): Promise<void> {
        if (!(await _storage.exists(`guild_tags.${data[1]}`))) {
            message.channel.send('Tag doesn\'t exist');
        } else {
            await _storage.remove(`guild_tags.${data[1]}`);
            message.channel.send(`Tag removed.`);
        }
    }

    /**
     * Update existing tag
     * @param {Message} message message object
     * @param {GuildStorage} _storage storage constructor
     * @param {string[]} data argument data
     */
    private async update(message: Message, _storage: GuildStorage, data: string[]): Promise<void> {
        if (!(await _storage.exists(`guild_tags.${data[1]}`))) {
            message.channel.send('Tag doesn\'t exist');
        } else {
            await _storage.set(`guild_tags.${data[1]}`, data.slice(2).join(' '));
            message.channel.send('Tag updated');
        }
    }

    /**
     * Get tag lists
     * @param {Message} message message object
     * @param {GuildStorage} _storage storage constructor
     */
    private async list(message: Message, _storage: GuildStorage): Promise<void> {

        const tagList: object = await _storage.get(`guild_tags`);
        const cb = '```';

        if (Object.keys(tagList).length === 0 && !tagList) {
            message.channel.send('This guild has no tags.');
        } else {
            let embed: RichEmbed = new RichEmbed()
                .setTitle(`Tags for ${message.guild.name}`)
                .setDescription(`${cb}\n${Object.keys(tagList).sort().join(', ')}\n${cb}`);
            message.channel.send({ embed: embed, disableEveryone: true });
        }
    }
}
