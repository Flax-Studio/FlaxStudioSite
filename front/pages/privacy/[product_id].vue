<script setup lang='ts'>
import { ProductPrivacyPageData } from '~/data/DataType';
import { marked } from 'marked'

const router = useRouter()
const { params } = router.currentRoute.value

const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001'
const dataUrl = serverUrl + '/privacy/' + params.product_id

let pageData: ProductPrivacyPageData = {
    _id: '',
    name: '',
    landingDescription: '',
    playStoreUrl: '',
    privacySeoDescription: '',
    privacyAboutDesc: '',
}


// fetch data from server for ssr
const { data, error } = await useFetch(dataUrl)
if (data.value != null) {
    pageData = data.value as ProductPrivacyPageData

} else {
    throw { message: 'Requested page could not be found.', statusCode: error.value?.statusCode || 404 }
}

useServerSeoMeta({
    title: pageData.name + ' - Privacy',
    ogTitle: pageData.name + ' - Privacy',
    description: pageData.privacySeoDescription,
    ogDescription: pageData.privacySeoDescription
})


function markdownToHtml(markdown: string) {
    return marked(markdown)
}



</script>
<template>
    <HeaderComponent />
    <PrivacyLanding :description="markdownToHtml(pageData.landingDescription)" :app-name="pageData.name"
        :app-link="'https://play.google.com/store/apps/details?id=com.flaxstudio.drawon'"
        :app-page-link="'/draw-on/' + pageData._id" />
    <div class="privacy-content" v-html="markdownToHtml(pageData.privacyAboutDesc)"></div>
    <FooterComponent />
</template>
<style>
.privacy-content {
    max-width: var(--max-page-width);
    margin: auto;
    padding: 40px var(--page-margin);
    margin-bottom: 100px;
}

.privacy-content h2 {
    color: var(--color-primary-variant);
    font-weight: 600;
    font-size: 30px;
    margin: 30px 0;
}

.privacy-content h3 {
    color: var(--color-primary-variant);
    font-weight: 600;
    font-size: 22px;
    margin: 30px 0;
    margin-top: 60px;
}

.privacy-content p {
    color: var(--color-on-secondary);
    margin: 20px auto;
}

.privacy-content b {
    font-weight: 600;
}

.privacy-content li {
    color: var(--color-on-secondary);
    margin-bottom: 8px;
    font-weight: 600;
}

.privacy-content li a {
    color: var(--color-primary);
    font-weight: 600;
}
</style>