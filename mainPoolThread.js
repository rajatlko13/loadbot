const {StaticPool} = require("node-worker-threads-pool");

//Create a static worker pool with 8 workers
const pool = new StaticPool({
  size: 8,
  task: "./workerPoolThread.js"
});

for (let i = 0; i < 2000; i++) {
    // 0x7ae36dea8ea93c56d183658707664a553f33929c69a878a814fc653f427eb914 0x7bCc2039d02b36Fc48CE36cDEfcdB9EcACe9CD89
    try {
        //Get a worker from the pool and execute the task
        pool.exec({num: i}).then(result => {
            console.log(`Hash ${result.num} : ${result.hash}`);
        });
    } catch (error) {
        console.log("ERROR: ",error);
    }
}