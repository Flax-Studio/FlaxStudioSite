<script setup lang="ts">

const props = defineProps({
    appName: String,
    smallPara: String,
    bigPara: String,
    appLink: String,
    appImagesLink: String,
    privacyLink: String

})

</script>

<template>
    <div class="landing-top">
        <div class="header-parent">
            <div class="header">
                <h2><a href="./">Flax Studio</a></h2>
                <div>
                    <a href="./">Home</a>
                    <a href="#features" class="hide-responsive">Features</a>
                    <a :href="privacyLink" class="hide-responsive">Privacy</a>
                </div>
            </div>
        </div>

        <div class="content-parent">
            <div class="content">
                <div class="detail">
                    <h1>{{ appName }}</h1>
                    <p>{{ smallPara }}</p>
                    <p>{{ bigPara }}</p>

                    <a :href="appLink">Get from Playstore</a>
                </div>
                <div class="images">
                    <img :src="appImagesLink" alt="our apps">
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.landing-top {
    width: 100%;
    overflow-y: auto;
    background: linear-gradient(90deg, #6F40BD 0%, #D33396 100%);
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

@media only screen and (max-width: 400px) {
    .hide-responsive {
        display: none;
    }
}
</style>
