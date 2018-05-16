
export function applyRoutes(server) {
    server.get('/test', test.get);
    console.log('Routes applied.');
}