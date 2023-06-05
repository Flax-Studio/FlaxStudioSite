<script setup lang='ts'>
</script>
<template>
    <footer>
        <div class="footer-parent">
            <div class="top">
                <div class="branding">
                    <div class="logo">
                        <img src="../public/favicon.ico" alt="Flax studio">
                        <h2>Flax Studio</h2>
                    </div>
                    <p>A developers place where we interact, learn and create stuff together.</p>
                    <button>Join</button>
                </div>
                <div class="resource">
                    <h3>COMMUNITY</h3>
                    <NuxtLink to="#">About</NuxtLink>
                    <NuxtLink to="#">Submit Issue</NuxtLink>
                    <NuxtLink to="#">Github Repo</NuxtLink>
                </div>
                <div class="resource">
                    <h3>PRODUCTS</h3>
                    <NuxtLink to="#">Draw On</NuxtLink>
                    <NuxtLink to="#">Word Search</NuxtLink>
                    <NuxtLink to="#">Task Planner</NuxtLink>
                </div>
                <div class="resource">
                    <h3>RESOURCES</h3>
                    <NuxtLink to="#">Community</NuxtLink>
                    <NuxtLink to="#">Marketplace</NuxtLink>
                </div>
            </div>
        </div>

        <div class="copyright">
            <p>Copyright © 2023. All Rights Reserved</p>
        </div>
    </footer>
</template>
<style scoped>
footer {
    border-top: 4px solid var(--color-primary-variant);
    min-height: 400px;
}

.footer-parent {
    max-width: var(--max-page-width);
    margin: auto;
    padding: 0 var(--page-margin);
}

footer .logo {
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

footer .top {
    margin-top: 4rem;
    display: flex;
    gap: 2rem;
    justify-content: space-between;
}

footer .top p {
    font-size: var(--medium-font);
    color: var(--color-on-secondary);
    margin: 2rem 0;
}

footer .logo h2 {
    font-size: var(--big-font);
    color: var(--color-on-secondary);
}

footer .logo img {
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.103);
}

footer .branding button {
    margin-top: 1rem;
    width: 100%;
    border: none;
    padding: 0.8rem;
    font-size: var(--medium-font);
    border-radius: var(--default-border-radius);
    background-color: var(--color-primary);
    color: var(--color-secondary);
    transition: all 200ms;
    box-shadow: 0px 2px 4px rgba(20, 138, 255, 0.3);

}

footer .branding button:hover {
    background-color: var(--color-primary-dark);
    transform: translateY(-0.1rem);
    box-shadow: 0px 4px 10px rgba(20, 138, 255, 0.3);
}


footer .resource {
    margin-bottom: 1rem;
}

footer .resource h3 {
    font-size: var(--medium-font);
    color: var(--color-on-secondary);
    margin-bottom: 1.5rem;
}

footer .resource a {
    display: block;
    text-decoration: none;
    color: var(--color-on-secondary);
    margin: 0.6rem 0;
    white-space: nowrap;
}

footer .resource a:hover {
    font-weight: 600;
}


footer .copyright{
    border-top: 1px solid rgb(236, 236, 236);
    margin-top: 4rem;
    overflow: auto;
}
footer .copyright p{
    font-size: var(--small-font);
    color: var(--color-on-secondary);
    text-align: center;
    margin: 2rem 0;
}



@media only screen and (max-width: 800px) {

    footer .top {
        flex-wrap: wrap;
    }

    footer .branding {
        width: 100%;
    }

    footer .resource {
        flex: 1;
    }
}

@media only screen and (max-width: 600px) {

    footer .logo {
        justify-content: center;
    }

    footer .top {
        flex-direction: column;

    }

    footer .top * {
        text-align: center;
    }

}
</style>