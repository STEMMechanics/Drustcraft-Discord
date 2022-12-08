const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// Load commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

// Load events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Load timers
client.on('ready', (client) => {
    const timersPath = path.join(__dirname, 'timers');
    const timerFiles = fs.readdirSync(timersPath).filter(file => file.endsWith('.js'));

    for (const file of timerFiles) {
        const filePath = path.join(timersPath, file);
        const timer = require(filePath);
                
        if (timer.once) {
            setTimeout(function() {
                timer.execute(client, timer.data)
            }, timer.delay);
        } else {
            timer.execute(client, timer.data);
            setInterval(function() {
                timer.execute(client, timer.data)
            }, timer.delay);
        }
    }
});

client.login(token);
