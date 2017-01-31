"use strict";

/* module imports */
import Bot from 'recastai-botconnector'
import { Client } from 'recastai'

import express from  'express'
import bodyParser from 'body-parser'
import processor from './modules/processor'
import handlers from './modules/handlers'
import postbacks from './modules/postbacks'
import uploads from './modules/uploads'
import handleAction from './modules/actions'

const FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN,

app = express();

app.set('port', process.env.PORT || 5000);

process.on('unhandledRejection', function(reason, p){
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
	    // application specific logging here
});

app.use(bodyParser.json())

const myBot = new Bot({ userSlug: process.env.BC_USER_SLUG, botId: process.env.BC_BOT_ID, userToken: process.env.BC_USER_TOKEN })
const recastClient = new Client(process.env.RE_BOT_TOKEN)

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
  const userText = message.content.attachment.content
    const conversationToken = message.senderId

	client.textConverse(userText, { conversationToken })
	  .then(res => {
	  // We get the first reply from Recast.AI or a default reply
		const reply = res.reply() || 'Sorry, I didn\'t understand'

    handleAction(res, replies, conversationToken)
		const response = {
		  type: 'text',
		  content: reply,
		}

		return message.reply(response)
	  })
	.then(() => console.log('Message successfully sent'))
	.catch(err => console.error(`Error while sending message: ${err}`))
})

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
            uploads.processUpload(sender, event.message.attachments);
        }
    }
    res.sendStatus(200);
});
*/

app.listen(app.get('port'), function () {
    console.log('Salesforce bot DreamHouse running on port ' + app.get('port'));
});
