module.exports = function(app, key) {

  const request = require('request')
  const EVT = require('evtjs')

  const network = {
    host: 'testnet1.everitoken.io',
    port: 8888,                     
    protocol: 'https'             
  };

  let key = await EVT.EvtKey.randomPrivateKey();

  const apiCaller = EVT({
    endpoint: network,
    keyProvider: key
  });

  apiCaller.getInfo()
  .then(res => {
  	console.log(res)
  })
  .catch((e) => {
     // TODO
  })
  

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