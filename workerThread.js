const {parentPort, workerData} = require("worker_threads");
const Web3 = require("web3");
const ethers = require("ethers");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const SendTrans = require('./build/contracts/SendTrans.json');

const mnemonicPhrase = "envelope direct allow creek endless detect mountain squeeze mass welcome virtual sample"; // 12 word mnemonic

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

parentPort.postMessage({num: workerData.num, hash: getHash(workerData.num)});

function getHash(i) {
    let Dpath="m/44'/60'/0'/"+i;
    const wallet = ethers.Wallet.fromMnemonic(mnemonicPhrase, Dpath);
    let rec =wallet.address
    console.log("Receipent"+i+" : ", rec);
    web3.eth.sendTransaction({ from: "0x0766fd8a11485bb8c045919ac5a07c51b3d1696b", to: rec, value: '1', nonce: i})
    // instance.methods.trans(rec).send({ from: "0x0766fd8a11485bb8c045919ac5a07c51b3d1696b", value: 1})
        // .on('transactionHash', function(hash){
        //     console.log("transactionHash: ",hash);
        //     return hash;
        // })
        // .on('receipt', function(hash){
        // //   console.log("Hash: ",hash.transactionHash);
        // })
        .on('error', console.error);
}