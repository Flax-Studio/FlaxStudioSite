

export default defineEventHandler(async (event) => {
    return await $fetch('https://amazon-ecommerce-site.nitesh-dev.repl.co/home')
})