<script setup lang='ts'>

</script>
<template>
    <HeaderComponent />
    <section>
        <div class="container">

            <!-- Write your content here -->
            <P>Write here</P>
        </div>
    </section>
    <FooterComponent />
</template>
<style scoped>

section{
    background-color: var(--surface-color);
    min-height: 500px;
}
.container {
    max-width: var(--max-page-width);
    padding: var(--page-margin);
    margin: auto;
}

</style>