<script setup lang='ts'>
import { onMounted } from 'vue';
import { AppsAndGamesData } from '../data/DataType'

const props = defineProps<{
    data: AppsAndGamesData
}>()

onMounted(()=>{
    console.log(props.data.apps[0].imageUrl,"dsdf")
})

</script>
<template>
    <div class="app-and-game-container">
        <div>
            <h2>{{ props.data?.heading }}</h2>
            <p>{{ props.data?.description }}</p>

            <div class="app-cards-container">
                <a :href="appDetail.pageUrl" v-for="(appDetail, index) in props.data?.apps">
                    <div class="card reveal">
                        <img :src="appDetail.imageUrl" :alt="appDetail.title">
                        <h3>{{ appDetail.title }}</h3>
                        <p>{{ appDetail.description }}</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
<style scoped>
.app-and-game-container {
    background-color: var(--surface-color);
}

.app-and-game-container>div {
    max-width: var(--max-page-width);
    margin: 0 auto;
    padding: 30px var(--page-margin);
}


.app-and-game-container>div>h2 {
    color: var(--color-primary-variant);
    font-weight: 600;
    font-size: 30px;
    margin: 30px 0;
    text-align: center;

}

.app-and-game-container>div>p {
    color: var(--color-on-secondary);
    max-width: 600px;
    margin: 20px auto;
    text-align: center;
}


.app-cards-container {
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
}

.app-cards-container .card {
    width: 200px;
    background-color: white;
    box-shadow: 0px 4px 26px rgba(115, 64, 188, 0.2);
    border-radius: 6px;
}

.app-cards-container a {
    text-decoration: none;
    display: inline-flex;
}

.app-cards-container img {
    display: block;
    border-radius: 8px;
    width: 100px;
    height: 100px;
    margin: 30px auto 20px auto;
}

.app-cards-container h3 {
    font-weight: 600;
    font-size: 18px;
    text-align: center;
    color: var(--color-primary);
}

.app-cards-container p {
    text-align: center;
    color: var(--color-on-secondary);
    margin: 8px 10px;
    margin-bottom: 16px;
    font-size: 16px;
}
</style>