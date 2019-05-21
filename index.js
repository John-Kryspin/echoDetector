const Gpio = require('onoff').Gpio;
const motionSensor = new Gpio(17, 'in','rising');
motionSensor.watch((err, value) => {
    if (err) {
        throw err;
    }
        console.log("Motion Detected")
    
})
process.on('SIGINT', () => {
    motionSensor.unexport();
  });