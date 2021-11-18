const Web3 = require("web3")
const ethers = require("ethers");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonicPhrase = "envelope direct allow creek endless detect mountain squeeze mass welcome virtual sample"; // 12 word mnemonic
require('events').EventEmitter.defaultMaxListeners = 0

let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: "http://127.0.0.1:8545"
});

const web3 = new Web3(provider);
const runFunc = async () => {
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
    })

    for (var i=0; i<5; i++) {
        for (var j=1; j<2000; j++) {
            console.log("count=",(i*2000 +j));
            let n = i*2000 + j;
            var rec = getRecipient(n);
            
            web3.eth.sendTransaction({
                from: accounts[0],
                to: rec,
                value: 1,
                nonce: n
            })
            .on('transactionHash', function(hash){
                console.log("Sent: ", hash)
            })
            .on('error', console.error);
        }

        await web3.eth.sendTransaction({
            from: accounts[0],
            to: getRecipient(i*2000 + j),
            value: 1,
            nonce: (i*2000 + j)
        })
        .on('transactionHash', function(hash){
            console.log('Last Sent', hash)
        })
        .on('receipt', function(receipt){
            console.log('Last Mined', receipt.transactionHash)
        })
        .on('error', console.error);
    }
}

const getRecipient = (i) => {
    let Dpath="m/44'/60'/0'/"+i;
    const wallet = ethers.Wallet.fromMnemonic(mnemonicPhrase, Dpath);
    return wallet.address;
}

runFunc();