<script setup lang='ts'>
import { FeaturesData } from '../data/DataType'

const props = defineProps({
    details: {
        type: Array<FeaturesData>,
        default: () => [],
        required: true
    },

    ending: String
})
</script>
<template>
    <div class="features-container">
        <h2 id="features">App Features</h2>
        <div class="features">
            <div class="card reveal" v-for="(feature) in details">
                <h3>{{ feature.heading }}</h3>
                <p>{{ feature.description }}</p>
            </div>
        </div>

        <p>{{ ending }}</p>
    </div>
</template>
<style scoped>
.features-container {
    max-width: var(--max-page-width);
    margin: 60px auto;
    margin-top: 100px;
    padding: 0 var(--page-margin);
    background-color: White;
}

.features-container h2 {
    color: var(--color-primary);
    font-weight: 600;
    font-size: 30px;
    margin: 30px 0;
    text-align: center;
}

.features-container>p {
    color: var(--color-on-secondary);
    max-width: 600px;
    margin: 40px auto;
    margin-top: 80px;
    text-align: center;
}

.features {
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
}

.features .card {
    padding: 24px 0;
    width: 250px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0px 4px 26px rgba(115, 64, 188, 0.2);
}


.features .card h3 {
    font-weight: 600;
    font-size: 18px;
    text-align: center;
    color: var(--color-primary-variant);
}

.features .card p {
    text-align: center;
    color: var(--color-on-secondary);
    margin: 8px;
    font-size: 16px;
}</style>