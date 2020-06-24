const linebot = require('linebot');
const express = require('express');

const bot = linebot({
    channelId: '1654379917',
    channelSecret: '6d2dfcba246e0e69c3db0921ba3d81db',
    channelAccessToken: '5SIT7B39bQbnqLrJfvhTjW1ZMQr55ADLVjh+WhkfNLSr/asEKRUPN3xgu3b9ldBVAjstSAu+VtAGxJx6jeLo+2PpQPqCSjyn8RO6CTZv58+lo0AmKbNXPpJ/2zGBRGqa2gyiD0tmtPIU7ORDUuqraAdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function (event) {
    console.log(event); //把收到訊息的 event 印出來看看
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
