import { Logger, LogLevel } from 'yamdbf';
import { DashClient as Client } from './structures/DashClient';

require('dotenv').config();

Logger.instance().setLogLevel(LogLevel.DEBUG);

const dash: Client = new Client();
dash.start();

process.on('unhandledRejection', (err: Error) => {
    Logger.instance().error('PromiseReject', err.message, err.stack);
});
