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
let UserInfo = class UserInfo extends yamdbf_1.Command {
    constructor() {
        super({
            name: 'user-info',
            desc: 'Shows information about a user',
            usage: '<prefix>user-info [member]'
        });
    }
    action(message, [member]) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!member)
                message.reply('You must provide a valid member!');
            const embed = new discord_js_1.RichEmbed()
                .setColor('007eff')
                .addField('Nickname', `${member.nickname !== null ? `Nick: ${member.nickname}` : 'No nick'}`);
            // .addField('Roles', `${member.roles.map((r) => r.name).join(' ')}`)
            // .addField('Joined', `${moment.utc(member.joinedTimestamp).fromNow()}`)
            // .addField('Created', `${moment.utc(member.user.createdAt).fromNow()}`)
            // .addField('Status', `${member.user.presence.status}`)
            // .addField('Game', `${member.user.presence.game ? member.user.presence.game.name : 'None'}`);
            message.channel.send({ embed: embed });
        });
    }
};
UserInfo = __decorate([
    yamdbf_1.CommandDecorators.aliases('ui', 'userinfo'),
    yamdbf_1.CommandDecorators.info('Shows information about a user'),
    yamdbf_1.CommandDecorators.group('info')
], UserInfo);
exports.UserInfo = UserInfo;
