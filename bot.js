// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { default: axios } = require('axios');
const { ActivityHandler, MessageFactory } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            console.log('con', context.activity.text);
            const numberPattern = /^\d+(\.\d+)?$/;
            if (numberPattern.test(context.activity.text)) {
                const val = await data(context.activity.text);
                console.log(val.title);
                const replyText = `Name : ${ val.title } | Sal : ${ val.price } `;
                await context.sendActivity(MessageFactory.text(replyText, replyText));
                // By calling next() you ensure that the next BotHandler is run.
                await next();
            } else {
                const replyText = 'Only positive numbers are allowed';
                await context.sendActivity(MessageFactory.text(replyText, replyText));
                // By calling next() you ensure that the next BotHandler is run.
                await next();
            }
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome!';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
        async function data(no) {
            const val = await axios.get(`https://dummy.restapiexample.com/api/v1/employee/${ no }`);
            // console.log('val', val.data);
            return val.data;
        }
    }
}

module.exports.EchoBot = EchoBot;
