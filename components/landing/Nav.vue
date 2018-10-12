<template>
  <div>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg bg-secondary fixed-top text-uppercase" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="#page-top">Everikey</a>
        <button class="navbar-toggler navbar-toggler-right text-uppercase bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item mx-0 mx-lg-1">
              <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" v-on:click="goMenu('portfolio')" href="#portfolio">Main</a>
            </li>
            <li class="nav-item mx-0 mx-lg-1">
              <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" v-on:click="goMenu('about')" href="#about">About</a>
            </li>
            <li class="nav-item mx-0 mx-lg-1">
              <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" v-on:click="goMenu('contact')" href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  </div>
</template>
<script>

export default {  

  mounted() {
    
  },

  methods: {
    goMenu(hash) {      
      this.$emit('goMenu', hash)
    }  
  }
  
}
</script>
<style scoped>

section {
  padding: 6rem 0;
}

section h2 {
  font-size: 2.25rem;
  line-height: 2rem;
}

@media (min-width: 992px) {
  section h2 {
    font-size: 3rem;
    line-height: 2.5rem;
  }
}

#mainNav {
  height: 100px;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-weight: 700;
  font-family: 'Montserrat';
}

#mainNav .navbar-brand {
  color: #fff;
}

#mainNav .navbar-nav {
  margin-top: 1rem;
  letter-spacing: 0.0625rem;
}

#mainNav .navbar-nav li.nav-item a.nav-link {
  color: #fff;
}

#mainNav .navbar-nav li.nav-item a.nav-link:hover {
  color: #18BC9C;
}

#mainNav .navbar-nav li.nav-item a.nav-link:active, #mainNav .navbar-nav li.nav-item a.nav-link:focus {
  color: #fff;
}

#mainNav .navbar-nav li.nav-item a.nav-link.active {
  color: #18BC9C;
}

#mainNav .navbar-toggler {
  font-size: 80%;
  padding: 0.8rem;
}

@media (min-width: 992px) {
  #mainNav {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    -webkit-transition: padding-top 0.3s, padding-bottom 0.3s;
    transition: padding-top 0.3s, padding-bottom 0.3s;
  }
  #mainNav .navbar-brand {
    font-size: 2em;
    -webkit-transition: font-size 0.3s;
    transition: font-size 0.3s;
  }
  #mainNav .navbar-nav {
    margin-top: 0;
  }
  #mainNav .navbar-nav > li.nav-item > a.nav-link.active {
    color: #fff;
    background: #18BC9C;
  }
  #mainNav .navbar-nav > li.nav-item > a.nav-link.active:active, #mainNav .navbar-nav > li.nav-item > a.nav-link.active:focus, #mainNav .navbar-nav > li.nav-item > a.nav-link.active:hover {
    color: #fff;
    background: #18BC9C;
  }
  #mainNav.navbar-shrink {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  #mainNav.navbar-shrink .navbar-brand {
    font-size: 1.5em;
  }
}

</style>