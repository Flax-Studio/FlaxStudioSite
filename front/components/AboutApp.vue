<script setup lang='ts'>
import { marked } from 'marked'
defineProps<{
    about: string
}>()

function markdownToHtml(markdown: string) {
    return marked(markdown)
}


</script>
<template>
    <div class="about-container" id="about">
        <h2>About App</h2>
        <div v-html="markdownToHtml(about)"></div>
    </div>
</template>
<style>
.about-container {
    max-width: var(--max-page-width);
    margin: 60px auto;
    margin-top: 100px;
    padding: 0 var(--page-margin);
    background-color: White;
}

.about-container h2 {
    color: var(--color-primary);
    font-weight: 600;
    font-size: 30px;
    margin: 30px 0;
}

.about-container p {
    color: var(--color-on-secondary);
    margin: 24px 0;
}

.about-container p b {
    font-weight: 600;
}
</style>