const { gameChatChannelId } = require('../config.json');
const api = require('../utils/api.js');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (gameChatChannelId && message.channelId == gameChatChannelId && !message.author.bot) {
            api('chat', 'POST', {
                'playername': message.author.username,
                'message': message.content
            }).then((response) => {
                // console.log(`here, response: ${response.status}, data: ${JSON.stringify(response.json)}`);
            });
        }
    },
};
