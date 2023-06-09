<script setup lang='ts'>
import { releasedAppsData, upcomingAppsData, profileData } from '../data/CommonData';
const { data } = await useFetch('/api/hello')

console.log(data.value?.hello)

</script>
<template>
    <HeaderComponent/>
    <HomeLanding />
    <Developers :data="profileData" />
    <AppsAndGames :data="releasedAppsData" />
    <AppsAndGames :data="upcomingAppsData" />
    <Features />
    <FooterComponent/>
</template>
<style scoped></style>