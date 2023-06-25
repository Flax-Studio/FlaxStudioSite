<script setup lang='ts'>
</script>
<template>
    <div class="chat-area">
        <div class="chat-group chart-left">
            <img src="../public/extra/no_image.png">
            <div class="chat">
                <div>
                    <p>Hello dummy message Hello dummy message Hello dummy message Hello dummy message</p>
                </div>
            </div>
        </div>
        <div class="chat-group chart-right">
            <img src="../public/extra/no_image.png">
            <div class="chat">
                <div>
                    <p>Hello dummy message Hello dummy message Hello dummy message Hello dummy message</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

.chat-group {
    display: flex;
    gap: 1rem;
    max-width: 800px;
    width: 100%;
}
.chat-group img{
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
}


.chat div{
    background-color: white;
    padding: 0.6em 1em;
    margin-bottom: 0.6em;
}

.chat p{
    font-size: var(--medium-font);
    color: var(--color-on-secondary);
}

.chart-left{
    flex-direction: row;
}

.chart-left .chat{
    margin-right: 2rem;
}
.chart-right{
    flex-direction: row-reverse;
}

.chart-right .chart{
    margin-left: 2rem;
}

</style>