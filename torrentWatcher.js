require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
const watch = require('node-watch')
console.log(process.env.DISCORD_CHANNEL)
console.log(process.env.DISCORD_KEY)
const DISCORD_READY = 0;

console.log("Watching")
 
watch('/media/external/torrents/completed', { recursive: true }, async function(evt, name) {
  console.log('%s changed.', name);
  if (!isConnected()) {
    await connectToDiscord();
}
  
  await sendFileChangeMessage(name)
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

async function sendFileChangeMessage(content) {
    try {
        await client.channels.get(String(process.env.DISCORD_CHANNEL)).sendMessage(content)
        console.log("Message Sent!")
    }
    catch (err){
        console.log(err)
    }
}