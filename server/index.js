
const express = require('express')
const bodyParser = require('body-parser');
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

const fs = require('fs')
const key = JSON.parse(fs.readFileSync('server/.key', 'utf8'))


app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  //Nagle Algorithm off
  app.use(function(req,res,next){
    req.connection.setNoDelay(true);
    if (req.url.match(/^\/(css|js|img|font|png|jpg|jpeg|gif|bmp)\/.+/)) {
    } else {
      res.header("Cache-Control", 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '0');
      res.header('Pragma', 'no-cache');
    }
    respCorsHeader(req,res);
    next();
  });

  function respCorsHeader(req,res) {
    // res.header("Access-Control-Allow-Origin", req.protocol+"://" + apiinfo.origin_domain);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    return res;
  }

  require('./api')(app, key)

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
