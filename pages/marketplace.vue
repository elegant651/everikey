<template>
  <div>
    <CommonNav />

    <div class="containWrap">
      <h2>Marketplace</h2>

      <div class="portfolio">
        <div class="row" v-on:click="transferToken()">
          <div class="col-md-6 col-lg-4">
            <a class="portfolio-item d-block mx-auto" href="#portfolio-modal-1">
              <div class="portfolio-item-caption d-flex position-absolute h-100 w-100">
                <div class="portfolio-item-caption-content my-auto w-100 text-center text-white">
                  <i class="fas fa-search-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid" src="/portfolio/g.png" alt="">
            </a>
          </div>
          <div class="col-md-6 col-lg-4">
            <a class="portfolio-item d-block mx-auto" href="#portfolio-modal-2">
              <div class="portfolio-item-caption d-flex position-absolute h-100 w-100">
                <div class="portfolio-item-caption-content my-auto w-100 text-center text-white">
                  <i class="fas fa-search-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid" src="/portfolio/b.jpg" alt="">
            </a>
          </div>
          <div class="col-md-6 col-lg-4">
            <a class="portfolio-item d-block mx-auto" href="#portfolio-modal-3">
              <div class="portfolio-item-caption d-flex position-absolute h-100 w-100">
                <div class="portfolio-item-caption-content my-auto w-100 text-center text-white">
                  <i class="fas fa-search-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid" src="/portfolio/c.jpg" alt="">
            </a>
          </div>
          <div class="col-md-6 col-lg-4">
            <a class="portfolio-item d-block mx-auto" href="#portfolio-modal-4">
              <div class="portfolio-item-caption d-flex position-absolute h-100 w-100">
                <div class="portfolio-item-caption-content my-auto w-100 text-center text-white">
                  <i class="fas fa-search-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid" src="/portfolio/d.jpg" alt="">
            </a>
          </div>
          <div class="col-md-6 col-lg-4">
            <a class="portfolio-item d-block mx-auto" href="#portfolio-modal-5">
              <div class="portfolio-item-caption d-flex position-absolute h-100 w-100">
                <div class="portfolio-item-caption-content my-auto w-100 text-center text-white">
                  <i class="fas fa-search-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid" src="/portfolio/e.jpg" alt="">
            </a>
          </div>
          <div class="col-md-6 col-lg-4">
            <a class="portfolio-item d-block mx-auto" href="#portfolio-modal-6">
              <div class="portfolio-item-caption d-flex position-absolute h-100 w-100">
                <div class="portfolio-item-caption-content my-auto w-100 text-center text-white">
                  <i class="fas fa-search-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid" src="/portfolio/f.jpg" alt="">
            </a>
          </div>
        </div>

      </div>
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
        address: 'EVT7j9oCTw47N5eehFFePTVA1cS53sHegMUGEo99MvsMesjne6WXF'
      }      
    },

    methods: {

      transferToken() {
        const isConfirm = confirm('Do you want to buy it?')
        if(!isConfirm){
          return
        }

        const tokenId = 'mbcbFtzxLVbdXousZQYl'
        this.$axios
          .$post('/api/transferToken', qs.stringify({'domainName': 'testDomain', 'tokenId': tokenId, 'to': this.address}))
          .then(response => {
            console.log("result", response)
            if(response.flag==1){
              const result = response.result
              
              alert("token transfered complete!")
            }
          }).catch(error => {
            console.log(error)

            alert("token transfered failed!")
          })
      }
    }
  }
</script>
<style scoped>
  .containWrap {
    margin-top: 150px;
  }

  .portfolio .portfolio-item {
    position: relative;
    display: block;
    max-width: 25rem;
    margin-bottom: 15px;
  }

  .portfolio .portfolio-item .portfolio-item-caption {
    -webkit-transition: all ease 0.5s;
    transition: all ease 0.5s;
    opacity: 0;
    background-color: rgba(24, 188, 156, 0.9);
  }

  .portfolio .portfolio-item .portfolio-item-caption:hover {
    opacity: 1;
  }

  .portfolio .portfolio-item .portfolio-item-caption .portfolio-item-caption-content {
    font-size: 1.5rem;
  }

  @media (min-width: 576px) {  
    .portfolio .portfolio-item {
      margin-bottom: 30px;
    }
  }

</style>