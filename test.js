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

const getInfo = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Accounts: "+accounts);
    console.log("Receipent : ", accounts[0]);
    console.log("Initial Balance : ", await web3.eth.getBalance(accounts[0]));

    // var lastNonce = await web3.eth.getTransactionCount(accounts[0]);
    // console.log("Last NONCE: ",lastNonce);

    for(let i=1; i<=100 ;i++)
    {
      let Dpath="m/44'/60'/0'/"+i;
      const wallet = ethers.Wallet.fromMnemonic(mnemonicPhrase, Dpath);
      let rec =wallet.address
      console.log("Receipent"+i+" : ", rec);
      // console.log("Balance"+i+" : ", await web3.eth.getBalance(rec));
      await web3.eth.sendTransaction({ from: accounts[0], to: rec, value: '1'});
      // lastNonce++;
    }

    console.log("End Main Balance : ", await web3.eth.getBalance(accounts[0]));
    


  } catch (error) {
    console.log("Error: ", error);
  }
}

getInfo();
