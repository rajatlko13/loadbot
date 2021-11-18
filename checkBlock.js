const Web3 = require("web3")
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

async function block() {
    let blockDetail= await web3.eth.getBlock("latest")

    // let pendingTrx =await web3.eth.getPendingTransactions()
    // let numOfPendingTrx= pendingTrx.length()
    console.log("block number ",blockDetail.number ," gas consumed ",blockDetail.gasUsed)
}
  
setInterval(block,1000);