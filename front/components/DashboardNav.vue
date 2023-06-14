<script setup lang='ts'>
</script>
<template>
    <nav>
        <div class="edit">
            <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 3.5a8.5 8.5 0 0 0-.705 16.971l-.234.936a2.117 2.117 0 0 0-.064.543C5.945 21.447 2 17.184 2 12 2 6.477 6.477 2 12 2c5.27 0 9.589 4.077 9.972 9.25a3.293 3.293 0 0 0-1.257-.25h-.002c-.09 0-.18.004-.27.011A8.501 8.501 0 0 0 12 3.5Zm8.715 8.5h-.002c-.585 0-1.17.223-1.615.67l-5.902 5.902a2.684 2.684 0 0 0-.707 1.247l-.458 1.831a1.087 1.087 0 0 0 1.319 1.318l1.83-.457a2.684 2.684 0 0 0 1.248-.707l5.902-5.902A2.285 2.285 0 0 0 20.715 12Z" />
            </svg>
        </div>
        <div class="profile">
            <img src="../public/extra/no_image.png" alt="profile image">
            <div>
                <span>Nitesh Kr</span>
                <span>CEO</span>
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