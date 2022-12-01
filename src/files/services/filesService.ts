import {AppDataSource} from '../../config/ormconfig'
import {UploadFileDto} from "../dtos/upload-file-dto";
import {FileEntity} from "../entities/file-entity";

const fs = require('fs')
const ApiError = require('../../exceptions/api-error');
const fileRepo = AppDataSource.getRepository('FileEntity')
const path = require('path');

class FilesService {
    async upload(files) {
        const response = await this.helper(files)
        await Promise.all(response.map(async (file) => {
            return await this.saveFileToDB(file)
        }))
        return {status: 'success', uploaded: [...response]}
    }

    async saveFileToDB(file: UploadFileDto) {
        const candidate = await fileRepo.findOne({
            where: {
                src: file.src
            }
        })
        if (candidate) {
            const updatedDate = Object.assign(candidate, {...candidate, uploaded_date: new Date()})
            return await fileRepo.save(updatedDate)
        } else {
            return await fileRepo.save(file)
        }
    }


    async delete(id: number) {
        const file = await fileRepo.findOne({where: {id}})
        if (!file) throw ApiError.BadRequest(`File with id ${id} not found`)
        fs.unlink(file.src, (err) => {
            if (err) throw ApiError.BadRequest(`File with id ${id} not found`)
        })
        await fileRepo.delete({id})
        return {status: 'success'}
    }

    async update(id: number, files: UploadFileDto) {
        const candidate = await fileRepo.findOne({where: {id}})
        if (!candidate) throw ApiError.BadRequest(`File with id ${id} not found`)
        const newFile = await this.helper(files)
        fs.unlink(candidate.src, (err) => {
            if (err) throw ApiError.BadRequest(`File with id ${id} not found`)
        })
        const updatedFile = Object.assign(candidate, {...candidate, ...newFile[0]})
        return await fileRepo.save(updatedFile)
    }

    async download(id:number) {
        const file = await fileRepo.findOne({where: {id}})
        if (!file) throw ApiError.BadRequest(`File with id ${id} not found`)
        return file.src
    }

    async fileInfo(id: number) {
        const file = await fileRepo.findOne({where: {id}})
        if (!file) throw ApiError.BadRequest(`File with id ${id} not found`)
        const {src, ...info} = file;
        return info;
    }

    async getFiles(list_size: number = 10, page: number = 1) {
        const files = await fileRepo.find({
            take: list_size,
            skip: (page - 1) * list_size
        })
        return files
    }

    private async helper(files) {
        const response = []
        Object.keys(files).forEach(key => {
            const filepath = path.join(__dirname + '../../../../', 'uploaded_files', files[key].name)
            files[key].mv(filepath, (err) => {
                if (err) return `error`
            })
            const file = new UploadFileDto();
            file.name = files[key].name;
            file.extension = files[key].name.split('.').pop();
            file.MIME_type = files[key].mimetype;
            file.uploaded_date = new Date();
            file.size = files[key].size;
            file.src = filepath;
            response.push(file)
        })
        return response
    }
}

module.exports = new FilesService()