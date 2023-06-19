<script setup lang='ts'>
import { ProductData } from '~/data/DataType';
import Api from '~/data/api';

const isSubmitting = ref(false)
const isIconUploading = ref(false)
const isLandingImageUploading = ref(false)

const startDate = ref('')
const endDate = ref('')
const product = ref<ProductData>({
    _id: '',
    name: '',
    dashIconUrl: '',
    dashDescription: '',
    dashPlatform: 'Android',
    dashTeamLead: '',
    dashStartedAt: 0,
    dashCompletedAt: 0,
    dashStatus: 'active',
    landingDescription: '',
    landingImageUrl: '',
    playStoreUrl: '',
    productSeoDesc: '',
    productSeoTitle: '',
    productAboutDesc: '',
    productAboutEndDesc: '',
    productFeatures: '',
    privacySeoTitle: '',
    privacySeoDescription: '',
    privacyAboutDesc: ''
})

async function addProduct() {
    if (isSubmitting.value) return
    const token = localStorage.getItem('token')
    if (token == null) {
        alert('You are not authorized for submitting this form.')
        return
    }

    isSubmitting.value = true

    // convert string date to number
    if (startDate.value != '') product.value.dashStartedAt = new Date(startDate.value).getTime()
    if (endDate.value != '') product.value.dashCompletedAt = new Date(endDate.value).getTime()

    const res = await Api.addProduct(token, product.value)
    isSubmitting.value = false
    if (res.isError) {
        alert(res.error)
    } else {
        if (res.result != null) {
            alert('Submitted successfully')
        } else {
            alert('Something went wrong')
        }
    }
}



async function uploadImage(eventTarget: EventTarget | null, isIcon: boolean) {
    if(eventTarget == null) return

    if(isIconUploading.value || isLandingImageUploading.value) return
    const token = localStorage.getItem('token')
    if(token == null){
        alert('You are not authorized for submitting this form.')
        return
    }

    const input  = (eventTarget as HTMLElement).parentElement!!.querySelector('input') as HTMLInputElement

    const files = input.files
    if(files == null || files.length == 0){
        alert('Please select file first!')
        return
    }

    // find previous uploaded image name
    let imageUrl = ''
    if(isIcon){
        imageUrl = product.value.dashIconUrl
    }else{
        imageUrl = product.value.landingImageUrl
    }


    const index = imageUrl.lastIndexOf('/')

    let fileName = ''
    if(index != -1){
        fileName = imageUrl.slice(index + 1)
    }

    const file = files[0]
    const formData = new FormData()
    formData.append('image', file)
    formData.append('prevImageName', fileName)
  
    if(isIcon){
        isIconUploading.value = true
    }else{
        isLandingImageUploading.value = true
    }
    const res = await Api.uploadImage(token, formData)
    
    if(isIcon){
        isIconUploading.value = false
    }else{
        isLandingImageUploading.value = false
    }
    
    if(res.isError){
        alert(res.error)
    }else{
        if(res.result != null){
            if(isIcon){
                product.value.dashIconUrl = res.result.url
            }else{
                product.value.landingImageUrl = res.result.url
            }
        }else{
            alert('Something went wrong!')
        }
    }

}

</script>

<template>
    <main>
        <form method="post" @submit.prevent="addProduct">
            <h2>Project</h2>

            <!-- ---------- dashboard data -------------- -->
            <h3>Dashboard Part</h3>
            <div class="input-holder">
                <input v-model="product.name" type="text" placeholder="Name of project" required>
                <label>Project Name*</label>
            </div>

            <div class="input-holder">
                <textarea v-model="product.dashDescription"
                    placeholder="Project description which is only visible on dashboard" required></textarea>
                <label>Project Description*</label>
            </div>

            <div class="input-holder">
                <select v-model="product.dashPlatform">
                    <option value="Android" selected>Android</option>
                    <option value="Website">Website</option>
                    <option value="Web App">Web App</option>
                    <option value="Game">Game</option>
                    <option value="Flutter">Flutter</option>
                    <option value="React Native">React Native</option>
                </select>
                <label>Platform</label>
            </div>

            <div class="input-holder">
                <input v-model="product.dashTeamLead" type="text" placeholder="Name of person who will lead the team"
                    required>
                <label>Team Lead*</label>
            </div>

            <div class="input-holder">
                <input v-model="startDate" type="date" placeholder="Start date" required>
                <label>Project Start Date*</label>
            </div>

            <div class="input-holder">
                <input v-model="endDate" type="date" placeholder="End date" required>
                <label>Project End Date*</label>
            </div>

            <div class="input-holder">
                <select v-model="product.dashStatus">
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                    <option value="pending">Pending</option>
                </select>
                <label>Project Status</label>
            </div>

            <div class="col-2">
                <div class="input-holder">
                    <input v-model="product.dashIconUrl" type="url" readonly placeholder="Project Icon url">
                    <label>Project Icon</label>
                </div>

                <div class="upload">
                    <input type="file">
                    <button type="button" @click="event => uploadImage(event.target, true)">
                        <div class="loader2" v-if="isIconUploading"></div>
                        <span v-else>Upload</span>
                    </button>
                </div>
            </div>





            <!-- --------- Project page ------------ -->
            <h3>Project Page Part</h3>

            <div class="input-holder">
                <textarea v-model="product.landingDescription"
                    placeholder="Landing description for project page, it will be visible to the users who visit this page."></textarea>
                <label>Landing description</label>
            </div>

            <div class="input-holder">
                <input v-model="product.playStoreUrl" type="url" placeholder="Playstore url">
                <label>Playstore url</label>
            </div>


            <div class="input-holder">
                <textarea v-model="product.productAboutDesc"
                    placeholder="Description for project page, it will be visible to the users who visit this page (Markdown supported)"></textarea>
                <label>Project description</label>
            </div>

            <div class="input-holder">
                <textarea v-model="product.productAboutEndDesc"
                    placeholder="Second description (Markdown supported)"></textarea>
                <label>Project second description</label>
            </div>

            <div class="input-holder">
                <textarea v-model="product.productFeatures" placeholder="e.g: <Title> --: <Content>"></textarea>
                <label>Features</label>
            </div>

            <div class="col-2">
                <div class="input-holder">
                    <input v-model="product.landingImageUrl" type="url" readonly placeholder="Landing image url">
                    <label>Landing image</label>
                </div>

                <div class="upload">
                    <input type="file">
                    <button type="button" @click="event => uploadImage(event.target, false)">
                        <div class="loader2" v-if="isLandingImageUploading"></div>
                        <span v-else>Upload</span>
                    </button>
                </div>
            </div>

            <div class="input-holder">
                <input v-model="product.productSeoTitle" type="text" placeholder="SEO title for project page">
                <label>Project SEO title</label>
            </div>


            <div class="input-holder">
                <textarea v-model="product.productSeoDesc" placeholder="SEO description for project page"></textarea>
                <label>Project SEO description</label>
            </div>







            <h3>Privacy Page Part</h3>
            <div class="input-holder">
                <input v-model="product.privacySeoTitle" type="text" placeholder="SEO title for project privacy page">
                <label>Project privacy SEO title</label>
            </div>


            <div class="input-holder">
                <textarea v-model="product.privacySeoDescription"
                    placeholder="SEO description for project privacy page"></textarea>
                <label>Project privacy SEO description</label>
            </div>

            <div class="input-holder">
                <textarea v-model="product.privacyAboutDesc"
                    placeholder="Project privacy about description (Markdown Supported)"></textarea>
                <label>Project privacy about description </label>
            </div>

            <button type="submit">
                <div class="loader2" v-if="isSubmitting"></div>
                <span v-else>Send</span>
            </button>

        </form>
    </main>
</template>
<style scoped>
main {
    background-color: var(--surface-color);
    overflow: auto;
}

main form {
    max-width: var(--max-page-width);
    margin: auto;
    background-color: white !important;
    padding: var(--page-margin);
    min-height: 100vh;
    color: var(--color-on-secondary);
    padding-bottom: 10rem;
}

main h2 {
    text-align: center;
    color: var(--color-primary-variant);
    margin: 2rem;
}

main h3 {
    margin-top: 4rem;
    color: var(--color-primary);
}


form .input-holder {
    position: relative;
    margin: 2rem 0;
}


form .col-2 {
    display: grid;
    grid-template-columns: auto max-content;
    gap: 1rem;
    align-items: center;
}

form .col-2 .input-holder {
    margin: 0;
}

form .upload {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

form button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    background-color: var(--color-primary-variant);
    border: none;
    border-radius: var(--default-border-radius);
    font-size: var(--medium-font);
    color: var(--color-secondary);
    box-shadow: 0px 2px 4px #97076048;
    transition: all 200ms;
}

form button *{
    pointer-events: none;
}

form button:hover {
    box-shadow: 0px 4px 8px #9707606e;
}

form .input-holder label {
    position: absolute;
    left: 0.4rem;
    top: 0;
    font-weight: 600;
    translate: 0 -50%;
    background-color: var(--surface-color);
    padding: 0.4rem 0.6rem;
    border-radius: var(--default-border-radius);
}


form .input-holder input,
form textarea,
form select {
    width: 100%;
    font-size: var(--medium-font);
    padding: 1.5rem 1rem;
    border: none;
    background-color: var(--surface-color);
    border-radius: var(--default-border-radius);
    color: var(--color-on-secondary);
    outline: 1px solid var(--surface-dark-color);
    resize: vertical;
}

form input:focus,
form textarea:focus {
    outline: 2px solid var(--color-primary);
}
</style>