<script setup lang='ts'>
</script>
<template>
    <header>
        <div class="header-parent">
            <div class="header">
                <h2><a href="./">Flax Studio</a></h2>
                <div>
                    <a href="./">Home</a>
                    <a href="#about" class="hide-responsive">About</a>
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

.header div {
    margin-right: 12px;
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