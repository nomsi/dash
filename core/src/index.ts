import { pre, createServer, Server } from 'restify';
import * as routes from './routes';
const { version } = require('../package.json');

class Core {

    private server: Server;

    constructor() {
        this.server = createServer({
            name: 'dash-core',
            version: version
        });
    }

    private init(): void {
        this.server.pre(pre.sanitizePath());
    }

    private async initRoutes(): Promise<void> {
        await routes.applyRoutes(this.server);
    }

    public start() {
        this.init();
        this.initRoutes();
        this.server.listen(54231, (): void => {
            console.log(`${this.server.name} is up @ ${this.server.url}`);
        });
    }
}

const core: Core = new Core();
core.start();