const Web3 = require("web3")
const ethers = require("ethers");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const SendTrans = require('./build/contracts/SendTrans.json');

const mnemonicPhrase = "envelope direct allow creek endless detect mountain squeeze mass welcome virtual sample"; // 12 word mnemonic
require('events').EventEmitter.defaultMaxListeners = 0

let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: "http://127.0.0.1:8545"
});

const web3 = new Web3(provider);

const instance = new web3.eth.Contract(
    JSON.parse(JSON.stringify(SendTrans.abi)),
    "0x204f0f739C49F6D0441a862C3B652E0Bd2Cad4BA"
);

const getInfo = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Accounts: "+accounts);
    console.log("Receipent : ", accounts[0]);
    console.log("Initial Balance : ", await web3.eth.getBalance(accounts[0]));

    // var lastNonce = await web3.eth.getTransactionCount(accounts[0]);
    // console.log("Last NONCE: ",lastNonce);

    for(let i=0; i<5 ;i++)
    {
      for (let j = 0; j < 100; j++) {
        let Dpath="m/44'/60'/0'/"+j;
        const wallet = ethers.Wallet.fromMnemonic(mnemonicPhrase, Dpath);
        let rec =wallet.address
        console.log("Receipent"+(i*100 + j)+" : ", rec);
        instance.methods.trans(rec).send({ from: accounts[0], value: 1})
        // instance.methods.checkBal(rec).call();
        // web3.eth.sendTransaction({ from: accounts[0], to: rec, value: '1'})
        .on('transactionHash', function(hash){
          console.log("Hash: ",hash);
        })
        .on('error', console.error);
        // console.log("HASH: ",j);
        // lastNonce++;
      }
      setImmediate(()=>{});
    //   await sleep(5000);
    }

    console.log("End Main Balance : ", await web3.eth.getBalance(accounts[0]));

  } catch (error) {
    console.log("Error: ", error);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

getInfo();