const { ActivityType } = require('discord.js');
const got = require('got');
// const api = require('../utils/api.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        // api('versions').then(data => {
        //     console.log(data);
        // }).catch(erroe => {
        //     console.log(error);
        // });

        // setInterval(() => {
        //     client.user.setPresence({
        //         activities: [{ name: `drustcraft.com.au`, type: ActivityType.Watching }],
        //         status: 'online',
        //     });

        //     i++;
        // }, 10000);
    },
};