"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yamdbf_1 = require("yamdbf");
const DashClient_1 = require("./structures/DashClient");
require('dotenv').config();
yamdbf_1.Logger.instance().setLogLevel(yamdbf_1.LogLevel.DEBUG);
const dash = new DashClient_1.DashClient();
dash.start();
process.on('unhandledRejection', (err) => {
    yamdbf_1.Logger.instance().error('PromiseReject', err.message, err.stack);
});
