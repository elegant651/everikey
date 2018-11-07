<template>
  <div>
    <b-card>
      <b-btn @click.prevent="createPubkey">Create Pubkey</b-btn>      
    </b-card>

    <b-card>      
      <b-form @submit.prevent="generateAvatar">
        <b-input-group>
          <b-form-input id="ipAddress" type="text" placeholder="Please enter your address" v-model="address" ></b-form-input>
          <b-input-group-append>
            <b-btn variant="info" type="submit">Generate</b-btn>
          </b-input-group-append>
        </b-input-group>
      </b-form>

      <div id="imgBox">
      	<b-img id="genImg" center thumbnail :src="genImgData" />

      	<template v-if="loading">
	        <div class="spinner"></div>
	      </template>
        
        <template v-if="loaded">
          <b-btn variant="info" center @click="uploadAvatar()">Get this everikey</b-btn>
          <div>
            <h2>Status:</h2>
            <div>ipfs hash : {{ipfsHash}}</div>
            <div>eth address : {{ethAddress}}</div>
            <div>transaction hash : {{transactionHash}}</div>
          </div>
        </template>
      </div>
    </b-card>
  </div>	
</template>
<script>
import qs from 'qs';
import Web3 from 'web3'
import IPFS from 'ipfs-api'
import {sh_abi, sh_address} from '~/components/landing/storeHashContract'
import firebase from 'firebase'
import firebaseStore from 'firebase/firestore'

export default {
  components: {
    
  },

  data() {
    return {
      loading: false,
      loaded: false,
      genImgData: null,
      address: '', // EVT75KYbXJN2JsL8tCSwMwtQHDMwT4gb14mofcSEc31U28HKybJNh      
      web3: null,
      storehashInstance: null,
      ethAddress: null,
      ipfs: null,
      ipfsHash: null,
      transactionHash: null,
      uploadedData: null
    }
  },

  mounted() {    
    // this.ipfsHash = 'QmZa1a94X8jdFoGGVGuo1SWqy9tom1RLLEmhBXB8sJQDPF'
    // this.address = 'EVT75KYbXJN2JsL8tCSwMwtQHDMwT4gb14mofcSEc31U28HKybJNh'
    // this.issueToken()

    const config = {
      apiKey: "AIzaSyCsVi15QQTbjtEYkl0nAiIxqldW3hU1orM",
      authDomain: "avarkey-bb036.firebaseapp.com",
      databaseURL: "https://avarkey-bb036.firebaseio.com",
      projectId: "avarkey-bb036",
      storageBucket: "",
      messagingSenderId: "725374065200"
    };
    firebase.initializeApp(config);    
  },

  methods: {
    createPubkey() {
      this.$axios
        .$post('/api/newRandKey')
        .then(response => {
          console.log("result", response)
          if(response.flag==1){
            const pubkey = response.result            
            this.address = pubkey            
          }
        }).catch(error => {
          console.log(error)
        })
    },

    generateAvatar() {
      this.loading = true;
      this.genImgData = null
      this.$axios
        .$post('/api/genAvatar', qs.stringify({'address': this.address}))
        .then(response => {
          console.log("result", response)
          if(response.flag==1){
          	const imgData = response.result.imageData
          	this.genImgData = imgData
          	console.log(this.genImgData)
            this.loaded = true
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading = false
        })
    },


    async uploadAvatar() {
      if(!this.genImgData) {
        return
      }

      const web3js = window.web3
      if(typeof web3js !== 'undefined') {
        this.web3 = new Web3(web3js.currentProvider)
      }
      this.ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https'})

      this.storehashInstance = new this.web3.eth.Contract(sh_abi, sh_address)  
      const buffer = await Buffer.from(this.genImgData)

      const accounts = await this.web3.eth.getAccounts()
      this.ethAddress = await this.storehashInstance.options.address

      this.ipfs.add(buffer, (err, ipfsHash) => {
        console.log(err, ipfsHash)
        this.ipfsHash = ipfsHash[0].hash
        this.storehashInstance.methods.setHash(this.ipfsHash).send({
          from: accounts[0],
          gas: 5000000
        }, (error, transactionHash) => {
          console.log("txhash",transactionHash)
          this.transactionHash = transactionHash

          const db = firebase.firestore()
          db.collection("hashes").add({
            ipfsHash: this.ipfsHash,
            transactionHash: this.transactionHash,
            ethAddress: this.ethAddress
          })
          .then((docRef) => {
            console.log("savedId:", docRef.id)
            //call issueToken
            this.issueToken(docRef.id)
          })
          .catch((error) => {
            console.error("error:", error)
          })          
          
        })
      })
    },

    issueToken(tokenId) {
      this.$axios
        .$post('/api/issueToken', qs.stringify({'domainName': 'testDomain', 'tokenId': tokenId, 'pubkey': this.address}))
        .then(response => {
          console.log("result", response)
          if(response.flag==1){
            const result = response.result
            
            alert("token issued complete!")
          }
        }).catch(error => {
          console.log(error)

          alert("token issued failed!")
        })
    }

  }
  
}
</script>
<style scoped>
.spinner {
  width: 40px;
  height: 40px;
  background-color: #4cd8ef;
  border-radius: 15px;

  margin: 100px auto;
  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  animation: sk-rotateplane 1.2s infinite ease-in-out;
}

@-webkit-keyframes sk-rotateplane {
  0% { -webkit-transform: perspective(120px) }
  50% { -webkit-transform: perspective(120px) rotateY(180deg) }
  100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
}

@keyframes sk-rotateplane {
  0% { 
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg) 
  } 50% { 
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg) 
  } 100% { 
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
</style>