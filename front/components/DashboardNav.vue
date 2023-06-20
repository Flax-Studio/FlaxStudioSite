<script setup lang='ts'>
import noImage from '../public/extra/no_image.png'
defineProps<{
    name: string,
    role: string,
    iconUrl: string
}>()


</script>
<template>
    <nav>
        <div class="profile">
            <img :src="iconUrl" alt="profile image">
            
            <div>
                <span>{{ name }}</span>
                <span>{{ role }}</span>
            </div>
        </div>
    </nav>
</template>
<style scoped>
nav {
    margin: 1rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    justify-content: end;
}

nav .edit {
    aspect-ratio: 1/1;
    width: 4rem;
    border-radius: var(--default-border-radius);
    background-color: var(--color-primary);
    display: flex;
    justify-content: center;
    align-items: center;
}

nav .edit:hover {
    background-color: var(--color-primary-dark);
}

nav .edit svg {
    fill: white;
    width: 2rem;
    height: auto;
}

nav img {
    width: 50px;
    height: auto;
    border-radius: 50%;
    display: inline-block;

}


nav .profile {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    background-color: var(--surface-variant-color);
    padding: 0 1rem;
    border-radius: var(--default-border-radius);
    width: max-content;
    height: 4rem;
}

nav .profile span {
    display: block;
}

nav .profile span:first-child {
    font-weight: 600;
    color: var(--color-on-secondary);
    font-size: var(--average-font);
}

nav .profile span:last-child {
    font-size: var(--small-font);
    font-weight: 600;
    color: var(--color-primary-variant);
}
</style>