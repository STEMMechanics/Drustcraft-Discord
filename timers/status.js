const { ActivityType } = require('discord.js');

module.exports = {
    delay: 10000,
    data : {counter: 1},
    execute(client, data) {
        client.user.setPresence({
            activities: [{ name: `${data.counter} players`, type: ActivityType.Watching }],
            status: 'online',
        });
        
        data.counter++;
    },
};