"use strict";

/* module imports */
import Bot from 'recastai-botconnector'
import express from  'express'
import bodyParser from 'body-parser'
import processor from './modules/processor'
import handlers from './modules/handlers'
import postbacks from './modules/postbacks'
import uploads from './modules/uploads'
import handleAction from './modules/actions'
import { handleMessage  } from './messages'

const app = express()

app.set('port', process.env.PORT || 5000);

process.on('unhandledRejection', function(reason, p){
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
	    // application specific logging here
});

app.use(bodyParser.json())

const myBot = new Bot({ userSlug: process.env.BC_USER_SLUG, botId: process.env.BC_BOT_ID, userToken: process.env.BC_USER_TOKEN })

app.post('/webhook', (req, res) => myBot.listen(req, res))

myBot.onTextMessage(handleMessage)

app.listen(app.get('port'), function () {
    console.log('Salesforce bot DreamHouse running on port ' + app.get('port'));
});
