require('dotenv').config()
const Gpio = require('onoff').Gpio;
const motionSensor = new Gpio(17, 'in', 'both');
const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment')
const watch = require('node-watch')
let today = moment()
console.log(process.env.DISCORD_CHANNEL)
console.log(process.env.DISCORD_KEY)
const DISCORD_READY = 0;
motionSensor.watch(async (err, value) => {
    if (err) {
        throw err;
    }
    
    console.log({
        value, motionDetected: Boolean(value),
        time: today
    })
    if (!isConnected()) {
        await connectToDiscord();
    }
    await sendPoopMessage();
})
console.log("Watching")
process.on('SIGINT', () => {
    motionSensor.unexport();
});

var watch = require('node-watch');
 
watch('/media/external', { recursive: true }, function(evt, name) {
  console.log('%s changed.', name);
  sendFileChangeMessage(name)
  console.log("EXTERNAL media folder changed!")
});

function connectToDiscord() {
    console.log("Connecting to discord")
    return new Promise((resolve, reject) => {
        client.login(process.env.DISCORD_KEY);
        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);
            resolve()
        });
    })
}
function isConnected() {
    return client.status === DISCORD_READY
}
async function sendPoopMessage() {
    try {
        await client.channels.get(String(process.env.DISCORD_CHANNEL)).sendMessage('It\'s time to scoopy the poopy!')
        console.log("Message Sent!")
    }
    catch (err){
        console.log(err)
    }
}
async function sendFileChangeMessage(content) {
    try {
        await client.channels.get(String(process.env.DISCORD_CHANNEL)).sendMessage(content)
        console.log("Message Sent!")
    }
    catch (err){
        console.log(err)
    }
}