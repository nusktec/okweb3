/**
 Author: Revelation Ben
 Company: RSC BYTE LTD
 Github: www.github.com/nusktec
 Email: nusktecsoft@gmail.com
 **/

/**IMPORT STATEMENT***/
const _ABIARRAY = require('./abiArra');
const WEB3 = require('web3');
//global variable
let CONFIG = {
    provider: '',
    credential: {fromAddress: '', fromPkey: '', contractAddress: ''},
    abiArray: [],
    log: 'print',
};

let PROVIDERS = {
    binance: 'https://bsc-dataseed.binance.org',
    ropsten: 'https://ropsten.infura.io/v3/3dffccb3526b45ceaed3d17dd35a80c5',
    infura: 'https://mainnet.infura.io/v3/3dffccb3526b45ceaed3d17dd35a80c5',
    gorli: 'https://goerli.infura.io/v3/3dffccb3526b45ceaed3d17dd35a80c5',
};

//class for transferring and other related moving tokens
class Transactions {
    //global variable
    __config;
    __readyState = false;
    __bin;
    __web3;
    //global classes
    errorReporting;

    constructor(config) {
        this.__config = config;
        this.__bin = config.credential;
        //initialize
        this.__initializer();
        //do check for error
        this.__config_checker();
    }

    //initializer
    __initializer() {
        //global classes
        this.errorReporting = new ErrorLog(this.__config);
        //make a new instance of web3 with entropy
        this.__web3 = new WEB3(this.__config.provider);
    }

    //configuration checker
    __config_checker() {
        if (!this.__config.credential.fromAddress) {
            this.__readyState = false;
            this.errorReporting._print(300, "Not a valid from address or is blank, pass a valid address and try again");
            return;
        }
        if (!this.__config.credential.fromPkey) {
            this.__readyState = false;
            this.errorReporting._print(301, "Not a valid private key or is blank, pass a valid key and try again");
            return;
        }
        if (!this.__config.credential.contractAddress) {
            this.__readyState = false;
            this.errorReporting._print(302, "Not a valid contract address or is blank, pass a valid address and try again");
        }
        //auto assign abi
        if (!this.__config.abiArray) {
            this.__config.abiArray = ___ABI_ARRAY;
        }
    }

    //start a public functions
    transferEthToken = async (toAddress, amt) => {
        let addr = toAddress;
        let web3 = this.__web3;
        try {
            //unlock account
            const _account = this.__web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
            //check account address
            console.log("unlocked address: ", _account.address);
            let abiArray = ___ABI_ARRAY;
            let wallet = process.env.ADDRESS;
            let count = await this.__web3.eth.getTransactionCount(wallet);
            console.log(count);
            let contract = new this.__web3.eth.Contract(abiArray, process.env.CONTRACT, {from: wallet});
            let balance = await contract.methods.balanceOf(wallet).call();
            console.log("balance_" + balance);
            const gasLimit = await contract.methods.transfer(addr, amt * (1e9)).estimateGas({from: wallet});
            let gas = String(Math.floor(this.__web3.utils.fromWei(String(balance), 'ether') / this.__web3.utils.fromWei(String(gasLimit), 'gwei')));
            console.log("Gas Limit", gasLimit, " ", gas);
            return await contract.methods.transfer(addr, amt * (1e9)).send({
                from: wallet,
                chanid: 56,
                gas: gasLimit,
                gasPrice: web3.utils.toWei(Math.ceil((gas / 6)).toString(), 'gwei'),
                nonce: count
            });
        } catch (e) {
            //console.log(e);
            this.errorReporting._print(666, "Transfer not successful !, check error log");
            console.log(e);
            return false;
        }
    };

    //snippet transfer
    sendTokenBEB20 = async (addr, amt) => {
        let web3 = this.__web3;
        try {
            //unlock account
            const _account = this.__web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
            //check account address
            console.log("unlocked address: ", _account.address);
            let abiArray = ___ABI_ARRAY;
            let wallet = process.env.ADDRESS;
            let count = await this.__web3.eth.getTransactionCount(wallet);
            console.log(count);
            let contract = new this.__web3.eth.Contract(abiArray, process.env.CONTRACT, {from: wallet});
            let balance = await contract.methods.balanceOf(wallet).call();
            console.log("balance_" + balance);
            const gasLimit = await contract.methods.transfer(addr, amt * (1e9)).estimateGas({from: wallet});
            let gas = String(Math.floor(this.__web3.utils.fromWei(String(balance), 'ether') / this.__web3.utils.fromWei(String(gasLimit), 'gwei')));
            console.log("Gas Limit", gasLimit, " ", gas);
            return await contract.methods.transfer(addr, amt * (1e9)).send({
                from: wallet,
                chanid: 56,
                gas: gasLimit,
                gasPrice: web3.utils.toWei(Math.ceil((gas / 6)).toString(), 'gwei'),
                nonce: count
            });
        } catch (e) {
            //console.log(e);
            this.errorReporting._print(666, "Transfer not successful !, check error log");
            console.log(e);
            return false;
        }
    };

    getAccurateGasLimit = async (addr, amt) => {
        let web3 = this.__web3;
        try {
            //unlock account
            const _account = this.__web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
            //check account address
            console.log("unlocked address: ", _account.address);
            let abiArray = ___ABI_ARRAY;
            let wallet = process.env.ADDRESS;
            let count = await this.__web3.eth.getTransactionCount(wallet);
            console.log(count);
            let contract = new this.__web3.eth.Contract(abiArray, process.env.CONTRACT, {from: wallet});
            let balance = await contract.methods.balanceOf(wallet).call();
            console.log("balance_" + balance);
            return await contract.methods.transfer(addr, amt * (1e9)).estimateGas({from: wallet});
        } catch (e) {
            //console.log(e);
            return false;
        }
    };

    //return initialized web3
    okWeb3 = () => {
        return this.__web3;
    };

    //get abi_array
    abiArray = () => {
        return ___ABI_ARRAY;
    }
}

//error logging class
class ErrorLog {
    log_state = 0;
    config;

    constructor(config) {
        if (typeof config.log === "function") {
            this.log_state = 500;
            this.config = config;
        }
        if (config.log === "print") {
            this.log_state = 300;
        }
    }

    _print(status, msg) {
        if (this.log_state === 500) {
            //print on the user function
            this.config.log(200, {status, msg});
        }
        if (this.log_state === 300) {
            //print on the user function
            this._log(status, msg)
        }

    }

    _log(status, msg) {
        console.log({status, msg});
    }
}

//dump abiArray
const ___ABI_ARRAY = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
];

module.exports = {Transactions, CONFIG, PROVIDERS, ___ABI_ARRAY};