require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment')

let today = moment()
console.log(process.env.DISCORD_CHANNEL)
console.log(process.env.DISCORD_KEY)
const DISCORD_READY = 0;
(async function test(err, value){
    if (err) {
        throw err;
    }
    
    console.log({
        value, 
        motionDetected: Boolean(value),
        time: today
    })
    if (!isConnected()) {
        await connectToDiscord();
    }
    await sendPoopMessage();
})(null,1)
console.log("Watching")

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
        await client.channels.get(String(process.env.DISCORD_CHANNEL)).send('It\'s time to scoopy the poopy!')
        console.log("Message Sent!")
    }
    catch (err){
        console.log(err)
    }
}