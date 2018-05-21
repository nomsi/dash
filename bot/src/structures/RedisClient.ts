import { logger, Logger } from 'yamdbf';
import { Client as Cache } from '@spectacles/cache';
import { EventEmitter } from 'events';
import * as Redis from 'ioredis';
import { Guild, UnavailableGuild } from '@spectacles/types';

export class RedisClient extends EventEmitter {

    private redis: Redis.Redis = new Redis(process.env.REDIS);
    private redisSender: Redis.Redis = new Redis(process.env.REDIS);
    public cache: Cache;

    @logger public readonly logger: Logger;

    public constructor() {
        super();

        this.cache = new Cache(this.redis);

        this.redis.psubscribe('web.*', 'bot.*');

        this.redis.on('pmessage', (p: string, c: string, _p: any[]): void => this.onMessage(p, c, _p));
        this.redis.on('ready', (): Promise<void> => this.logger.log('redis', 'Redis reciever ready!'));

        this.redisSender.on('ready', (): Promise<void> => this.logger.log('redis', 'Redis sender ready!'));

        this.redis.on('error', this.onError);
    }

    /**
     * Redis Client Getter
     * @returns {Redis.Redis} redis client
     */
    public get redisClient(): Redis.Redis {
        return this.redis;
    }

    /**
     * On redis client message
     * @param pattern Pattern
     * @param channel Channel
     * @param payload Payload
     */
    private onMessage(pattern: string, channel: string, payload: any[]): void {
        try {
            this.emit(pattern, payload, channel);
        } catch (e) {
            this.onError(e);
        }
    }

    /**
     * Publish to redis channel
     * @param {string} channel Channel name
     * @param {string} message Message
     */
    public publish(channel: string, message: string): void {
        this.redisSender.publish(channel, message);
        this.logger.log('Redis', `Published ${message} to ${channel}.`);
    }

    /**
     * Save guild to cache
     * @param {Guild} guild Guild object
     */
    public async saveGuild(guild: Guild): Promise<void> {
        try {
            await this.cache.actions.guilds.upsert(guild);
            this.logger.log('redis', 'Guild saved to cache.');
        } catch (e) {
            this.logger.log('redis', `Couldn't save guild: ${e.message}`);
        }
    }

    /**
     * Error handler for redis
     * @param {Error} e Error
     */
    private onError(e: Error): void {
        this.logger.log('redis', e.toString());
    }
}
