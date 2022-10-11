<script lang="ts" setup></script>

<template>
    <section>
        <div class="start background">
            <p>GeoQuiz</p>
            <div class="globeContainer">
                <img src="../../public/img/planet-5166106_1920.png" alt="Planet" />
            </div>

            <div class="buttonContainer">
                <button class="button button1">Sign in</button>
                <button class="button button2">Register</button>
            </div>
        </div>
    </section>
</template>

<style scoped>
@font-face {
    font-family: 'Avigea';
    src: url('avigea.ttf');
}


.background {
    background-image: url('/img/MoreStars.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    top: 0;
    z-index: -1;
    position: absolute;
}


section {
    display: grid;
    grid-template-columns: 1fr;

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

.button2 {
    background-color: #008cba;
    margin-top: 20px;
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
}
</style>
