module.exports = {
    get: function(object, key, def = undefined) {
        const keyParts = key.split(".");
        let returnValue = object;
        for (let i = 0; i < keyParts.length; i++) {
            const part = keyParts[i];
            if (returnValue) {
                returnValue = returnValue[part];
            }
            else {
                break;
            }
        }

        if (returnValue) {
            return returnValue;
        }

        return def;
    },

    set: function(object, key, value) {
        const keyParts = key.split(".");
        let objectRef = object;
        keyParts.forEach((part, index) => {
            if (keyParts.length - 1 === index) {
                return;
            }
            if (!objectRef[part]) {
                objectRef[part] = {};
            }
            objectRef = objectRef[part];
        });
        const finalKey = keyParts[keyParts.length - 1];
        if (finalKey !== "__proto__" && finalKey !== "constructor") {
            objectRef[finalKey] = value;
        }
        return object;
    },

    increment: function(object, key) {
        var val = module.exports.get(object, key, 0);
        val++;
        module.exports.set(object, key, val);
    },

    decrement: function(object, key) {
        var val = module.exports.get(object, key, 0);
        val--;
        module.exports.set(object, key, val);
    }
}
