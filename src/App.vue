<template>
  <div id="app" class="stars">
    <!-- <router-view></router-view> -->
    <h1>ACESSE NOSSO NOVO SITE <a href="https://salesrocket.info/">AQUI</a></h1>
  </div>
</template>

<script>
  /*
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});
// import axios from 'axios';
// import api from './services/api'
//id de teste: MLB1830777149

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      mlb: [],
    }
  }
}
*/
</script>

<style>

body {
background: rgb(62,0,247);
background: radial-gradient(circle, rgba(62,0,247,1) 0%, rgba(125,45,231,1) 100%);
}
body::-webkit-scrollbar {
  width: 12px;               /* width of the entire scrollbar */
}

body::-webkit-scrollbar-track {
  background: rgb(0,0,0);        /* color of the tracking area */
}

body::-webkit-scrollbar-thumb {
  background-color: radial-gradient(circle, rgba(62,0,247,1) 0%, rgba(125,45,231,1) 100%);/* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid orange;  /* creates padding around scroll thumb */
}
.stars{
    background: url('./assets/overlay_stars.svg');
    background-repeat: repeat;
    background-size: contain;
    background-position: left top;
}

@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
