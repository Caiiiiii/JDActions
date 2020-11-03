const download = require("download");
async function replaceWithSecrets(content, Secrets, ext) {
    if (!Secrets || !Secrets) return content;
    const replacements = [];
    await init_notify(Secrets, content, replacements);
    if (ext && typeof ext == "string") {
        if (content.indexOf("require('./jdCookie.js')") > 0) {
            replacements.push({ key: "require('./jdCookie.js')", value: `{CookieJD:'${ext}'}` });
        }
    } else {
        if (Secrets.JD_COOKIE && content.indexOf("require('./jdCookie.js')") > 0) {
            replacements.push({ key: "require('./jdCookie.js')", value: JSON.stringify(Secrets.JD_COOKIE.split("&")) });
        }
        await downloader(content);
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
