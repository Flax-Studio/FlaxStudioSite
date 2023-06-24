<script setup lang='ts'>
import { ProductPageData } from '../../data/DataType'
import { marked } from 'marked'

const router = useRouter()
const { params } = router.currentRoute.value

const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001'
const dataUrl = serverUrl + '/product/' + params.product_id

let pageData: ProductPageData = {
    _id: '',
    name: '',
    landingDescription: '',
    landingImageUrl: '',
    playStoreUrl: '',
    productSeoDesc: '',
    productAboutDesc: '',
    productAboutEndDesc: '',
    productFeatures: ''
}

const productFeatures = Array<{ heading: string, description: string }>()


// fetch data from server for ssr
const { data, error } = await useFetch(dataUrl)
if (data.value != null) {
    pageData = data.value as ProductPageData

    // extracting features
    const features = pageData.productFeatures.split('|')
    features.forEach(item => {
        const sub = item.split('--:')
        if (sub.length == 2) {
            productFeatures.push({ heading: sub[0], description: sub[1] })
        }
    });

} else {
    throw { message: 'Requested page could not be found.', statusCode: error.value?.statusCode || 404 }
}

useServerSeoMeta({
    title: pageData.name,
    ogTitle: pageData.name,
    description: pageData.productSeoDesc,
    ogDescription: pageData.productSeoDesc,
    ogImage: pageData.landingImageUrl,
    twitterCard: 'summary_large_image',
})

function markdownToHtml(markdown: string) {
    return marked(markdown)
}



</script>
<template>
    <Head>
        <Title>{{ pageData.name }}</Title>
    </Head>
    <HeaderComponent />
    <AppLanding :description="markdownToHtml(pageData.landingDescription)" :app-name="pageData.name"
        :app-link="pageData.playStoreUrl" :app-images-link="serverUrl + pageData.landingImageUrl"
        :privacy-link="'/privacy/' + pageData._id" />

    <AboutApp :about="pageData.productAboutDesc" />
    <AppFeatures :details="productFeatures" :ending="pageData.productAboutEndDesc" />

    <!-- <AppsAndGames :data="releasedAppsData" /> -->
    <AppPrivacyCard :privacy-link="'/privacy/' + pageData._id" />
    <FooterComponent />
</template>
<style scoped></style>