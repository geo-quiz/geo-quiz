<script lang="ts" setup>
import router from '@/router/index';

function toLogin() {
    router.push('login');
}
function toRegister() {
    router.push('register');
}
</script>

<template>
    <section>
        <div class="container">
        <div class="start background">
            <p>GeoQuiz</p>
            <div class="globeContainer">
                <img src="/img/planet-5166106_1920.png" alt="Planet" />
            </div>

            <div class="buttonContainer">
                <button class="button button1" @click="toLogin">Sign in</button>
                <button class="button button2" @click="toRegister">Register</button>
            </div>
        </div>
        </div>
    </section>
</template>

<style scoped>

/*@font-face {*/
/*    font-family: 'Avigea';*/
/*    src: url('../../public/font/Avigea-Font/avigea.ttf');*/
/*}*/


/*.background {*/
/*    background-image: url('/img/MoreStars.svg');*/
/*    background-position: center;*/
/*    background-repeat: no-repeat;*/
/*    background-size: cover;*/
/*    min-height: 100vh;*/
/*    width: 100%;*/
/*    top: 0;*/
/*    z-index: -1;*/
/*}*/


section {
    display: flex;
    justify-content: center;

}

button {
    color: #ffffff;
    width: 300px;
    height: 85px;
    border-radius: 10px;
    border: none;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    flex-wrap: wrap;
}

.button1 {
    background-color: #5bb318;
}
.button1:hover {
    background-color: #f9f7f7;
    color: black;
}
.button2 {
    background-color: #008cba;
    margin-top: 20px;

}
.button2:hover {
    background-color: #f9f7f7;
    color: black;
}

.buttonContainer {
    display: flex;
    flex-direction: column;
}


.globeContainer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 32px;
}

img {
    height: 152px;
    width: 152px;
}

p {
    margin: 0;
    font-size: 80px;
    display: flex;
    justify-content: center;
    color: #dbe2ef;
    font-family: Avigea,serif;
}

.start {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.container{
    display: grid;

}
@media only screen and (min-width: 768px) {
    .button {
        font-size: 1rem;
    }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) {
    .button {
        height: 75px;

    }

}

@media only screen and (min-width: 1024px) {
    .button {
        height: 75px;
    }
    .container{
        display: flex;
        margin-left: -100px;
    }
}
</style>
