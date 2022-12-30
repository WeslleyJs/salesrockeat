<template>
    <!-- bg-dark bg-gradient -->
    <header id="header-element" class="p-3 text-white header-controll table">
        <div class="container header-controll-1">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none ">
                    <img class="mImg bg-dark bg-gradient" style="width:40px" src="../assets/img/logo.png" alt="">
                </a>
                <ul class="spinner nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li class="nav-link px-2 text-secondary btn-request" id="inicio"><span><a href="/">Home</a></span>
                    </li>
                    <li class="nav-link px-2 text-white btn-request" id="analytics"><span><a
                                href="/dashboard">Analytics</a></span></li>
                    <li class="nav-link px-2 text-white about btn-request" id="about"><span><a href="/">About</a></span>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    name: 'Home-bar',
    mounted() {
        window.addEventListener("scroll", this.onScroll)
    },
    methods: {
        onScroll(e) {e
            const element = document.getElementById('header-element');
            const bg = 'sticky-top'
            const bg_dark = 'bg-dark'
            const bg_gradient = 'bg-gradient'
            const bgTra = 'bg-transi'
            if(window.top.scrollY > 70){
                element.classList.add(bg, bg_dark, bg_gradient);
            }else{
                element.classList.remove(bg, bg_dark, bg_gradient);
                element.classList.add(bgTra);
            }
            // console.log(e)
            // e.target.documentElement.scrollTop
        }
    }
}
</script>
<style>
.bg-transi{
transition: .8s;
}
.mImg{
    border-radius: 50%;
}
.sticky-top, .bg-gradient, .bg-dark{
    transition: .8s;
}
.btn-request {
    padding: 10px 25px;
    border: 1px solid #f04725;
    border-radius: 100px;
    font-weight: 400;
    margin-left: 8px;
}

.btn-request:hover {
    background: rgb(10, 8, 215);
    background: radial-gradient(circle, rgba(10, 120, 215, 1) 10%, rgba(10, 8, 215, 1) 100%);
    color: #fff;
    transform: scale(1.05);
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
}

a {
    list-style: none;
    color: white;
    text-decoration: none;
}

a:hover {
    color: rgb(211, 211, 202);
}

.spinner {
    margin-left: 1%;
    text-align: center;
    height: 50px;
    width: max-content;
    font-size: 14px;
    font-weight: 600;
    font-family: monospace;
    letter-spacing: .2em;
    filter: drop-shadow(0 0 4px);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: loading6454 1.75s ease;
}

.spinner span:nth-child(2) {
    animation-delay: 0.25s;
}

.spinner span:nth-child(3) {
    animation-delay: 0.5s;
}

.spinner span:nth-child(4) {
    animation-delay: 0.75s;
}

.spinner span:nth-child(5) {
    animation-delay: 1s;
}

.spinner span:nth-child(6) {
    animation-delay: 1.25s;
}

.spinner span:nth-child(7) {
    animation-delay: 1.5s;
}

@keyframes loading6454 {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}
</style>
