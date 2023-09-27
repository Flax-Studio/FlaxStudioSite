<script setup lang='ts'>

defineProps<{
    name: string,
    role: string,
    iconUrl: string
}>()


</script>
<template>
    <nav>
        <a target="_blank" href="https://chat.whatsapp.com/Gac21vUnCpy1JX6Npi3fbQ">
            <div class="profile whatsapp">
                <img src="../public/extra/whatsapp.svg" alt="Whatsapp icon">
                <p>Join Community</p>
            </div>
        </a>
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

nav a {
    text-decoration: none;
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


nav .profile img {
    width: 50px;
    height: 50px;
    object-fit: cover;
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
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
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


nav .whatsapp{
    background-color: #25d366;
    color: white;
    font-size: var(--average-font) !important;
    font-weight: 600;
}

nav .whatsapp img {
    width: 30px;
    height: auto;
    border-radius: 0;
    display: inline-block;

}
</style>