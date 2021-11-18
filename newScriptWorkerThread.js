const {parentPort} = require("worker_threads");
const Web3 = require("web3");
const ethers = require("ethers");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonicPhrase = "envelope direct allow creek endless detect mountain squeeze mass welcome virtual sample"; // 12 word mnemonic

let provider = new HDWalletProvider({
    mnemonic: {
      phrase: mnemonicPhrase
    },
    providerOrUrl: "http://127.0.0.1:8545"
});
const web3 = new Web3(provider);

parentPort.on("message", data => {
    parentPort.postMessage({num: data.num, hash: getHash(data.num)});
})

function getHash(n) {
    var rec = getRecipient(n);
    web3.eth.sendTransaction({
        from: "0x0766fd8a11485bb8c045919ac5a07c51b3d1696b",
        to: rec,
        value: 1,
        nonce: n
    })
    .on('transactionHash', function(hash){
        console.log("Sent: ", hash)
    })
    .on('error', console.error);
}

const getRecipient = (i) => {
    let Dpath="m/44'/60'/0'/"+i;
    const wallet = ethers.Wallet.fromMnemonic(mnemonicPhrase, Dpath);
    return wallet.address;
}