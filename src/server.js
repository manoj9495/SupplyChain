const express = require('express')
const app = express()
app.use(express.static(__dirname + '/../public'));
const bodyParser = require('body-parser')
const Web3 = require('web3')

const web3 = new Web3('https://rinkeby.infura.io/v3/3987bbdc8cf141918317a827d42ac907') //Link is provider.

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {name:""}) //
})

const contractAddress = "0x44f7C01E2Fff454c78bAb7AE99C9287566b7b989"
const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "party",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "supervisorName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "callerAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "productID",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct Tracker.productDetails",
				"name": "",
				"type": "tuple"
			}
		],
		"name": "details",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "getMsg",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_productID",
				"type": "uint256"
			}
		],
		"name": "getData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "party",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "supervisorName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "callerAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "productID",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					}
				],
				"internalType": "struct Tracker.productDetails",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "add",
				"type": "address"
			}
		],
		"name": "getMessage",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_party",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_supervisorName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_productName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_productID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_quantity",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "submitData",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const publicAddress = "0x8Df204057d8AC537451Bb177A76538ae235eB33d"
const privateAddress = "c64f1e67d90af269ab19c94e0722503c9423634e1a13b2850897879ec44f4460"

// app.post('/submitData', (req, res) => {
//     var partyName = req.body.party;
//     var supervisorName = req.body.name;
//     var productName = req.body.productname;
//     var productID = req.body.productID;
//     var quantity = req.body.quantity;
//     var date = req.body.date;
//     var price = req.body.price;

// 	const networkId = await web3.eth.net.getId();    //Provider is of which network - Rinkeby(4)
//     const myContract = await new web3.eth.Contract(abi, contractAddress);  //Connection of web3 library with smartContract

//     const tx = myContract.methods.getData(pid)
//     const gas = await tx.estimateGas({ from : publicAddress })
//     const gasPrice = await web3.eth.getGasPrice();
//     const data = tx.encodeABI();
//     const nonce = await web3.eth.getTransactionCount(publicAddress);

//     const signedTx = await web3.eth.accounts.signTransaction({
//         to: myContract.options.address,
//         data,
//         gasPrice,
//         gas,
//         nonce,
//         chainId: networkId
//     }, privateAddress)

//     const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
//     res.send(receipt)


//     // if(partyName != "MFG"){
//     //     res.render('index', {add:true})
//     // } 

//     res.send(partyName +"  "+ supervisorName +" Supply "+ productName+" price "+ price +" of quantity "+quantity)
//     res.end()
// })

app.get('/getData', (req, res) =>{
    res.render('getdata')
})

app.post('/getProductDetails', (req, res) =>{
    var pid = req.body.pid;
	console.log("Get product details")
    productDetails(pid, res)

})

productDetails = async(pid, res) => {
    const networkId = await web3.eth.net.getId();    //Provider is of which network - Rinkeby(4)
    const myContract = await new web3.eth.Contract(abi, contractAddress);  //Connection of web3 library with smartContract

    const tx = myContract.methods.getData(pid)
    const gas = await tx.estimateGas({ from : publicAddress })
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(publicAddress);

    const signedTx = await web3.eth.accounts.signTransaction({
        to: myContract.options.address,
        data,
        gasPrice,
        gas,
        nonce,
        chainId: networkId
    }, privateAddress)

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    res.send(receipt)
}

app.listen(8080, () =>{
    console.log("Server is up an running at localhost:8080")
})

