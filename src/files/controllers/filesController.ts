import {NextFunction, Request, Response} from "express";

const fileService = require('../services/filesService')

class FilesController {
    async upload(req: Request, res: Response, next: NextFunction) {
        try {
            const files = req['files']
            const data = await fileService.upload(files)
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await fileService.delete(+req.params.id)
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const files = req['files']
            const data = await fileService.update(+req.params.id, files)
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async download(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await fileService.download(+req.params.id)
            res.download(data);
        } catch (e) {
            next(e)
        }
    }

    async fileInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await fileService.fileInfo(+req.params.id)
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async getFiles(req: Request, res: Response, next: NextFunction) {
        try {
            const {list_size, page} = req.query
            const data = await fileService.getFiles(list_size, page)
            res.json(data)
        } catch (e) {
            next(e)
        }
    }


}

module.exports = new FilesController()