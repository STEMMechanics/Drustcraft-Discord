const updateStatus = require('../utils/updateStatus.js');

module.exports = {
    delay: 10,
    // data : {counter: 1},
    execute(client, data) {
        updateStatus(client);
    },
};
