const {Worker} = require("worker_threads");
// process.setMaxListeners(50);
require('events').EventEmitter.defaultMaxListeners = 0

for (let i = 100; i < 200; i++) {
    try {
        //Create new worker
        const worker = new Worker("./workerThread.js", {workerData: {num: i}});

        //Listen for a message from worker
        worker.once("message", result => {
            // console.log(`${num}th Fibonacci Number: ${result}`);
            console.log(`Hash ${result.num} : ${result.hash}`);
        });

        worker.on("error", error => {
            console.log(error);
        });

        worker.on("exit", exitCode => {
            console.log(exitCode);
        })

    } catch (error) {
        console.log("ERROR: ",error);
    }
}