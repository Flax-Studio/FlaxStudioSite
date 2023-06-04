<script setup lang='ts'>
import { releasedAppsData, upcomingAppsData, profileData } from '../data/CommonData';

</script>
<template>
    <HomeLanding />
    <Developers :data="profileData" />
    <AppsAndGames :data="releasedAppsData" />
    <AppsAndGames :data="upcomingAppsData" />
    <Features />
</template>
<style scoped></style>