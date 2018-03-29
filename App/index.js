const Web3 = require('web3')
const fs = require('fs')

let address = '0x509f1be418c806743a07efe39796296dcc741e5c'
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

const filePath = __dirname + '/../HelloSolidity/build/contracts/HelloSolidity.json'
const source = fs.readFileSync(filePath)
let json = JSON.parse(source)

let abi = json.abi
let contract = new web3.eth.Contract(abi, address)

contract.methods.sayHello().call(console.log)
contract.methods.sayHello("test").call(console.log)

/*web3.eth.defaultAccount = web3.eth.accounts[0];
console.log('web3.eth.defaultAccount',web3.eth.defaultAccount)

const filePath = __dirname + '/../HelloSolidity/build/contracts/HelloSolidity.json'
const source = fs.readFileSync(filePath)
let json = JSON.parse(source)

let abi = json.abi
let contract = new web3.eth.Contract(abi, address)

console.log('contract option', contract.options)
let info = contract.methods.info().call()
info.then(data => console.log('test',data))
console.log('info', info)*/


//console.log('contract', contract)
