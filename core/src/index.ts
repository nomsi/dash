import { pre, createServer, acceptParser, queryParser, bodyParser, sanitizePath, setRoutes, listen } from 'restify';
import * as routes from './routes';
const { version } = require('../package.json');

class Core {

    private server: createServer;

    constructor() {
        this.server = createServer({
            name: 'dash-core',
            version: version
        });
    }

    private init(): void {
        this.server.use(acceptParser(this.server.acceptable));
        this.server.use(queryParser());
        this.server.use(bodyParser());
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