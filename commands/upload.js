const { uploadHost, uploadPort, uploadPath, uploadToken } = require('../config.json'); 
var http = require('http');
const { SlashCommandBuilder } = require('discord.js');
const { isPlural } = require('pluralize');
const util = require('util');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('upload')
        .setDescription('....')
        .addStringOption(option => option
            .setName('type')
            .setDescription('Upload type')
            .setRequired(true)
            .addChoices(
                { name: 'Schematic', value: 'schematic' },
                { name: 'ImageMap', value: 'imagemap' },
                { name: 'HeightMap', value: 'heightmap' },
            ))
        .addAttachmentOption(option => option
            .setName('attach')
            .setDescription('Attachment File')
            .setRequired(true)),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });
        const user = message.author
        const file = interaction.options.getAttachment('attach')
        const type = interaction.options.getString('type')

        const typeData = {
            'schematic': {
                name: 'Schematic',
                extensions: ['.schematic', '.schem'],
                message: ':white_check_mark: The schematic will be uploaded to the Minecraft server in a few mins. To use the schematic, the command is `/schematic load %s`, then `//paste`',
            },
            'imagemap': {
                name: 'ImageMap',
                message: ':white_check_mark: The image will be uploaded to the Minecraft server in a few mins. To place the image, use the command `/imagemap place %s` and follow the prompts',
                extensions: ['.png']
            },
            'heightmap': {
                name: 'HeightMap',
                message: ':white_check_mark: The height map will be uploaded to the Minecraft server in a few mins. To use the height map brush, `/brush heightmap [-efr] %s [radius] [intensity]`',
                extensions: ['.png']
            }
        }

        var valid = false;
        if (typeData.hasOwnProperty(type)) {
            typeData[type].extensions.forEach((fileExt) => {
                if(file.name.endsWith(fileExt)) {
                    valid = true;
                }
            });
        }

        if(valid) {
            await interaction.editReply(':arrow_double_up: Sending the file now. Should only take a few seconds');
            const postData = JSON.stringify({
                'type': type,
                'username': interaction.user.username,
                'url': file.url
            });

            var httpOptions = {
                host: uploadHost,
                port: uploadPort,
                headers: {
                    'Authorization': 'Bearer ' + uploadToken,
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData),
                },
                method: 'POST',
                path: uploadPath
            };

            var req = http.request(httpOptions, async (res) => {
                const { statusCode } = res;
                const contentType = res.headers['content-type'];

                let error;
                if (statusCode !== 200) {
                    error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
                } else if (!/^application\/json/.test(contentType)) {
                    error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
                }

                if (error) {
                    await interaction.editReply(':stop_sign: Oh, the server could not receive the file right now');
                    console.error(error.message);
                    // Consume response data to free up memory
                    res.resume();
                    return;
                }

                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', async () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        await interaction.editReply(util.format(typeData[type].message, parsedData.filename));
                    } catch (e) {
                        await interaction.editReply(':stop_sign: Oh, the server could not receive the file right now');
                        console.error(e.message);
                    }
                });
            }).on('error', async (e) => {
                await interaction.editReply(':stop_sign: Oh, the server could not receive the file right now');
                console.error(`Got error: ${e.message}`);
            });

            req.write(postData);
            req.end();
        } else {
            await interaction.editReply(':stop_sign: Hey, that type of file is not the right type');
        }
    },
};
