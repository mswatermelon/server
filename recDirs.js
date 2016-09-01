/**
 * Created by Вероника on 31.08.2016.
 */
'use strict';
let fs = require('fs');

// Функция для рекурсивного подсчета размера
let recCount = function(newDir, size){
    let dirs = fs.readdirSync(newDir);

    // Для каждого файла или папки
    for (let dir of dirs) {
        // Путь относительно рабочей директории
        dir =  newDir + '\\'+ dir;
        // Объект с нужными данными, такими, как размер
        let st = fs.statSync(dir);

        // Если это папка, рекурсивно посчитать размер
        if(st && st.isDirectory()){
            size = recCount(dir,size);
        }

        // Если это файл, к размеру папки добавить размер файла
        if(st && st.isFile()) {
            size += st.size/1024
        }
    }

    return size
};

let recPrintDir = function (newDir, res, prefix){
    let dirs = fs.readdirSync(newDir);
    prefix = prefix || '';

    for (let dir of dirs) {
        // Путь относительно рабочей директории
        dir = newDir + '\\' + dir;
        // Объект с нужными данными, такими, как размер
        // Путь, форматированный под красивый вывод
        let st = fs.statSync(dir),
            printDir = dir.split('\\'),
            print_string = prefix + ' ' + printDir[printDir.length - 1];

        // Если папка
        if (st && st.isDirectory()) {
            let size = recCount(dir, 0);
            // То вывести ее путь и размер
            res.write(`${print_string} (${size}kb)<br>`);

            prefix += '-';
            // Рекрсивно вывести путь и размер дочерних папок
            recPrintDir(dir, res, prefix);
            prefix = prefix.slice(0, -1);
        }
        //Если файл - просто вывести его путь и размер
        if (st && st.isFile()) {
            res.write(`${print_string} (${st.size / 1024}kb)<br>`);
        }
    }
};

module.exports.recPrintDir = recPrintDir;
