const api = require('./api');
const { ActivityType } = require('discord.js');
const pluralize = require('pluralize');

module.exports = function (client) {
    api('online', 'GET').then((response) => {
        var players = 0;

        if (response.players) {
            players = count(response.players);
        }

        client.user.setPresence({
            activities: [{ name: `${players} ${pluralize('player', players)}`, type: ActivityType.Watching }],
            status: 'online',
        });
    });
};