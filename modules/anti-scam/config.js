const Yml = require('yaml');
const MakeConfig = require('../../scripts/makeConfig');

const scamDomains = require('./discordScamDomains.json');
const config = {
    banOffenders: true,
    reply: {
        enabled: true,
        message: 'You have been banned for using a scam links.'
    }
    blacklistedDomains: scamDomains
}

module.exports = Yml.parse(MakeConfig('./config/anti-scam.yml', config)); 