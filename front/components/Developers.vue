<script setup lang='ts'>
import { ProfileData } from '../data/DataType'

const props = defineProps<{
    data: ProfileData
}>()

</script>

<template>
    <div class="developers-container">
        <h2>{{ data?.heading }}</h2>
        <p>{{ data?.description }}</p>
        <div class="cards-container">
            <div class="profile-card reveal" v-for="(profile, index) in data?.profiles">
                <a :href="profile.pageUrl">
                    <img :src="profile.imageUrl" :alt="profile.name">
                    <h3>{{ profile.name }}</h3>
                    <p>{{ profile.about }}</p>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.developers-container {
    max-width: var(--max-page-width);
    margin: 60px auto;
    padding: 0 var(--page-margin);

}

.developers-container>h2 {
    color: var(--color-primary-variant);
    font-weight: 600;
    font-size: 30px;
    margin: 30px 0;
    text-align: center;
}

.developers-container>p {
    color: var(--color-on-secondary);
    max-width: 600px;
    margin: 20px auto;
    text-align: center;
}

.cards-container {
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
}

.profile-card {
    width: 200px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0px 4px 26px rgba(115, 64, 188, 0.2);
}

.profile-card a {
    text-decoration: none;
}

.profile-card img {
    object-fit: cover;
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 20px auto;
}

.profile-card h3 {
    font-weight: 600;
    font-size: 18px;
    text-align: center;
    color: var(--color-primary);
}

.profile-card p {
    text-align: center;
    color: var(--color-on-secondary);
    margin: 8px;
    font-size: 16px;
}
</style>