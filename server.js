"use strict";

/* module imports */
const BotConnector = require('recastai-botconnector')
const recastai = require('recastai')

var express = require('express'),
    bodyParser = require('body-parser'),
    processor = require('./modules/processor'),
    handlers = require('./modules/handlers'),
    postbacks = require('./modules/postbacks'),
    uploads = require('./modules/uploads'),
    FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN,
    app = express();

app.set('port', process.env.PORT || 5000);

process.on('unhandledRejection', function(reason, p){
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
	    // application specific logging here
		 });

app.use(bodyParser.json())


const myBot = new BotConnector({ userSlug: 'pe', botId: '588e0199991fd62d2abea86b', userToken: '2ed61b00061ae2ec8e9ce137b874f8de' })

const client = new recastai.Client('YOUR_REQUEST_TOKEN');

/*
app.get('/webhook', (req, res) => {
    if (req.query['hub.verify_token'] === FB_VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Error, wrong validation token');
    }
});
*/

app.post('/webhook', (req, res) => myBot.listen(req, res))

myBot.onTextMessage(message => {
  console.log(message)
  )}

/*
app.post('/webhook', (req, res) => {
    let events = req.body.entry[0].messaging;
    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        let sender = event.sender.id;
        if (process.env.MAINTENANCE_MODE && ((event.message && event.message.text) || event.postback)) {
            sendMessage({text: `Sorry I'm taking a break right now.`}, sender);
        } else if (event.message && event.message.text) {
            let result = processor.match(event.message.text);
            if (result) {
                let handler = handlers[result.handler];
                if (handler && typeof handler === "function") {
                    handler(sender, result.match);
                } else {
                    console.log("Handler " + result.handlerName + " is not defined");
                }
            }
        } else if (event.postback) {
            let payload = event.postback.payload.split(",");
            let postback = postbacks[payload[0]];
            if (postback && typeof postback === "function") {
                postback(sender, payload);
            } else {
                console.log("Postback " + postback + " is not defined");
            }
        } else if (event.message && event.message.attachments) {
			console.log('TEST3')
            uploads.processUpload(sender, event.message.attachments);
        }
    }
    res.sendStatus(200);
});
*/

app.listen(app.get('port'), function () {
    console.log('Salesforce bot DreamHouse running on port ' + app.get('port'));
});
