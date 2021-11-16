const {StaticPool} = require("node-worker-threads-pool");

//Create a static worker pool with 8 workers
const pool = new StaticPool({
  size: 20,
  task: "./workerPoolThread.js"
});

for (let i = 18000; i < 20000; i++) {
    try {
        //Get a worker from the pool and execute the task
        pool.exec({num: i}).then(result => {
            console.log(`Hash ${result.num} : ${result.hash}`);
        });
    } catch (error) {
        console.log("ERROR: ",error);
    }
}