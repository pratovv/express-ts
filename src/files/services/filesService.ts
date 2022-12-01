import {AppDataSource} from '../../config/ormconfig'
import {UploadFileDto} from "../dtos/upload-file-dto";
import {FileEntity} from "../entities/file-entity";

const ApiError = require('../../exceptions/api-error');
const fileRepo = AppDataSource.getRepository('FileEntity')
const path = require('path');

class FilesService {
    async upload(files) {
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
        response.map(async (file) => {
            await this.saveFileToDB(file)
        })
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


    async delete() {

    }

    async update() {

    }

    async download() {

    }

    async fileInfo() {

    }

    async getFiles(list_size: number = 10, page: number = 1) {
        const files = await fileRepo.find({
            take: list_size,
            skip: (page - 1) * list_size
        })
        return files
    }
}

module.exports = new FilesService()