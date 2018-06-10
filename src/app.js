const { RTMClient } = require('@slack/client');

const token = process.env.SLACK_TOKEN;

const rtm = new RTMClient(token);
rtm.start();

rtm.on('message', (event) => {
    // For structure of `event`, see https://api.slack.com/events/message

    // Skip messages that are from a bot or my own user ID
    if ( (event.subtype && event.subtype === 'bot_message') ||
        (!event.subtype && event.user === rtm.activeUserId) ) {
        return;
    }

    rtm.sendMessage('I am here an I am alive', event.channel)
        .then((res) => {
            // `res` contains information about the posted message
            console.log('Message sent: ', res.ts);
        })
        .catch(console.error);

    // Log the message
    console.log(`(channel:${event.channel}) ${event.user} says: ${event.text}`);
});
