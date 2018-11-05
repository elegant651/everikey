<template>
  <div>
    <CommonNav />

    <div class="containWrap">
      <h2>My Wallet</h2>
    	<b-card class="cardG">
    	  <div class="profile-info"> 
          <p class="uimg">
            <b-img left rounded="circle" width="75" height="75" src="https://i.imgur.com/hiSJELS.png" />
          </p>

    	  	<p class="text-center uname">
    	  	  {{uname}}  
    	  	</p>  	  	
    	  	<p class="text-center address">
    	  	   {{account}} <span class="reftxt">(Address)</span>
    	  	</p>
    	  	<p class="text-center balance">
    	  	   {{_getFormattedBalance}} <span class="reftxt">(Balance)</span>
    	  	</p>
    	  </div>
    	</b-card>

      <b-list-group class="blg">
        <b-list-group-item class="justify-content-between align-items-center" v-for="row in result" :key="row.name">
          <div>{{row.name}}</div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
  import qs from 'qs';
  import CommonNav from '~/components/landing/CommonNav.vue'

  export default {     
    components: {
      CommonNav
    },

    data() {
      return {
        uname: 'EveriKing',
        gender: 'male',        
        account: 'EVT75KYbXJN2JsL8tCSwMwtQHDMwT4gb14mofcSEc31U28HKybJNh',
        balance: null,
        errored: false,
        result: null
      }      
    },
    computed: {


      _getFormattedBalance() {
        if(this.balance){          
          const strBalance  = this.balance.toString();
          const lidx = strBalance.length-8
          return strBalance.slice(0, lidx);
        } else {
          return 0
        }
      }
    },

    mounted() {
      this.$axios
        .$post('/api/getOwnedTokens', qs.stringify({'pubkey': this.account}))
        .then(response => {
          console.log('result', response)
          if(response.flag==1){
            this.result = response.result
          }
        }).catch(error => {
          console.log(error)
        })
    }   
  }
</script>
<style scoped>
  .containWrap {
    margin-top: 150px;
  }

  .cardG {
    max-width: 600px;
    height: 190px;
  }   

  .profile-info {
    font-size: 14px;
  }  

  .profile-info .uname {
    font-weight: 800;
  }  

  .profile-info .reftxt{
    font-size: 11px;
    font-weight: 400;
  }

  .profile-info .balance {
    font-size: 16px;
    font-weight: 700;
  }
</style>