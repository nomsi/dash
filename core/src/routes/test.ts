import { Request, Response, Next } from 'restify';

export function get(req: Request, res: Response, next: Next): void {
    if (req.params.message) {
        res.send(req.params);
    } else {
        res.send(200);
    }
    next();
}
