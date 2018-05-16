import * as test from './routes/test';

export function applyRoutes(server: any): void {
    server.get('/test', test.get);
    console.log('Routes applied.');
}
