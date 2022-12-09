const updateStatus = require('../utils/updateStatus.js');

module.exports = {
    action: 'player-join',
    execute(client, data) {
        updateStatus(client);
    },
};