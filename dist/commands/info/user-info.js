"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const moment = require("moment");
const { aliases, info, group, using, guildOnly, usage, name, desc } = yamdbf_1.CommandDecorators;
const { expect, resolve } = yamdbf_1.Middleware;
let UserInfo = class UserInfo extends yamdbf_1.Command {
    /**
     * Converts Presence to an appropriate color
     * @param {string} status
     * @returns {string}
     */
    presenceType(status) {
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
    action(message, [member]) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!member)
                message.reply('You must provide a valid member!');
            const embed = new discord_js_1.RichEmbed()
                .setColor(this.presenceType(member.user.presence.status))
                .setThumbnail(member.user.displayAvatarURL)
                .addField('Nickname', `${member.nickname !== null ? `Nick: ${member.nickname}` : 'No nick'}`, true)
                .addField('Roles', `${member.roles.map((r) => '``' + r.name + '``').join(' ')}`, true)
                .addField('Joined', `${moment.utc(member.joinedTimestamp).fromNow()}`, true)
                .addField('Created', `${moment.utc(member.user.createdAt).fromNow()}`, true)
                .addField('Game', `${member.user.presence.game ? member.user.presence.game.name : 'None'}`, true);
            message.channel.send({ embed: embed });
        });
    }
};
__decorate([
    using(resolve('member: Member')),
    using(expect({ '<member>': 'Member' }))
], UserInfo.prototype, "action", null);
UserInfo = __decorate([
    name('user-info'),
    desc('Shows information about a user'),
    aliases('ui', 'userinfo'),
    info('Shows information about a user'),
    group('info'),
    guildOnly,
    usage('<prefix>user-info [member]')
], UserInfo);
exports.UserInfo = UserInfo;
