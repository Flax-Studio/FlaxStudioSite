<script setup lang='ts'>

const props = defineProps({
    appParagraphs: {
        type: Array<String>,
        default: () => [],
        required: true
    },
})

function marked(text: String) {
    var markedText = ""
    var catchText = ""
    var index = 0
    var isCatching = false
    while (index < text.length) {

        if (text[index] == "*" && text[index + 1] == "*") {
            isCatching = !isCatching
            index += 2
            continue
        }

        if (isCatching) {
            catchText += text[index]
        } else {
            if (catchText.length != 0) {
                markedText += "<b>" + catchText + "</b>"
                catchText = ""
            }
            markedText += text[index]
        }

        index++
    }

    if (catchText.length != 0) {
        markedText += "<b>" + catchText + "</b>"
    }

    return markedText
}

</script>
<template>
    <div class="about-container">
        <h2>About App</h2>
        <p v-for="(text) in appParagraphs" v-html="marked(text)"></p>
    </div>
</template>
<style scoped>
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