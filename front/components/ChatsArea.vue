<script setup lang='ts'>
async function adjustTextareaHeight(target: EventTarget | null) {
    if (target == null) return
    await nextTick()
    const textarea = target as HTMLTextAreaElement
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}
</script>
<template>
    <div class="chat-container">
        <div class="chat-area">
            <div class="chat-group chat-left">
                <img src="../public/extra/no_image.png">
                <div class="chat">
                    <div class="chat-holder" v-for="item in 5">
                        <div>
                            <span class="sender">Sayam ・ CO</span>
                            <p>Hello dummy</p>
                            <span class="time">12:30 am</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="chat-group chat-right">
                <img src="../public/extra/no_image.png">
                <div class="chat">
                    <div class="chat-holder" v-for="item in 5">
                        <div>
                            <span class="sender">You ・ Member</span>
                            <p>Hello dummy</p>
                            <span class="time">12:30 am</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ---------------- next day breaker -------------- -->
            <div class="divider">
                <hr>
                <span>12 Dec 2023</span>
            </div>

            <div class="chat-group chat-right">
                <img src="../public/extra/no_image.png">
                <div class="chat">
                    <div class="chat-holder" v-for="item in 5">
                        <div>
                            <span class="sender">You ・ Member</span>
                            <p>Hello dummy</p>
                            <span class="time">12:30 am</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <form class="chat-input-container">
            <input type="text" @input="event => adjustTextareaHeight(event.target)" placeholder="Write message here...">
            <button type="submit">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.694 12 2.299 3.272c-.236-.607.356-1.188.942-.982l.093.04 18 9a.75.75 0 0 1 .097 1.283l-.097.058-18 9c-.583.291-1.217-.244-1.065-.847l.03-.096L5.694 12 2.299 3.272 5.694 12ZM4.402 4.54l2.61 6.71h6.627a.75.75 0 0 1 .743.648l.007.102a.75.75 0 0 1-.649.743l-.101.007H7.01l-2.609 6.71L19.322 12 4.401 4.54Z" />
                </svg>
            </button>
        </form>
    </div>
</template>
<style scoped>
/* ------------chat input -------------------- */


.chat-input-container {
    position: sticky;
    bottom: 1rem;
    left: 0;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    border-radius: var(--border-radius-medium);
    background-color: var(--color-secondary);
    padding: 0.4em 0;
}

.chat-input-container input {
    width: 100%;
    border: none;
    outline: none;
    resize: none;
    font-size: var(--medium-2-font);
    padding: 1em;
    color: var(--color-on-secondary);
    background-color: transparent;
}


.chat-input-container button {
    border: none;
    outline: none;
    padding: 1em;
    fill: var(--color-primary-variant);
    background-color: transparent;
}

.chat-input-container button svg {
    fill: inherit;
}




/* ------------------ chat area------------------- */

.chat-area .divider{
    position: relative;
    height: 80px;
}

.chat-area .divider hr{
    border: none;
    border-top: 1px solid var(--surface-dark-color);
    position: absolute;
    top: 50%;
    width: 100%;
}

.chat-area .divider span{
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    background-color: var(--surface-color);
    padding: 1em;
    font-weight: 600;
    color: var(--color-primary-variant);
}




.chat-group {
    display: flex;
    gap: 1rem;
    max-width: 800px;
    width: 100%;
    overflow: auto;
    margin-bottom: 1rem;
}

.chat-group img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
}

.chat .chat-holder {
    display: flex;
}

.chat .chat-holder div {
    background-color: white;
    padding: 0.6em 1em;
    margin-bottom: 0.3em;
    border-radius: 1rem;
    display: inline-block;
}

.chat p {
    font-size: var(--medium-font);
    color: var(--color-on-secondary);
    line-height: 1.4;
    margin: 0.2em 0;
}

.chat .sender {
    font-weight: 600;
    color: var(--color-primary-variant);
    font-size: var(--small-font);
    display: none;
}

.chat .time {
    font-weight: 600;
    color: var(--color-on-secondary);
    font-size: var(--small-font);
    display: block;
}

.chat :first-child div .sender {
    display: block;
}



/* ----------------- left chat ------------------- */

.chat-left {
    flex-direction: row;
    margin-right: auto;
}


.chat-left .chat {
    margin-right: 6rem;
}

.chat-left .chat :first-child div {
    border-top-left-radius: 0;
}




/* ------------ right chat ------------- */
.chat-right {
    flex-direction: row-reverse;
    margin-left: auto;
}

.chat-right .chat {
    margin-left: 6rem;
}

.chat-right .chat-holder {
    justify-content: end;
}

.chat-right .chat-holder div {
    background-color: var(--color-tertiary);
}

.chat-right .chat :first-child div {
    border-top-right-radius: 0;
}

.chat-right .sender {
    color: var(--color-secondary);
    text-align: right;
}

.chat-right .time {
    color: var(--color-secondary);
    text-align: right;
}

.chat-right p {
    color: var(--color-secondary);
}
</style>