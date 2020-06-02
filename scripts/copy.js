const fs = require('fs');
const { resolve } = require('path');

const toDir = resolve(__dirname, '../../pos/order');
const sourceDir = resolve(__dirname, '../dist');

try {
    removeDir(toDir);
    console.log('* * 清空完成 ^ _ ^');
    console.log(' ');

    copyFile(sourceDir, toDir);
    console.log('* * 拷贝完成 ^ _ ^');
    console.log(' ');
} catch (error) {
    console.log('---', error);
}

function removeDir(dirPath) {
    if (!fs.existsSync(dirPath)) throw new Error(`${dirPath} not found!`);
    if (!fs.statSync(dirPath).isDirectory()) throw new Error(`${dirPath} is not dir!`);

    const files = fs.readdirSync(dirPath);

    files.forEach(path => {
        const currFilePath = resolve(`${dirPath}/${path}`);

        if (fs.statSync(currFilePath).isDirectory()) {
            removeDir(currFilePath);
            fs.rmdirSync(currFilePath);
            console.log(`*** 删除 ${currFilePath} 目录...`);
        } else {
            fs.unlinkSync(currFilePath);
            console.log(`*** 删除 ${currFilePath} 文件...`);
        }
    });
}

function copyFile(source, target) {
    if (fs.statSync(source).isDirectory()) {
        const files = fs.readdirSync(source);
        files.forEach(file => {
            const sourcePath = resolve(`${source}/${file}`);
            const targetPath = resolve(`${target}/${file}`);

            if (fs.statSync(sourcePath).isDirectory()) {
                fs.mkdirSync(targetPath);
                console.log(`*** 创建 ${targetPath} 目录...`);
                copyFile(sourcePath, targetPath);
            } else {
                const readable = fs.createReadStream(sourcePath);
                const writable = fs.createWriteStream(targetPath);
                readable.pipe(writable);
                console.log(`*** 创建 ${targetPath} 文件...`);
            }
        });
    } else {
        const readable = fs.createReadStream(source);
        const writable = fs.createWriteStream(target);
        readable.pipe(writable);
        console.log(`*** 创建 ${target} 文件...`);
    }
}
