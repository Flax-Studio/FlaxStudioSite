<script setup lang='ts'>
import { AppsAndGamesData } from '~/data/DataType';
import { HomePageData, ProfileData } from '~/data/DataType';
//import { releasedAppsData, upcomingAppsData, profileData } from '../data/CommonData';

const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001'
const dataUrl = serverUrl + '/home'

useHead({
    meta: [
        { name: 'google-site-verification', content: 'jONmpqCm2qSUGHtR-6eYL3lIsPxght7AhhRKDCM-A4A' }
    ],
    script: [
        { innerHTML: 'const urbanChatbotId = "baeaba26-7018-4f00-80f7-edb57489e698"' },
        { src: 'https://urbanchat.ai/integration/chatbot-integration.js' }
    ]


})


let pageData: HomePageData = {
    members: [],
    products: []
}

let profileData: ProfileData = {
    heading: 'Developers',
    description: 'Hats off for our developers who work together to bring the most incredible and entertaining Apps & Games to your phone.',
    profiles: []
}

let releasedAppsData: AppsAndGamesData = {
    heading: 'Our Apps & Games',
    description: 'See our apps and games which is available on Play store',
    apps: []
}

let upcomingAppsData: AppsAndGamesData = {
    heading: 'Upcoming Apps & Games',
    description: 'Our upcoming Apps & Games will be coming soon',
    apps: []
}


// fetch data from server for ssr
const { data, error } = await useFetch(dataUrl)
if (data.value != null) {
    pageData = data.value as HomePageData
    profileData.profiles = pageData.members

    pageData.products.forEach(product => {
        if (product.dashStatus == 'completed') {
            releasedAppsData.apps.push(product)
        } else {
            upcomingAppsData.apps.push(product)
        }
    });

} else {
    throw { message: 'Server internal error, please try again later', statusCode: error.value?.statusCode }
}

useServerSeoMeta({
    title: 'Home - Flax Studio',
    ogTitle: 'Home - Flax Studio',
    description: 'Flax studio is developer place where we learn, create and talk to each others. Our team members start working on app, web app, website and game development. We love to create stuffs.',
    ogDescription: 'Flax studio is developer place where we learn, create and talk to each others. Our team members start working on app, web app, website and game development. We love to create stuffs.',
})

</script>
<template>
    <HeaderComponent />
    <HomeLanding />
    <AppsAndGames :data="releasedAppsData" />
    <AppsAndGames :data="upcomingAppsData" />
    <Developers :data="profileData" />
    <Features />
    <FooterComponent />
</template>
<style scoped></style>