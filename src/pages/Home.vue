<template>
  <Header />
  <div class="bgColor objects">
    <!-- http://salehriaz.com/404Page/img/rocket.svg -->
    <img class="object_rocket" src="../assets/rocket.svg" width="60px">
    <div class="container">
      <div class="row">
        <div data-aos="fade-right" data-aos-delay="500" class="col-lg-6 d-flex flex-column justify-content-center">
          <h1 data-aos-delay="400" class="aos-init aos-animate">Oferecemos soluções modernas para seu e-commerce</h1>
          <h2 data-aos="fade-up" data-aos-delay="500" class="aos-init aos-animate">Somos uma equipe talentosa dispostos
            a
            te ajudar</h2>
          </div>
          <div class="col-lg-6 hero-img aos-init aos-animate" data-aos="zoom-out" data-aos-delay="200">
            <img data-aos="fade-left" data-aos-delay="400" src="../assets/img/hero-img.png" class="img-fluid" alt="">
          </div>
        </div>
       
    </div>
  </div>
  <div class="container space">
    <div class="row">
      <div class="col-lg-6 hero-img aos-init aos-animate" data-aos="zoom-out" data-aos-delay="200">
        <img data-aos="fade-right" data-aos-delay="500" src="../assets/img/features-2.png"
          style="width=50px; height=50px;" class="img-fluid" alt="">
      </div>
      <div class="col-lg-6 d-flex flex-column justify-content-center">
        <h3 id="about" data-aos="fade-right" class="aos-init aos-animate"><b>Sobre-nós</b></h3>
        <h4 data-aos="fade-down" data-aos-delay="400" class="aos-init aos-animate">
          Nossa Ferramenta tem como propósito, passar aos sellers uma visão maior sobre o mercado e
          seus concorrentes trazendo maior competitividade no mercado
          com anúncios mais atrativos.
        </h4>
        <p data-aos="fade-right" data-aos-delay="500" class="aos-init aos-animate">
          Vale lembrar que a API do Mercado Livre não fornece as informações precisas das informações.
          Tendo em mente de trazer privacidade para seus sellers.Sendo assim as informações presentes
          nesta ferramenta, trata-se de um valor aproximado, que o próprio Mercado Livre fornece em suas API's
        </p>
      </div>
    </div>
  </div>
  <div>
  <div class="container space">
    <div class="row">
      <div data-aos="fade-up" data-aos-delay="400" class="col-lg-6 d-flex flex-column justify-content-center">
        <h4 data-aos="fade-up" data-aos-delay="400" class="aos-init aos-animate">    
          Desenvolvido para seu negócio decolar,
          Embarque você também nesse foguete de vendas
        </h4>
      </div>
      <div class="col-lg-6 hero-img aos-init aos-animate" data-aos="zoom-out" data-aos-delay="200">
        <img data-aos="fade-up" data-aos-delay="400" src="https://preview.uideck.com/items/appvilla/assets/images/hero/phone.png"
          style="width=50px; height=50px;" class="img-fluid" alt="">
      </div>
    </div>
  </div>
</div>
<Footer />

</template>
<script>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
export default {
  name: 'home-page',
  components:{
    Header,
    Footer,
  }
}
</script>
<style scoped >

.object_rocket{
    z-index: 95;
    position: absolute;
    transform: translateX(-50px);
    top: 75%;
    pointer-events: none;
    animation: rocket-movement 100s linear infinite both running;
}
@-moz-keyframes rocket-movement { 100% {-moz-transform: translate(1200px,-600px);} }
@-webkit-keyframes rocket-movement {100% {-webkit-transform: translate(1200px,-600px); } }
@keyframes rocket-movement { 100% {transform: translate(1200px,-600px);} }
.objects img{
    z-index: 90;
    pointer-events: none;
}

*{
  color: white;
}
.space {
  margin-top: 2%;
}
.bgColor {  
  width: 100%;
  color: white;
}
ul, li{
  list-style: none;
}
a {
  color: aliceblue;
  text-decoration: none;
}
</style>
