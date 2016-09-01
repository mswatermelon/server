/**
 * Created by Вероника on 01.09.2016.
 */
let http = require('http'),
    recDirs = require('./recDirs');

http.createServer(function (request, response) {
    if (request.url.indexOf('favicon.ico') == -1) {
        console.log('Поступил запрос', request.url);

        // Первый слеш не нужен - директории выводим относительно корня
        let url = request.url.replace('/','\\').slice(1);
        // Если после слеша ничего нет - выводим содержимое корневой директории
        url = url?url:'.';
        //Заголовки
        response.setHeader('Content-Type', 'text/html; charset=utf-8');

        // Обработка ошибок
        try {
            recDirs.recPrintDir(url, response);
        }
        catch (e){
            response.write("<b>Такой директории на сервере не существует</b>");
        }
    }
    // Закрываем соединение
    response.end();
}).listen(7777);