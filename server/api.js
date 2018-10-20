module.exports = function(app, key) {

  const request = require('request')
  const EVT = require('evtjs')

  const network = {
    host: 'testnet1.everitoken.io',
    port: 8888,                     
    protocol: 'https'             
  };

  async function getApiInfo(){
    let key = await EVT.EvtKey.randomPrivateKey();

    //get info
    const apiCaller = EVT({
      endpoint: network,
      keyProvider: key
    });

    const info = await apiCaller.getInfo();
    console.log(info)
    
  }
  
  async function createDomain() {
  	await apiCaller.pushTransaction(
	    { maxCharge: 10000, payer: "EVTXXXXXXXXXXXXXXXXXXXXXXXXXX" },
	    new EVT.EvtAction("newdomain", {
	        "name": testingTmpData.newDomainName,
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
  }
  
  async function issueNFTTokens() {
  	await apiCaller.pushTransaction(
	    { maxCharge: 10000, payer: "EVTXXXXXXXXXXXXXXXXXXXXXXXXXX" },
	    new EVT.EvtAction("issuetoken", {
	        "domain": testingTmpData.newDomainName,
	        "names": [
	            testingTmpData.addedTokenNamePrefix + "1",
	            testingTmpData.addedTokenNamePrefix + "2",
	            testingTmpData.addedTokenNamePrefix + "3"
	        ],
	        "owner": [
	            Key.privateToPublic(wif)
	        ]
	    })
	);
  }


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