module.exports = function(app, key) {

  const request = require('request')
  const EVT = require('evtjs')

  const network = {
    host: 'testnet1.everitoken.io',
    port: 8888,                     
    protocol: 'http'             
  };

  const wif = '5JveXsE4y6PgV823mduQmkcTxYMAvpmroVXB9Xg3ckm5yRZWNq2' //tester1
  // const wif = '5JaqJP8V5M1zt3Ud7xWnfXyuwx6que3H8gENeXFQjsXFv4MsbX7' //tester2
  const payer = 'EVT75KYbXJN2JsL8tCSwMwtQHDMwT4gb14mofcSEc31U28HKybJNh'
  
  // async function randKey() {
  // 	const priv_key = await EVT.EvtKey.randomPrivateKey();
  // 	console.log(priv_key)	
  // }
  

  const publicKey = EVT.EvtKey.privateToPublic(wif)
  console.log("key: "+publicKey)
  //get info
  const apiCaller = EVT({
    endpoint: network,
    keyProvider: wif
  });

  async function getApiInfo(){    
    const info = await apiCaller.getInfo();
    console.log(info)  
  }
  
  async function createDomain(domainName) {
  	const result = await apiCaller.pushTransaction(
	    { maxCharge: 10000},
	    new EVT.EvtAction("newdomain", {
	        "name": domainName,
	        "creator": publicKey,
	        "issue": {
	            "name": "issue",
	            "threshold": 1,
	            "authorizers": [{
	                "ref": "[A] " + publicKey,
	                "weight": 1
	            }]
	        },
	        "transfer": {
	            "name": "transfer",
	            "threshold": 1,
	            "authorizers": [{
	                "ref": "[G] .OWNER",
	                "weight": 1
	            }]
	        },
	        "manage": {
	            "name": "manage",
	            "threshold": 1,
	            "authorizers": [{
	                "ref": "[A] " + publicKey,
	                "weight": 1
	            }]
	        }
	    })
	);
	console.log(result)
  }
  
  async function issueTokens(domainName, tokenName) {
  	const result = await apiCaller.pushTransaction(
	    { maxCharge: 10000, payer: payer },
	    new EVT.EvtAction("issuetoken", {
	        "domain": domainName,
	        "names": [
	            tokenName	            
	        ],
	        "owner": [
	            publicKey
	        ]
	    })
	);
	console.log(result)
  }

  async function transferTokens(domainName, tokenName, to, memo) {
  	const result = await apiCaller.pushTransaction(
  		{ maxCharge: 10000, payer: payer },
  		new EVT.EvtAction("transfer", {
  			"domain": domainName,
  			"name": tokenName,
  			"to": [to],
  			"memo": memo
  		})
  	);
  	console.log(result)
  }

  async function destroyToken(domainName, tokenName) {
  	const result = await apiCaller.pushTransaction(
  		{ maxCharge: 10000, payer: payer },
  		new EVT.EvtAction("destroytoken", {
  			"domain": domainName,
  			"name": tokenName
  		})
  	);
  	console.log(result)
  }

  async function getDomainDetail(name) {
  	const info = await apiCaller.getDomainDetail(name)
  	console.log(info)
  }

  async function getOwnedTokens(pubkeys) {
  	const info = await apiCaller.getOwnedTokens(pubkeys)
  	console.log(info)
  }

  async function getCreatedDomains(pubkeys) {
  	const info = await apiCaller.getCreatedDomains(pubkeys)
  	console.log(info)
  }

  async function getToken(domainName, id) {
  	const info = await apiCaller.getToken(domainName, id)
  	console.log(info)
  }

  // randKey()
  // getApiInfo()
  // getDomainDetail('testDomain')  
  // getCreatedDomains(publicKey)
  // createDomain('testDomain')

  // issueTokens('testDomain', 'token1')  
  // transferTokens('testDomain', 'token1', 'EVT6N5mTjR4tRLr8SxVEJJP132fqqV7YvKTTMbUCb5q4yk6iUBbKR', '')
  
  getOwnedTokens(publicKey)
  // getToken('testDomain', 'token1')
  

  app.post('/api/newRandKey', async (req, res) => {
  	const priv_key = await EVT.EvtKey.randomPrivateKey();
  	const pubkey = EVT.EvtKey.privateToPublic(priv_key)

  	res.json({'flag': 1, 'result': pubkey})
  })

  
  app.post('/api/getOwnedTokens', async (req, res) => {
  	const pubkey = req.body.pubkey

  	const info = await apiCaller.getOwnedTokens(pubkey)
  	res.json({'flag':1, 'result': info})
  })

  app.post('/api/getToken', async (req, res) => {
  	const domainName = req.body.domainName
  	const tokenId = req.body.tokenId

  	const info = await apiCaller.getToken(domainName, tokenId)
  	res.json({'flag':1, 'result': info})
  })

  app.post('/api/issueToken', async (req, res) => {
  	const domainName = req.body.domainName
  	const tokenId = req.body.tokenId
  	const pubkey = req.body.pubkey


  	const result = await apiCaller.pushTransaction(
	    { maxCharge: 10000, payer: payer },
	    new EVT.EvtAction("issuetoken", {
	        "domain": domainName,
	        "names": [
	            tokenId	            
	        ],
	        "owner": [
	            pubkey
	        ]
	    })
	);
	console.log(result)
  	res.json({'flag':1, 'result': result})
  })

  app.post('/api/transferToken', async (req, res) => {
  	const domainName = req.body.domainName
  	const tokenId = req.body.tokenId
  	const to = req.body.to
  	const memo = ''

  	const result = await apiCaller.pushTransaction(
  		{ maxCharge: 10000, payer: payer },
  		new EVT.EvtAction("transfer", {
  			"domain": domainName,
  			"name": tokenId,
  			"to": [to],
  			"memo": memo
  		})
  	);
  	res.json({'flag':1, 'result': result})
  })


  app.post('/api/genAvatar', (req, res) => {
  	const address = req.body.address || "1BoatSLRHtKNngkdXEeobR76b53LETtpyT"

	const formData = {
	  module: 'AvatarGenerator',
	  walletAddress: address
	}

	request.post({url:'http://mariankulisch.de/api/', formData: formData}, (err, httpResponse, body) => {
	  if (err) {
	    console.error('err:', err)
	    return res.json({'flag': 0})
	  }
	  console.log(' Server responded with:', body)
	  return res.json({'flag': 1, 'result': JSON.parse(body)})
	})
  })

}