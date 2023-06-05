<script setup lang='ts'>
import { releasedAppsData, upcomingAppsData, profileData } from '../data/CommonData';

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