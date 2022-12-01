const theRouter = require('express').Router;
const fileController = require('../controllers/filesController')
const fileRouter = new theRouter();
const fileUpload = require('express-fileupload')
const filesPayload = require('../../middlewares/filesPayloadExists')
const fileLimiter = require('../../middlewares/fileExtLimiter');
const SizeLimiter = require('../../middlewares/fileSizeLimiter');

fileRouter.post('/upload',
    fileUpload({createParentPath: true}),
    filesPayload,
    fileLimiter(['.png', '.jpg', '.jpeg']),
    SizeLimiter,
    fileController.upload)
fileRouter.get('/list', fileController.getFiles)//получение списка файлов с пагинацией 10 записей дефолт и 1 страница
fileRouter.get('/:id', fileController.fileInfo)//получение информации о файле по id
fileRouter.get('/download/:id', fileController.download)//скачивание файла по id
fileRouter.put('/update/:id', fileController.update)//обновление файла и информации о файле по id
fileRouter.delete('/delete/:id', fileController.delete)//удаление файла и информации о файле по id


module.exports = fileRouter;