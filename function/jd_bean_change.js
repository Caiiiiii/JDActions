// version v0.0.1
// create by jiegto
// detail url: https://github.com/jiegto/Actions_JX

const exec = require('child_process').execSync
const fs = require('fs')
const download = require('download')

async function downFile () {
    const url = 'https://raw.githubusercontent.com/lxk0301/jd_scripts/master/jd_bean_change.js'
    await download(url, './')
}

async function deleteFile(path) {
    // 查看文件result.txt是  否存在,如果存在,先删除
    const fileExists = await fs.existsSync(path);
    // console.log('fileExists', fileExists);
    if (fileExists) {
        const unlinkRes = await fs.unlinkSync(path);
        // console.log('unlinkRes', unlinkRes)
    }
}

async function start() {
    // 下载最新代码
    await downFile();
    console.log('下载代码完毕')
    // 执行
    await exec("node jingxi.js");
    console.log('执行完毕')
    }

start()
