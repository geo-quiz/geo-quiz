<script lang="ts" setup>

</script>

<template>
    <div class="hamburger-container">
        <input id="hamburger-toggle" aria-label="Toggle Navigation" class="checkbox" type="checkbox" />
        <label class="hamburger" for="hamburger-toggle">
            <span class="slice"></span>
            <span class="slice"></span>
            <span class="slice"></span>
        </label>

        <div class="drawer">
            <ul class="nav-list">
                <li class="nav-list-item">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="nav-list-item">
                    <RouterLink to="/quiz">Quiz</RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
body {
    background: radial-gradient(#8d8888 0%, #101010 100%);
    font-family: sans-serif;
    height: 100vh;
    margin: 0;
    width: 100vw;
}

.hamburger-container {
    color: white;
    left: 10px;
    position: absolute;
    top: 10px;
    transition: transform 0.5s ease;
    width: max-content;
}

/* We don't need the checkbox to be visible, but we can't set it to display: none because this will break keyboard navigation. Instead set the opacity to 0 and the position to absolute so it doesn't push the rest of the content down */
.hamburger-container .checkbox {
    opacity: 0;
    position: absolute;
}

/* Show an outline when the hamburger is selected using the keyboard. Older browsers don't support :focus-visible, so we will just use :focus here. */
.hamburger-container .checkbox:focus ~ .hamburger {
    /* Not all browsers support outline: auto, so set a sensible fallback outline. */
    outline: 2px solid white;
    outline: auto;
    outline-offset: 4px;
}

/* For newer browsers that do support :focus-visible, hide the outline when the checkbox isn't selected with the keyboard. */
@supports selector(:focus-visible) {
    .hamburger-container .checkbox:not(:focus-visible) ~ .hamburger {
        outline: none;
    }
}

/* Hide any focusable elements in the drawer by default to aid keyboard navigation. We use visibility so it makes the elements unfocusable, but doesn't affect the layout. We can also add a "transition" to visibility, which will make it show instantly when we open the drawer, but take half a second to hide it when we close the drawer. */
.hamburger-container .drawer a {
    transition: visibility 0.5s linear;
    visibility: hidden;
}

/* Make the focusable elements in the drawer visible when it is open. */
.hamburger-container .checkbox:checked ~ .drawer a {
    visibility: visible;
}

.hamburger-container .checkbox:checked ~ .drawer {
    transform: translateX(0%);
}

.hamburger-container .checkbox:checked ~ .hamburger .slice:nth-child(1) {
    transform: translateY(12px) rotate(45deg);
}

.hamburger-container .checkbox:checked ~ .hamburger .slice:nth-child(2) {
    opacity: 0;
}

.hamburger-container .checkbox:checked ~ .hamburger .slice:nth-child(3) {
    transform: translateY(-12px) rotate(-45deg);
}

.hamburger {
    cursor: pointer;
    display: block;
    height: 32px;
    padding-top: 5px;
    position: relative;
    transition: transform 0.5s ease;
    width: 32px;
    z-index: 1;
}

.hamburger .slice {
    background-color: white;
    display: block;
    height: 2px;
    transition: all 0.5s ease;
    width: 100%;
}

.hamburger .slice:not(:first-child) {
    margin-top: 10px;
}

.drawer {
    background: black;
    height: 100%;
    left: 0;
    max-width: 100%;
    padding: 22px;
    position: fixed;
    top: 0;
    transform: translateX(-100%);
    transition: transform 0.5s ease;
    width: max-content;
}

.drawer .nav-list {
    list-style: none;
    margin-left: 20px;
    margin-top: 30px;
    padding: 0;
}

.drawer .nav-list .nav-list-item {
    padding-bottom: 10px;
}

/* Make the drawer full-width on mobile */
@media screen and (max-width: 768px) {
    .drawer {
        width: 100%;
    }
}

a {
    color: white;
}

a:hover {
    color: orange;
}
</style>