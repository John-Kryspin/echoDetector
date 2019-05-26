const Gpio = require('onoff').Gpio;
const motionSensor = new Gpio(17, 'in', 'both');
motionSensor.watch(async (err, value) => {
    if (err) {
        throw err;
    }
    console.log({value, motionDetected: true})
})
process.on('SIGINT', () => {
    motionSensor.unexport();
});
