import { RedisClient } from 'redis';
import { EventEmitter } from 'events';

export class Redis extends EventEmitter  {
    private emitter: RedisClient;
    private reciever: RedisClient;
    public constructor(emitter: RedisClient, reciever: RedisClient) {
        super();
        this.emitter = emitter;
        this.reciever = reciever;
    }
    public publish(event: string, value: any): void {
        this.emitter.publish(event, JSON.stringify(value));
    }
    private onPubMessage(pattern: string, channel: string, payload: string): void {
       this.emit.apply(this, [pattern, channel]).cancat(JSON.parse(payload));
    }
}
