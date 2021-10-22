import { Request, response, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

class AuthenticateUserController {
    async handle(req: Request, res: Response) {

        const { code } = req.body;

        const service = new AuthenticateUserService();
        try {
            const result = await service.execute(code);

            return res.json(result);
        } catch (err) {
            return res.json({ error: err.message });
        }
    }
}
export { AuthenticateUserController };