import {NextFunction, Request, Response} from "express";

const userService = require('../services/userService')

class UsersController {
    async getMyInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.info()
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.logout()
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async signin(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.signin()
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async signinNewToken(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.signinNewToken()
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.signup()
            res.json(data);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UsersController()