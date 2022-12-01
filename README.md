# Как запустить проект:

1. Склонировать репозиторий

git clone https://github.com/pratovv/express-ts

2. Перейти в папку

cd express-ts

3. Установить зависимости

npm install

# Начать работу можно с помощью команды:

1. npm run build

2. npm run start:prod

либо в режиме разработки

1. npm run start:dev

# Описание Эндпоинтов

1. /signin - авторизация пользователя
2. /signin/new_token - обновление токена
3. /signup - регистрация пользователя
4. /file/upload - загрузка файла
5. /file/list - список файлов
6. /file/delete/:id - удаление файла
7. /file/:id - информация о файле
8. /file/download/:id - скачивание файла
9. /file/update/:id - обновление файла
10. /info - информация о пользователе
11. /logout - выход из системы
