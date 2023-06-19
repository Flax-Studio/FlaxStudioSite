<script setup lang='ts'>
defineProps({
    privacyLink: String
})
</script>
<template>
    <div class="app-privacy">
        <div>
            <p>See our app privacy policy</p>
            <NuxtLink :to="privacyLink">Privacy Policy</NuxtLink>
            
        </div>
    </div>
</template>
<style scoped>
.app-privacy {
    background-color: var(--color-primary-variant);
}

.app-privacy div{
    max-width: var(--max-page-width);
    margin: 0 auto;
    padding: 40px var(--page-margin);
    display: grid;
    grid-template-columns: auto max-content;
    align-items: center;
}

.app-privacy p{
    color: white;
    font-weight: 600;
}

.app-privacy a{
    text-decoration: none;
    color: white;
    padding: 8px 24px;
    border: 1px solid white;
    border-radius: 4px;
    font-weight: 600;
    transition: background-color 200ms;
}

.app-privacy a:hover{
    background-color: white;
    color: var(--color-primary);
}
</style>