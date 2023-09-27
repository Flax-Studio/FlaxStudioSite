import { SitemapData } from "data/DataType"

const apiURL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001'

export default cachedEventHandler(async function () {
    const todayDateTime = new Date()
    const sitemap = Array<{ loc: string, lastmod: Date }>()

    try {
        const sitemapData = await $fetch(apiURL + '/sitemap') as SitemapData
        sitemapData.accounts.forEach(data => {
            sitemap.push({ loc: `/profile/${data._id}`, lastmod: todayDateTime })
        });

        sitemapData.products.forEach(data => {
            sitemap.push({ loc: `/product/${data._id}`, lastmod: todayDateTime })
        });

    } catch (error) {
        console.log(error)
    }

    return sitemap

}, {
    name: 'sitemap-dynamic-urls',
    maxAge: 60 * 29 // cache URLs for 29 minutes
})