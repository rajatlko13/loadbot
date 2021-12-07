const Web3 = require("web3")
const ethers = require("ethers");
const HDWalletProvider = require("@truffle/hdwallet-provider");
// const mnemonicPhrase = "truck gallery select material claim elephant pear dog knock kitchen runway juice"; // 12 word mnemonic
const mnemonicPhrase = "envelope direct allow creek endless detect mountain squeeze mass welcome virtual sample";

require('events').EventEmitter.defaultMaxListeners = 0

let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  // providerOrUrl: "http://3.94.19.25:9545"
  providerOrUrl: "http://127.0.0.1:8545"
});

const web3 = new Web3(provider);

const getInfo = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Accounts: "+accounts);
    console.log("Receipent : ", accounts[0]);
    console.log("Initial Balance : ", await web3.eth.getBalance(accounts[0]));

    var lastNonce = await web3.eth.getTransactionCount(accounts[0]);
    console.log("Last NONCE: ",lastNonce);

    // for(let i=0; i<5 ;i++)
    // {
      for (let j = lastNonce; j < lastNonce + 500; j++) {
        let Dpath="m/44'/60'/0'/"+j;
        const wallet = ethers.Wallet.fromMnemonic(mnemonicPhrase, Dpath);
        let rec =wallet.address
        console.log("Receipent "+j+" : ", rec);
        // console.log("Balance"+j+" : ", await web3.eth.getBalance(rec));
        web3.eth.sendTransaction({ 
          from: accounts[0],
          to: rec, 
          value: '1', 
          nonce: j
        })
        .on('transactionHash', function(hash){
          console.log("Hash: ",hash);
        })
        // .on('receipt', function(receipt){
        //   console.log("Receipt: ",receipt);
        // })
        .on('error', function(error) {
          console.log("ERROR: ",error);
        });
        // console.log("HASH: ",j);
        // lastNonce++;
      }
    //   await sleep(25000);
    // }

    console.log("End Main Balance : ", await web3.eth.getBalance(accounts[0]));

  } catch (error) {
    console.log("Error: ", error);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

getInfo();
