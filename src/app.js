const slack = require('slack');
const config = require('./config');

let bot = slack.rtm.client();

bot.started((payload) => {
    this.self = payload.self
});

bot.message((msg) => {
    if (!msg.user) return;
    if (!_.includes(msg.text.match(/<@([A-Z0-9])+>/igm), `<@${this.self.id}>`)) return;

    slack.chat.postMessage({
        token: config.SLACK_TOKEN,
        icon_emoji: 'wave',
        channel: msg.channel,
        username: 'ac-bot',
        text: `I'm here!`
    });
});

bot.listen({ token: config.SLACK_TOKEN });
