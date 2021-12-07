const {parentPort} = require("worker_threads");
const Web3 = require("web3");
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

parentPort.on("message", data => {
    parentPort.postMessage({num: data.num, hash: getHash(data.num)});
})

function getHash(n) {
    var rec = getRecipient(n);
    web3.eth.sendTransaction({
        from: "0x599D1c2286F18b2218bCa637F0F601bEda384a6f",
        to: rec,
        value: 1,
        nonce: n
    })
    .on('transactionHash', function(hash){
        console.log("Sent: ", hash)
    })
    .on('error', function(error) {
        console.log("ERROR: ",error);
    });
}

const getRecipient = (i) => {
    let Dpath="m/44'/60'/0'/"+i;
    const wallet = ethers.Wallet.fromMnemonic(mnemonicPhrase, Dpath);
    return wallet.address;
}