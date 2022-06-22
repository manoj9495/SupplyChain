const express = require('express')
const path = require('path')
const app = express()
app.use(express.static(__dirname + '/../public'));
const bodyParser = require('body-parser')
const Web3 = require('web3')

// const web3 = new Web3('https://rinkeby.infura.io/v3/3987bbdc8cf141918317a827d42ac907') //Link is provider.
const web3 = new Web3('http://127.0.0.1:9545/') //Link is blockchain provider.

app.use(bodyParser.urlencoded({ extended: false }))
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('index', {name:""}) //
})

app.get('/contact', (req, res) => {
    res.render('contact', {name:""}) //
})

app.get('/register', (req, res) => {
    res.render('registration', {name:""}) //
})

app.get('/admin', (req, res) => {
    res.render('admin', {name:""}) //
})
const contractAddress = "0xc1F65fb685dB96BDee621876E9517F8a46829CEf"
const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "add",
		"type": "event"
	},
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
		"name": "dte",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "par",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pri",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "prodID",
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
		"name": "prodName",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "quan",
		"type": "event"
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
		"name": "supName",
		"type": "event"
	}
]
const publicAddress = "0x4ef6645952b7604c9ab2b6ded35c0162d1ecf41f"
const privateAddress = "22e34a374e72518d20c66c9ec180431172a36ddaeef46b90b0326086721e8b51"

app.post('/submitData', (req, res) => {
    submitData(req, res);
})

submitData = async(req, res) => {
	var partyName = req.body.party;
    var supervisorName = req.body.name;
    var productName = req.body.productname;
    var productID = req.body.productID;
    var quantity = req.body.quantity;
    var date = req.body.date;
    var price = req.body.price;

	const networkId = await web3.eth.net.getId();    //Provider is of which network - Rinkeby(4)
    const myContract = await new web3.eth.Contract(abi, contractAddress);  //Connection of web3 library with smartContract

    const tx = myContract.methods.submitData(partyName, supervisorName, productName, productID, quantity, date, price);
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


    // if(partyName != "MFG"){
    //     res.render('index', {add:true})
    // } 

    // res.send(partyName +"  "+ supervisorName +" Supply "+ productName+" price "+ price +" of quantity "+quantity)
    // res.end()
}

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
    let nonce = await web3.eth.getTransactionCount(publicAddress);
	let newGas = parseInt(gasPrice)+10
    const signedTx = await web3.eth.accounts.signTransaction({
    to: myContract.options.address,
        data,
		newGas,
        gas,
        nonce,
        chainId: networkId
    }, privateAddress)

	try{
		web3.eth.sendSignedTransaction(signedTx.rawTransaction)
		.on('transactionHash', function(hash){
			console.log("New hash ", hash)
		})
		.then(receipt=>{
			res.send(hex_to_ascii(receipt.logs[1].data) +"\n"+hex_to_ascii(receipt.logs[2].data)+"\n"+hex_to_ascii(receipt.logs[3].data)+"\n"+hex_to_ascii(receipt.logs[4].data)+"\n"+hex_to_ascii(receipt.logs[5].data)+"\n"+hex_to_ascii(receipt.logs[6].data)+"\n"+hex_to_ascii(receipt.logs[7].data)+"\n"+hex_to_ascii(receipt.logs[8].data)+"\n")
		})
		.catch(err=>{
			console.log("error on transaction")
			const receipt = null;
			res.send(err.toString())
		})
	}
	catch(err) {
		console.log("error on transaction")
		const receipt = null;
		res.send(err.toString())
	}
}

function hex_to_ascii(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }

app.listen(8080, () =>{
    console.log("Server is up an running at localhost:8080")
})

