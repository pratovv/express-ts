const theRouter = require('express').Router;
const fileController = require('../controllers/filesController')
const fileRouter = new theRouter();
const fileUpload = require('express-fileupload')
const filesPayload = require('../../middlewares/filesPayloadExists')
const SizeLimiter = require('../../middlewares/fileSizeLimiter');
const authMiddleWare = require('../../middlewares/auth-middleware');
fileRouter.post('/upload', authMiddleWare,
    fileUpload({createParentPath: true}),
    filesPayload,
    SizeLimiter,
    fileController.upload)
fileRouter.get('/list', authMiddleWare, fileController.getFiles)
fileRouter.get('/:id', authMiddleWare, fileController.fileInfo)
fileRouter.get('/download/:id', authMiddleWare, fileController.download)//скачивание файла по id
fileRouter.put('/update/:id', authMiddleWare,
    fileUpload({createParentPath: true}),
    filesPayload,
    SizeLimiter,
    fileController.update)
fileRouter.delete('/delete/:id', authMiddleWare, fileController.delete)


module.exports = fileRouter;