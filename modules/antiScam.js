const getConfig = require('./anti-scam/config.js');

class Create {
    constructor() {
        this.versions = ['1.4.1']
    }

    async start(Client) {
        return true;
    }
}

module.exports = new Create();