const download = require("download");
async function replaceWithSecrets(content, Secrets, ext) {
    if (!Secrets || !Secrets) return content;
    const replacements = [];
    await init_notify(Secrets, content, replacements);
    if (ext && typeof ext == "string") {
        if (content.indexOf("require('./jdCookie.js')") > 0) {
            replacements.push({ key: "require('./jdCookie.js')", value: `{CookieJD:'${ext}'}` });
        }
        if (content.indexOf("京东多合一签到") > 0 && content.indexOf("@NobyDa") > 0) {
            replacements.push({ key: /var Key = ''/, value: `var Key = '${ext}'` });
        }
    } 
    return batchReplace(content, replacements);
}
function batchReplace(content, replacements) {
    for (var i = 0; i < replacements.length; i++) {
        content = content.replace(replacements[i].key, replacements[i].value);
    }
    return content;
}

async function init_notify(Secrets, content, replacements) {
    if (!Secrets.PUSH_KEY && !Secrets.BARK_PUSH && !Secrets.TG_BOT_TOKEN) {
        if (content.indexOf("require('./sendNotify')") > 0) {
            replacements.push({
                key: "require('./sendNotify')",
                value:
                    "{sendNotify:function(){},serverNotify:function(){},BarkNotify:function(){},tgBotNotify:function(){}}",
            });
        }
    } else {
        await download_notify();
        if (content.indexOf("京东多合一签到") > 0 && content.indexOf("@NobyDa") > 0) {
            console.log("京东多合一签到通知注入成功");
            replacements.push({
                key: "var LogDetails = false;",
                value: `const lxk0301Notify = require('./sendNotify');var LogDetails = false;`,
            });
            replacements.push({
                key: `if (!$nobyda.isNode) $nobyda.notify("", "", Name + one + two + three + four + disa + notify);`,
                value: `console.log("通知开始");lxk0301Notify.sendNotify("京东多合一签到", one + two + three + notify);console.log("通知结束");`,
            });
        }
    }
}

async function download_notify() {
    await download("https://github.com/lxk0301/scripts/raw/master/sendNotify.js", "./", {
        filename: "sendNotify.js",
    });
    console.log("下载通知代码完毕");
}

module.exports = {
    replaceWithSecrets,
};
