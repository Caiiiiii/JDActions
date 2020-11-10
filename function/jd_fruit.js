// version v0.0.1
// create by jiegto
// detail url: https://github.com/jiegto/Actions_JX

const exec = require('child_process').execSync
const fs = require('fs')
const download = require('download')

async function downFile () {
    const url = 'https://raw.githubusercontent.com/lxk0301/jd_scripts/master/jd_fruit.js'
    await download(url, './')
}

async function changeFiele () {
    let content = await fs.readFileSync('./jd_fruit.js', 'utf8')
    content = content.replace(/'0a74407df5df4fa99672a037eec61f7e@dbb21614667246fabcfd9685b6f448f3@6fbd26cc27ac44d6a7fed34092453f77@61ff5c624949454aa88561f2cd721bf6'/, `''`)
    content = content.replace(/'b1638a774d054a05a30a17d3b4d364b8@f92cb56c6a1349f5a35f0372aa041ea0@9c52670d52ad4e1a812f894563c746ea@8175509d82504e96828afc8b1bbb9cb3'/, `''`)
    await fs.writeFileSync( './jd_fruit.js', content, 'utf8')
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
    // 替换变量
    await changeFiele();
    console.log('替换变量完毕')
    // 执行
    await exec("node jd_fruit.js");
    console.log('执行完毕')
    }

start()
