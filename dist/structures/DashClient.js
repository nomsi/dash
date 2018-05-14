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
const path_1 = require("path");
const { on, once } = yamdbf_1.ListenerUtil;
class DashClient extends yamdbf_1.Client {
    constructor() {
        super({
            owner: process.env.OWNER,
            pause: true,
            plugins: [],
            provider: yamdbf_1.Providers.PostgresProvider(process.env.PGSQL),
            unknownCommandError: true,
            token: process.env.TOKEN,
            commandsDir: path_1.join(__dirname, '..', 'commands')
        }, {
            disableEveryone: true,
            messageCacheMaxSize: 10
        });
    }
    /**
     * Events to handle before Client is ready
     * @returns {Promise<void>}
     */
    onPause() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setDefaultSetting('prefix', process.env.PREFIX);
            this.emit('continue');
        });
    }
    /**
     * Discord.js Debug Event
     * @param {string} message Debug message
     */
    onDebug(message) {
        if (message.includes('Authenticated using token') || message.includes('heartbeat'))
            return;
        this.logger.log('Dash', message);
    }
    /**
     * Discord.js Warn Event
     * @param {string} message Warn message
     */
    onWarn(message) {
        this.logger.warn('Dash', message);
    }
    /**
     * Discord.js Error Event
     * @param {Error} err Error message
     */
    onError(err) {
        this.logger.error('Dash', err.toString());
    }
}
__decorate([
    yamdbf_1.logger
], DashClient.prototype, "logger", void 0);
__decorate([
    once('pause')
], DashClient.prototype, "onPause", null);
__decorate([
    on('debug')
], DashClient.prototype, "onDebug", null);
__decorate([
    on('warn')
], DashClient.prototype, "onWarn", null);
__decorate([
    on('error')
], DashClient.prototype, "onError", null);
exports.DashClient = DashClient;
