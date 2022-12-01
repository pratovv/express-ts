import {NextFunction, Request, Response} from "express";

const userService = require('../services/userService')

class UsersController {
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e)
        }
    }

    async signin(req: Request, res: Response, next: NextFunction) {
        try {
            const {id, password} = req.body
            const data = await userService.signin({id, password})
            res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async signinNewToken(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies;
            const data = await userService.signinNewToken(refreshToken)
            res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const {id, password} = req.body;
            const data = await userService.signup({id, password})
            res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async getMyInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req['user'];
            const data = await userService.info(id)
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UsersController()