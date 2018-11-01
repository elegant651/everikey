module.exports = function(app, key) {

  const request = require('request')
  const EVT = require('evtjs')

  const network = {
    host: 'testnet1.everitoken.io',
    port: 8888,                     
    protocol: 'http'             
  };

  const wif = '5JveXsE4y6PgV823mduQmkcTxYMAvpmroVXB9Xg3ckm5yRZWNq2'
  const payer = 'EVT75KYbXJN2JsL8tCSwMwtQHDMwT4gb14mofcSEc31U28HKybJNh'
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
  
  async function issueNFTTokens(domainName) {
  	const result = await apiCaller.pushTransaction(
	    { maxCharge: 10000, payer: payer },
	    new EVT.EvtAction("issuetoken", {
	        "domain": domainName,
	        "names": [
	            "token1",
	            "token2",
	            "token3"
	        ],
	        "owner": [
	            publicKey
	        ]
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

  // getApiInfo()
  // createDomain('testDomain')
  // issueNFTTokens('testDomain')
  // getDomainDetail('testDomain')
  getOwnedTokens(publicKey)
  getCreatedDomains(publicKey)



  app.post('/api/genAvatar', (req, res) => {
  	const address = req.body.address || "1BoatSLRHtKNngkdXEeobR76b53LETtpyT"

	const formData = {
	  module: 'AvatarGenerator',
	  walletAddress: address
	}

	request.post({url:'', formData: formData}, (err, httpResponse, body) => {
	  if (err) {
	    console.error('err:', err)
	    return res.json({'flag': 0})
	  }
	  console.log(' Server responded with:', body)
	  return res.json({'flag': 1, 'result': JSON.parse(body)})
	})
  })

}