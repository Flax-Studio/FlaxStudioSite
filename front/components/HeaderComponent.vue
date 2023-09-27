<script setup lang='ts'>
const isRegister = ref(false)
onMounted(function () {
    if (localStorage.getItem('token') != null) {
        isRegister.value = true
    }
})
</script>
<template>
    <header>
        <div class="header-parent">
            <div class="header">
                <h2><NuxtLink to="/">Flax Studio</NuxtLink></h2>
                <div>
                    <NuxtLink to="/">Home</NuxtLink>
                    <a href="#about" class="hide-responsive">About</a>
                    <NuxtLink v-if="isRegister" to="/admin/dashboard">
                        <img src="../public/extra/dashboard.png" alt="dashboard_icon">
                    </NuxtLink>
                </div>
            </div>
        </div>
    </header>
</template>
<style scoped>
header {
    width: 100%;
    height: 60px;
    background: linear-gradient(90deg, #6F40BD 0%, #D33396 100%);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.header-parent {
    background-color: rgba(255, 255, 255, 0.103);
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

.header a img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    display: block;
    border-radius: 50%;
}

.header div {
    margin-right: 12px;
    display: flex;
    align-items: center;
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
</style>