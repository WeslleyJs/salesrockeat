<template>
    <Header/>
    <div class="bg-purple">
    <div class="transi search-box bg-gradient">
        <input @keyup.enter="search" type="text" class="search-text" v-model="id" placeholder="MLB">
        <button type="submit" class="btn search-button btn-success" @click="search">
            <img src="../assets/img/icons8-pesquisar-480.svg" height="35" width="35">
        </button>
    </div>
    <!-- <p>MLB1830777149</p>
    <p>2742122115</p> -->
    <!-- http://salehriaz.com/404Page/img/earth.svg -->
    <img class="object_earth" src="../assets/earth.svg" width="100px">
    <div v-if="clk">
        <br>
        <br>
        <section v-if="errors">
            <div v-if="errors" class="alert alert-danger card-group notfound" data-aos="flip-right" data-aos-delay="150"
                role="alert">
                MLB Invalido ou não existente
            </div>
        </section>
        <section v-else data-aos="flip-right" data-aos-delay="300">
            <div>
                <br>
                <div class="myInfo">
                    <div v-if="mlb" class="card borderT">
                        <div class="card-body max-li myText">
                            <nav class="imgPng">
                                <img :src="imgPng">
                            </nav>
                            <h6><b>Título: {{ mlb.title }}</b></h6>
                            <p v-if="date"><b>Data de Cadastro: {{ date }}</b></p>
                            <p><b>Estoque: {{ mlb.available_quantity }}</b></p>
                            <p><b>{{ mlb.sold_quantity }} Vendidos</b></p>
                            <p v-if="shipp"><b>Valor Frete Pago Pelo Seller: R${{ shipp }}</b></p>
                            <p v-if="shipp"><b>Peso de Cadastro: {{ kg }}g</b></p>
                            <p v-else><b>Envios <span style="font-size:20px; color: green;">FULL</span></b></p>
                        </div>
                        <ul class="mx-auto card-group w800">
                            <li data-aos="flip-right" data-aos-delay="300" class="card-body myBox backgroundEffect"
                                v-for="item in mlb.variations" :key="item.id">
                                <p><b>Atributos: {{ item.attribute_combinations[0].value_name }}</b></p>
                                <p v-if='attribute02'><b>Atributos 02: {{
                                        item.attribute_combinations[2].value_name
                                }}</b></p>
                                <p v-else></p>
                                <p><b>Estoque: {{ item.available_quantity }}</b></p>
                                <p id="myTest"><b>Vendidos: {{ item.sold_quantity }}</b></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
    </div>
</template>
<script>
import axios from 'axios';
import Header from '../components/Header.vue'

export default {
    name: 'dashboardPage',
    components: {
        Header,
    },
    data() {
        return {
            clk: true,
            id: '',
            mlb: '',
            imgPng: '',
            date: undefined,
            shipp: '',
            kg: '',
            attribute02: '',
            loading: '',
            errors: false,
            soldAsc: '',
        }
    },
    methods: {
        async search() {
            if (!this.id.startsWith('MLB')) this.id = 'MLB' + this.id
            await axios.get(`https://api.mercadolibre.com/items/${this.id}`).then(res => {
                const data = res.data
                this.mlb = data;
                const date = data.date_created;
                this.date = date.slice(0, 10).split('-').reverse().join('/');

                const attributes = data.variations;
                attributes.forEach(element => {
                    element
                    const imgPng = element.picture_ids;
                    this.imgPng = `http://http2.mlstatic.com/D_${imgPng[0]}-O.jp`
                    const attr = element.attribute_combinations[2];
                    this.attribute02 = attr;
                })
            }).catch((error) => {
                console.log('erro aqui', error.message)
                const notFound = error.message;
                this.errors = notFound;
                setTimeout(() => document.location.reload(true), 1300);

            });
            this.shipping();
        },
        async shipping() {
            var shp = '';
            var pes = '';

            if(!this.id.startsWith('MLB')) this.id = 'MLB'+this.id
            await axios.get(`https://api.mercadolibre.com/items/shipping_options/free?ids=${this.id}`).then(res => {

                const data = res.data
                Object.keys(data).map(function (key) {
                    const result = data[key].coverage.all_country
                    const price = result.list_cost
                    const peso = result.billable_weight
                    shp = price;
                    pes = peso;
                })
                this.shipp = shp;
                this.kg = pes

            }).catch(err => {
                this.errors = err.message;
                console.log(err.message);
            });
        }
    }
}

</script>
<style scoped>
.object_earth{
    position:absolute;
    top: 15%;
    width: 100px;
    left: 90%;
    z-index: 90;
   animation: spin-earth 100s infinite linear both;
}
@-moz-keyframes spin-earth { 100% { -moz-transform: rotate(-360deg); transition: transform 20s;  } }
@-webkit-keyframes spin-earth { 100% { -webkit-transform: rotate(-360deg); transition: transform 20s;  } }
@keyframes spin-earth{ 100% { -webkit-transform: rotate(-360deg); transform:rotate(-360deg); transition: transform 20s; } }
.myInfo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.notfound {
    max-width: 30%;
    width: 30%;
}

.max-li {
    background-color: red;
    display: inline-block;
    justify-content: center;
    /* width: 800px; */
}

.ul-btn {
    cursor: pointer;
}

.myText {
    /* display: flex; */
    text-align: start;
    max-width: 50%;
    border: solid 0, 5px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background: #fff;
    transition: all 0.5s ease;

}

.imgPng {
    text-align: center;

}

.chart01 {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-left: 10%;
    background: #ffffffcd;
}

.search-box {
    margin-left: 50%;
    margin-top: 2%;
    width: 500px;
    transform: translate(-50%);
    height: 40px;
    border-radius: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-text {
    /* border: black; */
    /* outline: none; */
    /* padding: 2px; */
    font-size: 16px;
    line-height: 40px;
    margin: 0;
    max-width: 1;
    border-radius: 40px;
    width: 100%;
}

.search-text::placeholder {
    display: flex;
    padding: 10px;
    margin-left: 2px;
}

.search-button {
    position: relative;
    margin-left: -12%;
    width: 43.5px;
    height: 43.5px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.box {
    margin-top: 2%;
}

.mxW {
    max-height: 10%;
}

a {
    color: aliceblue;
    text-decoration: none;
}

img {
    width: 150px;
}

ul,
li {
    list-style: none;
}

@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

.w800 {
    display: flex;
    justify-content: center;
    width: 800px;
}

.borderT {
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    border: none;
    /* background-color: #eee3e3; */
    /* max-width: 100%; */
    margin-left: 60px;
    margin-right: 60px;
    padding: 10px;
    display: flex;
    /* background: none; */
    justify-content: center;
    align-items: center;

}

.dashboard {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 50%;
    margin-top: 2%;
    max-width: 200px;
    transform: translate(-50%);

}

.myBox {
    display: inline-block;
    /* width: 280px;
    height: 520px; */
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background: #fff;
    transition: all 0.5s ease;
    cursor: pointer;
    user-select: none;
    /* z-index: 10; */
    border: solid 0, 5px;
    max-width: 30%;
    width: 30%;
    margin-top: 2%;
    margin-right: 1.5%;
    border-radius: 5px;
    overflow: hidden;
    transition: 20s
}

.myBox .backgroundEffect {
    bottom: 0;
    height: 0px;
    width: 100%;
}

.myBox:hover {
    color: #fff;
    transform: scale(1.025);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 5px 10px;
    background: rgb(183, 47, 134);
}

.myBox:hover .backgroundEffect {
    bottom: 0;
    height: 320px;
    width: 100%;
    position: absolute;
    z-index: -1;
    background: #1b9ce3;
    animation: popBackground 0.3s ease-in;
}

@keyframes popBackground {
    0% {
        height: 20px;
        border-top-left-radius: 50%;
        border-top-right-radius: 50%
    }

    50% {
        height: 80px;
        border-top-left-radius: 75%;
        border-top-right-radius: 75%
    }

    75% {
        height: 160px;
        border-top-left-radius: 85%;
        border-top-right-radius: 85%
    }

    100% {
        height: 320px;
        border-top-left-radius: 100%;
        border-top-right-radius: 100%
    }
}

.myBox .pic {
    position: relative
}


.myBox .date {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 70px;
    background-color: #1b9ce3;
    color: white;
    position: absolute;
    bottom: 0px;
    transition: all ease 1s
}

.myBox .date .day {
    font-size: 14px;
    font-weight: 600
}

.myBox .date .month,
.myBox .date .year {
    font-size: 10px
}

.myBox .text-muted {
    font-size: 12px
}

.myBox:hover .text-muted {
    color: #fff !important
}

.myBox .content {
    padding: 0 20px
}

.myBox .content .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    background-color: #1b9ce3;
    border-radius: 25px;
    font-size: 12px;
    border: none
}

.myBox:hover .content .btn {
    background: #fff;
    color: #1b9ce3;
    box-shadow: #0000001a 0px 3px 5px
}

.myBox .content .btn .fas {
    font-size: 10px;
    padding-left: 5px
}

.myBox .content .foot .admin {
    color: #1b9ce3;
    font-size: 12px
}

.myBox:hover .content .foot .admin {
    color: #fff
}

.myBox .content .foot .icon {
    font-size: 12px
}
</style>
