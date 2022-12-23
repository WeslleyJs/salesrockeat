<template>
  <section class="vh-100">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img src="../assets/img/values-2.png" class="img-fluid" alt="Sample image">
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <div>

          </div>
        </div>
      </div>
    </div>
    <div
      class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-dark">
      <!-- Copyright -->
      <div class="text-white mb-3 ">
        Copyright © 2022. All rights reserved.
      </div>
      <!-- Copyright -->

      <!-- Right -->
      <div>
        <a href="#!" class="text-white me-4">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="#!" class="text-white me-4">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="#!" class="text-white me-4">
          <i class="fab fa-google"></i>
        </a>
        <a href="#!" class="text-white">
          <i class="fab fa-linkedin-in"></i>
        </a>
      </div>
      <!-- Right -->
    </div>
  </section>
  <div>
    <p>Email</p>
    <input type="text" placeholder="email@email.com" class="input" v-model="email">
    <p>Senha</p>
    <input type="password" placeholder="Password" class="input" v-model="password">
    <hr>
    <button class="bg-success" @click="login">Login</button>
  </div>
</template>
<script>
// import axios from 'axios';
export default {
  name: 'user-cadastro',
  data() {
    return {
      email: '',
      password: '',
      error: undefined
    }
  },
  methods: {
    login() {
      console.log('Ola mundo!');
      // axios.get('http://localhost:3000/users/login',
      //   { email: this.email, password: this.password }).then((element) => {
      //     element
          
      //     this.$router.push({ name: 'Home' });
      //   }).catch(err => {
      //     var msgError = err.response.data.err;
      //     this.error = msgError
      //   });

    }
  }
}
</script>
<style scoped>
.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: rgb(121, 121, 121);
}

.h-custom {
  height: calc(100% - 73px);
}

@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}
</style>