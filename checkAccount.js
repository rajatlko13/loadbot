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

const checkAccount = async (i) => {
  try {
    let Dpath="m/44'/60'/0'/"+i;
    const wallet = ethers.Wallet.fromMnemonic(mnemonicPhrase, Dpath);
    let rec =wallet.address

    console.log("Receipent : ", wallet);
    console.log("Other : ", wallet._signingKey());
    console.log("Balance : ", await web3.eth.getBalance(rec));

  } catch (error) {
    console.log("Error: ", error);
  }
}

checkAccount(0);
