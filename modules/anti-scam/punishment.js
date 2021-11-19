const SafeMessage = require('../../scripts/safeMessage');
const { MessageEmbed } = require('discord.js');
const { getRandomKey } = require('fallout-utility');

module.exports = async (message, config) => {
    const punishment = config.punishment;
    const reply = config.reply;

    if(!punishment.enabled) return;

    // Delete message
    if(message.content) await SafeMessage.delete(message.content);

    // Ban member
    if(punishment.banMember) await ban(message.member, punishment.reason);

    // Send reply
    if(reply.enabled) sendReply(reply, message.channel);
}

async function ban(member, reason) {
    if(!member || !member.bannable) return;
    return member.ban({ reason: getRandomKey(reason) }).catch(err => console.error(err));
}

async function sendReply(config, channel) {
    const embed = new MessageEmbed()
        .setAuthor(getRandomKey(config.title))
        .setDescription(getRandomKey(config.description))
        .setFooter(getRandomKey(config.footer))
        .setColor(config.embedColor);

    if(config.addTimestamp) embed.setTimestamp();


    const reply = await SafeMessage.send(channel, { embeds: [embed] });

    if(!config.autoDeleteMessage.enabled) return;

    setTimeout(() => {
        SafeMessage.delete(reply);
    }, config.autoDeleteMessage.timeMilliseconds);
}