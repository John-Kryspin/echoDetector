require('dotenv').config()
const Gpio = require('onoff').Gpio;
const motionSensor = new Gpio(17, 'in', 'rising');
const Discord = require('discord.js');
const client = new Discord.Client();

motionSensor.watch(async (err, value) => {
    if (err) {
        throw err;
    }
    console.log(value)
    console.log("Motion Detected")
    await connectToDiscord();
    await sendPoopMessage();
})
process.on('SIGINT', () => {
    motionSensor.unexport();
});

function connectToDiscord() {
    return new Promise((resolve, reject) => {
        client.login(process.env.DISCORD_KEY);
        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);
            resolve()
        });
    })
}
async function sendPoopMessage() {
    await client.channels.get(process.env.DISCORD_CHANNEL).send('It\'s time to scoopy the poopy!')
    console.log("Message Sent!")
}