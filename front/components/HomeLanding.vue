<script setup lang="ts">

</script>

<template>
    <div class="landing-top">
        <div class="header-parent">
            <div class="header">
                <h2><a>Flax Studio</a></h2>
                <div>
                    <a href="./about">About</a>
                    <a href="./join">Join</a>
                </div>
            </div>
        </div>

        <div class="content-parent">
            <div class="content">
                <div class="detail">
                    <h1>We love make things amazing and simple</h1>
                    <p>We are trying to create stuffs which make things easier and simpler to use. Our most of the app is
                        open source so just find the Github repo and feel free to contribute. </p>
                    <a target="_blank" href="https://play.google.com/store/apps/dev?id=7957006414559129964">Visit
                        Playstore</a>
                </div>
                <div class="images">
                    <img src="../public/app_images/home_image.png" alt="our apps">
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.landing-top {
    width: 100%;
    overflow-y: auto;
    background: #448bd2;
}

.header a {
    cursor: pointer;
}

.header-parent {
    background-color: rgba(255, 255, 255, 0.13);
}

.header {
    max-width: var(--max-page-width);
    margin: auto;
    height: 60px;
    display: grid;
    grid-template-columns: 1fr max-content;
    align-items: center;
}

.header h2 {
    font-size: 24px;
    margin-left: var(--page-margin);
    font-weight: 600;
}

.header a {
    color: white;
    text-decoration: none;
}

.header div {
    margin-right: 12px;
}

.header div a {
    color: rgb(255, 255, 255);
    text-decoration: none;
    margin: 0 12px;
    font-size: medium;
}

.header div a:hover {
    text-decoration: underline;
}

.content-parent {
    max-width: var(--max-page-width);
    margin: auto;
}

.content {
    margin: 40px var(--page-margin);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    color: white;
    align-items: center;
}

.content h1 {
    font-weight: 600;
    margin-top: 40px;
    font-size: 40px;
}

.content p {
    margin: 24px 0;
}


.content a {
    display: inline-block;
    margin-top: 30px;
    text-decoration: none;
    padding: 8px 24px;
    border-radius: var(--default-border-radius);
    font-size: 18px;
    background-color: transparent;
    border: 2px solid White;
    color: white;
    transition: background-color 200ms;
    font-weight: 600;
}


.content a:hover {
    background-color: white;
    border: 2px solid White;
    color: var(--color-primary);
}

.content img {
    display: block;
    margin: auto;
    height: auto;
    width: 90%;
}



@media only screen and (max-width: 700px) {
    .content {
        grid-template-columns: 100%;
        text-align: center;
    }

    .header h2 {
        font-size: 22px;
        margin-left: var(--page-margin);
        font-weight: 600;
    }

    .content h1 {
        font-size: 36px;
    }

    .content img {
        margin-top: 30px;
        width: 100%;
        height: auto;
    }

}
</style>
