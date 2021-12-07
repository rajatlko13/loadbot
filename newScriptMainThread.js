const {StaticPool} = require("node-worker-threads-pool");
const Web3 = require("web3")
const ethers = require("ethers");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonicPhrase = "truck gallery select material claim elephant pear dog knock kitchen runway juice"; // 12 word mnemonic

let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: "http://3.94.19.25:9545"
});

const web3 = new Web3(provider);

//Create a static worker pool with 8 workers
const pool = new StaticPool({
  size: 8,
  task: "./newScriptWorkerThread.js"
});

const runScript = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        await web3.eth.sendTransaction({
            from: accounts[0],
            to: getRecipient(0),
            value: 1,
            nonce: 0
        })
        .on('transactionHash', function(hash){
            console.log('First Sent', hash)
        })
        .on('receipt', function(receipt){
            console.log('First Mined', receipt.transactionHash)
        });

        for (let i = 1; i < 1000; i++) {
            for (var j=1; j<500; j++) {
                console.log("count=",(i*500 +j));
                let n = i*500 + j;
        
                //Get a worker from the pool and execute the task
                pool.exec({num: n}).then(result => {
                    console.log(`Hash ${result.num} : ${result.hash}`);
                });
            }
        
            await web3.eth.sendTransaction({
                from: accounts[0],
                to: getRecipient(i*500 + j),
                value: 1,
                nonce: (i*500 + j)
            })
            .on('transactionHash', function(hash){
                console.log('Last Sent', hash)
            })
            .on('receipt', function(receipt){
                console.log('Last Mined', receipt.transactionHash)
            })
            .on('error', function(error) {
                console.log("Last ERROR: ",error);
                i--;
            });
        
        }
    } catch (error) {
        console.log("ERROR: ", error);
    }
}

const getRecipient = (i) => {
    let Dpath="m/44'/60'/0'/"+i;
    const wallet = ethers.Wallet.fromMnemonic(mnemonicPhrase, Dpath);
    return wallet.address;
}

runScript();