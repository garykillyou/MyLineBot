const linebot = require('linebot');
const express = require('express');

const bot = linebot({
    channelId: process.env.channelId,
    channelSecret: process.env.channelSecret,
    channelAccessToken: process.env.channelAccessToken
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

bot.on('message', function (event) {
    console.log(event); //把收到訊息的 event 印出來看看
    if (event.type === 'message' && event.message.type === 'text') {
        let userMessage = event.message.text;
        event.reply({
            type: 'template',
            altText: 'this is a confirm template',
            template: {
                type: 'confirm',
                text: `你輸入的文字是 (${userMessage}) ?`,
                actions: [{
                    type: 'postback',
                    label: '對',
                    data: '對'
                }, {
                    type: 'postback',
                    label: '不對',
                    data: '不對'
                }]
            }
        })
    }
});

bot.on('postback', function (event) {
    if (event.postback !== undefined) {
        let userPostback = event.postback.data;
        event.reply(`你的選擇是 (${userPostback})`);
    }
});
