"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const yamdbf_1 = require("yamdbf");
const discord_js_1 = require("discord.js");
const { version, author } = require('../../../package');
class default_1 extends yamdbf_1.Command {
    constructor() {
        super({
            name: 'about',
            aliases: ['info'],
            desc: 'About Dash',
            usage: '[prefix]info',
            group: 'utils',
            guildOnly: true
        });
    }
    action(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new discord_js_1.RichEmbed()
                .setTitle('Dash')
                .setThumbnail(this.client.user.displayAvatarURL)
                .setURL('https://dash.nomsy.net/')
                .setColor('007eff')
                .setDescription(`Yet another Discord bot.`)
                .addField('Servers', this.client.guilds.size.toString(), true)
                .addField('Channels', this.client.channels.size.toString(), true)
                .addField('Users', this.client.guilds.map((guild) => guild.memberCount)
                .reduce((memA, memB) => memA + memB), true)
                .addField('Memory Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb`, true)
                .addField('Uptime', yamdbf_1.Time.difference(this.client.uptime * 2, this.client.uptime).toString(), true)
                .addField('\u200b', `To see currently avaliable commands, type <@${this.client.user.id}> help`, true)
                .setFooter(`Dash v${version} by ${author}`);
            message.channel.send({ embed }).then((m) => m.react('💯'));
        });
    }
}
exports.default = default_1;
