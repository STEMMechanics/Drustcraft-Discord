const { apiToken } = require('../config.json');
const got = require('got');

module.exports = async function (path) {
    try {
        const response = await got({
            url: 'https://apis.drustcraft.com.au/',
            headers: {
                'Authorization': `Bearer ${apiToken}`
            }
        });

        data = JSON.parse(response.body);
        return data;
    } catch (error) {
        // console.log('error2');
        // console.log(error);
        throw error;
    }
};