<template>
    <Header />
    <div class="mid">
        <ul>
            <li id="options" class="ul-btn btn-request" @click="clk = !clk">
                <h4><b>{{ clk? 'Results': 'DashBoards' }}</b></h4>
            </li>
        </ul>
        <label for="options" @click="clk = !clk"></label>
    </div>
    <div class="transi search-box">
        <input @keyup.enter="search" id="inpt" type="text" class="search-text" v-model="id" placeholder="MLB">
        <button type="submit" class="btn search-button" @click="search && destroyChart">
            <img src="../assets/img/icons8-pesquisar-480.svg" height="35" width="35">
        </button>
    </div>
    <!--
    <p>MLB1830777149</p>
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
    <div data-aos="flip-right" data-aos-delay="300" class="chart01" :key="id" v-show="!clk && id"
        style="color:red; height:70vh; width: 80vw; margin-top: 20px;">
        <canvas data-aos="flip-right" data-aos-delay="300" class="bg-dark bg-gradient" id="myChart"></canvas>
    </div>
</template>
<script>
import Chart from 'chart.js/auto';
import axios from 'axios';
import Header from '../components/Header.vue';
const moment = require('moment');

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
            day01: '',
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
            this.visits();
        },
        async shipping() {
            var shp = '';
            var pes = '';

            if (!this.id.startsWith('MLB')) this.id = 'MLB' + this.id
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
        },
        async visits() {
            if (!this.id.startsWith('MLB')) this.id = 'MLB' + this.id;
            await axios.get(`https://api.mercadolibre.com/items/${this.id}/visits/time_window`, {
                params: {
                    last: 7,
                    unit: 'day',
                    ending: moment().format('Y-M-D')
                }
            }).then((response) => {
                const datas = response.data.results;
                var myDatas = datas.map(item => ({
                    total: item.total,
                    day: moment(item.date).format('DD-MM'),
                }
                ))
                this.day01 = myDatas
            }).catch(err => console.warn(err.message));

            this.chart();
        },
        async chart() {
            // rgba(62,0,247,1)
            const datas = {
                labels: [
                    `Dia: ${this.day01[0].day}`,
                    `Dia: ${this.day01[1].day}`,
                    `Dia: ${this.day01[2].day}`,
                    `Dia: ${this.day01[3].day}`,
                    `Dia: ${this.day01[4].day}`,
                    `Dia: ${this.day01[5].day}`,
                    `Dia: ${this.day01[6].day}`,
                ],
                datasets: [{
                    label: 'DashBoard Visits',
                    data: [
                        `${this.day01[0].total}`,
                        `${this.day01[1].total}`,
                        `${this.day01[2].total}`,
                        `${this.day01[3].total}`,
                        `${this.day01[4].total}`,
                        `${this.day01[5].total}`,
                        `${this.day01[6].total}`,

                    ],
                    backgroundColor: [
                        'rgba(62,0,247,0.5)',
                        'rgba(62,0,247,0.5)',
                        'rgba(62,0,247,0.5)',
                        'rgba(62,0,247,0.5)',
                        'rgba(62,0,247,0.5)',
                        'rgba(62,0,247,0.5)',
                        'rgba(62,0,247,0.5)',
                    ],
                    borderColor: [
                        'rgb(62,0,247)',
                        'rgb(62,0,247)',
                        'rgb(62,0,247)',
                        'rgb(62,0,247)',
                        'rgb(62,0,247)',
                        'rgb(62,0,247)',
                        'rgb(62,0,247)',
                    ],
                    borderWidth: 1
                }],

            }
            const config = {
                type: 'bar',
                data: datas,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            }
            const ctx = document.getElementById('myChart')
            const myChart = new Chart(ctx, config)
            // myChart.render();
            // myChart.update();
            myChart;
        },

    },
}

</script>
<style scoped>

.mid{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2%;
    
}
.btn-request{
    padding: 10px 25px;
    border: 1px solid #f04725;
    font-weight: 400;
    border-radius: 100px;
    max-width: auto;
    color: #fff;
    transition: 1s;
}
.btn-request:hover {
    background: rgb(10, 8, 215);
    background: radial-gradient(circle, rgba(10, 120, 215, 1) 10%, rgba(10, 8, 215, 1) 100%);
    color: #fff;
    transform: scale(1.05);
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
}
.object_earth {
    position: absolute;
    top: 15%;
    width: 40px;
    left: 90%;
    z-index: 90;
    animation: spin-earth 100s infinite linear both;
}

@-moz-keyframes spin-earth {
    100% {
        -moz-transform: rotate(-360deg);
        transition: transform 20s;
    }
}

@-webkit-keyframes spin-earth {
    100% {
        -webkit-transform: rotate(-360deg);
        transition: transform 20s;
    }
}

@keyframes spin-earth {
    100% {
        -webkit-transform: rotate(-360deg);
        transform: rotate(-360deg);
        transition: transform 20s;
    }
}

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
    background: none;
    color: black;
    margin-bottom: 5%;
}

.chart02 {
    background: #fff
}

.search-box {
    margin-left: 50%;
    margin-top: 2%;
    width: 300px;
    transform: translate(-50%);
    height: 40px;
    border-radius: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-text {
    border: black;
    /* outline: none; */
    /* padding: 2px; */
    font-size: 16px;
    line-height: 40px;
    margin: 0;
    max-width: 1;
    border-radius: 40px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
}

.search-text::placeholder {
    display: flex;
    padding: 10px;
    margin-left: 2px;
}

.search-button {
    background: none;
    position: relative;
    margin-left: -14%;
    width: 43.5px;
    height: 43.5px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-button:hover {
    background: rgb(10, 8, 215);
    background: radial-gradient(circle, rgba(10, 8, 215, 1) 10%, rgba(252, 75, 70, 1) 100%);
    transition: 1s;
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
