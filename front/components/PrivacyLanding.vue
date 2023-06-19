<script setup lang="ts">

defineProps<{
    appName: string,
    description: string
    appLink: string,
    appPageLink: string
}>()
</script>

<template>
    <div class="landing-top">
        <div class="content-parent">
            <div class="content">
                <div class="detail">
                    <h1>{{ appName }}</h1>
                    <div v-html="description"></div>
                    <a :href="appLink" target="_blank">Get from Playstore</a> <NuxtLink :to="appPageLink">View App</NuxtLink>
                </div>
                <div></div>
            </div>
        </div>

    </div>
</template>

<style>
.landing-top {
    width: 100%;
    overflow-y: auto;
    background: linear-gradient(90deg, #6F40BD 0%, #D33396 100%);
}

.landing-top .content-parent {
    max-width: var(--max-page-width);
    margin: auto;
}

.landing-top .content {
    margin: 40px var(--page-margin);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    color: white;
}

.landing-top .content h1 {
    font-weight: 600;
    margin-top: 40px;
    font-size: 40px;
}

.landing-top .content p {
    margin: 24px 0;
}


.landing-top .content a {
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


.landing-top .content a:hover {
    background-color: white;
    border: 2px solid White;
    color: var(--color-primary);
}

.landing-top .content img {
    display: block;
    margin: auto;
    margin-top: 30px;
    height: 300px;

}



@media only screen and (max-width: 700px) {
    .landing-top .content {
        grid-template-columns: 100%;
        text-align: center;
    }

    .landing-top .header h2 {
        font-size: 22px;
        margin-left: var(--page-margin);
        font-weight: 600;
    }

    .landing-top .content h1 {
        font-size: 36px;
    }

    .landing-top .content img {
        margin-top: 30px;
        width: 100%;
        height: auto;
    }

}

@media only screen and (max-width: 400px) {
    .landing-top .hide-responsive {
        display: none;
    }
}
</style>
