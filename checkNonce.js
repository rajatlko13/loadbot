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

const checkNonce = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Receipent : ", accounts[1]);
    console.log("Balance : ", await web3.eth.getBalance(accounts[1]));
    
    const res = await web3.eth.getTransactionReceipt("0x773a8db3002918621a26d18a38d8b64d83d42fb8031aff05e3cf70abd19b1bb8");
    console.log("RESPONSE: ", res);

  } catch (error) {
    console.log("Error: ", error);
  }
}

checkNonce();
