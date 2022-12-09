const updateStatus = require('../utils/updateStatus.js');

module.exports = {
    action: 'player-leave',
    execute(client, data) {
        updateStatus(client);
    },
};