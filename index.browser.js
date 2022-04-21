//main class
let lib = require('./lib');
// CONFIG.provider = PROVIDERS.binance;
// CONFIG.credential.contractAddress = "xxxxxxxxxxx_contrac_address";
// CONFIG.credential.fromPkey = "xxxxxxxxxxx_primary_key";
// CONFIG.credential.fromAddress = "xxxxxxxxxxx_master_account";
// let con = CONFIG;
// con.log = function (s, m) {
//     console.log("i want my log here", m);
// };
// //initialize
// let lb = new Transactions(con);
// //transfer bep20 token
// lb.sendTokenBEB20("0x000112343xxxxxxx", 20).then(res=>{
//     //get whole result here...
// });
module.exports = lib;