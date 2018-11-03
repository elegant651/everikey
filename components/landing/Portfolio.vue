<template>
  <div class="portfolio">
  	<div class="row">
      <div class="col-md-6 col-lg-4">
        <a class="portfolio-item d-block mx-auto" href="#portfolio-modal-1">
          <div class="portfolio-item-caption d-flex position-absolute h-100 w-100">
            <div class="portfolio-item-caption-content my-auto w-100 text-center text-white">
              <i class="fas fa-search-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="/portfolio/a.jpg" alt="">
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
</template>
<script>

export default {

  data() {
    return {

    }
  },

  methods: {

  }
}

</script>
<style scoped>
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