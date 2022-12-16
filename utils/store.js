var fs = require('fs');

module.exports = {
    load: function() {
        var data = fs.readFileSync('../store.json'),
        objectData = {};

        try {
            objectData = JSON.parse(data);
        }
        catch (err) {
            console.log('There has been an error parsing the store JSON.')
            console.log(err);
        }

        return objectData;
    },
    save: function(objectData) {
        var data = JSON.stringify(objectData);

        fs.writeFile('../store.json', data, function (err) {
            if (err) {
                console.log('There has been an error saving the store data.');
                console.log(err.message);
                return;
            }
        });
    }
}
