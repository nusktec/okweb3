# **OKWEB3 CORE LIB**

> `npm i okweb3`
### > `https://www.npmjs.com/package/okweb3`

**Function list**
1. Make a custom token transfer to any bep20 address
2. Access to major functions
3. Subscribe to incoming blocks
4. Transaction confirmation
5. Block check and status resolver

#### Prerequisite
Must have installed `npm i web3`

### **LIBRARY USAGE**
**Declare a config object based on your wallet**

`let config = {
     credential: {fromAddress: '', fromPkey: '', contractAddress: ''},
     abiArray: [],
     log: 'print',
 };`
 1. `credential` contain your details from the parent wallet or target wallet
 
 2. `abiArray` already present, you can choose to ignore else supply abiArray
 
 3. `log` if it is `print` all error log will be dumped with `console.log`  automatically, if `null` no log will be printed
    
     you can also provide a custom `function` with two arguments: `(status, message)`
     if any successful event occur, `status` will be true else `false`
     you can do whatever you want with `message`
     
     if you want to override predefined values, follow the above
     
  ## SEE QUICK USAGE
  
  `let {Transactions, CONFIG, PROVIDERS} = require('okweb3');`
  
  `CONFIG.provider = PROVIDERS.binance;`
  
  `CONFIG.credential.contractAddress = "xxxxxxxxxxx_contrac_address";`
  
  `CONFIG.credential.fromPkey = "xxxxxxxxxxx_primary_key";`
  
  `CONFIG.credential.fromAddress = "xxxxxxxxxxx_master_account";`
  
  regroup config and apply to `okweb3` class as seen below
  
  `let con = CONFIG;`
  
  `con.log = function (s, m) {
       console.log("i want my log here", m);
   };`
   
   `let lb = new Transactions(con);`
   
   
   `lb.sendTokenBEB20("0x000112343xxxxxxx", 20).then(res=>{
       //get whole result here...
   });`
   
   Decimal passed to `amt` will be converted in `ethers` 1e9, so no conversion needed,
   example: `1BNB is 1, 1 unit of your token is 1` 
   
   ##Web3 Initialized Object
   `lb.okweb3()` will return an instance of web3 (initialized)
   
   `lb.getAccurateGasLimit(address, amount)` will return only the required gas fee for the transaction and can be consume on an external web3 agent
   
   `PROVIDERS` contains default providers and can be customized but default is `binance`
   
   `Transaction` this is your mother class as `okweb3`
   
   `abiArray` can be collected via `lb.abiArray` or `__ABI_ARRAY` as  import from library   
   
