const linebot = require('linebot');
const express = require('express');

const bot = linebot({
    channelId: '1654379917',
    channelSecret: '6d2dfcba246e0e69c3db0921ba3d81db',
    channelAccessToken: '5SIT7B39bQbnqLrJfvhTjW1ZMQr55ADLVjh+WhkfNLSr/asEKRUPN3xgu3b9ldBVAjstSAu+VtAGxJx6jeLo+2PpQPqCSjyn8RO6CTZv58+lo0AmKbNXPpJ/2zGBRGqa2gyiD0tmtPIU7ORDUuqraAdB04t89/1O/w1cDnyilFU='
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
    else if (event.type === 'postback' && event.postback !== undefined) {
        let userPostback = event.postback.data;
        event.reply(`你的選擇是 (${userPostback})`);
    }
});
