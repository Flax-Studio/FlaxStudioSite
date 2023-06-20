<script setup lang='ts'>
import { AccountUpdateData, ProductData } from '~/data/DataType';
import Api from '~/data/api';

const isSubmitting = ref(false)
const isIconUploading = ref(false)
const isLoading = ref(true)

const dob = ref('')


onMounted(function () {

    // fetching data
    fetchDataFromServer()
})


async function fetchDataFromServer() {

    const token = localStorage.getItem('token')
    if (token == null) {
        alert("You don't have access to server, please signin")
        return
    }

    const res = await Api.getUpdateProfileData(token!!)
    if (res.isError) {
        alert(res.error)
    } else {
        if (res.result != null) {
            profileData.value = res.result
            console.log(res.result)
            isLoading.value = false
        } else {
            alert('Something went wrong, please refresh the page')
        }
    }
}

const profileData = ref<AccountUpdateData>({
    firstName: '',
    lastName: '',
    profileImage: '',
    expertIn: 'Web developer',
    smallInfo: '',
    dob: 0,
    location: '',
    experience: 0,
    socialLinks: [],
    about: '',
    externalProjectsLinks: [],
    skills: '',
    languages: '',
    seoDescription: ''
})


async function updateProfile() {
    if (isSubmitting.value) return
    const token = localStorage.getItem('token')
    if (token == null) {
        alert('You are not authorized for submitting this form.')
        return
    }

    isSubmitting.value = true

    // convert string date to number
    if (dob.value != '') profileData.value.dob = new Date(dob.value).getTime()

    const res = await Api.updateProfile(token, profileData.value)
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



async function uploadImage(eventTarget: EventTarget | null) {

    if (eventTarget == null) return

    if (isIconUploading.value) return
    const token = localStorage.getItem('token')
    if (token == null) {
        alert('You are not authorized for submitting this form.')
        return
    }

    const input = (eventTarget as HTMLElement).parentElement!!.querySelector('input') as HTMLInputElement

    const files = input.files
    if (files == null || files.length == 0) {
        alert('Please select file first!')
        return
    }

    // find previous uploaded image name
    let imageUrl = profileData.value.profileImage
    const index = imageUrl.lastIndexOf('/')

    let fileName = ''
    if (index != -1) {
        fileName = imageUrl.slice(index + 1)
    }

    const file = files[0]
    // limit file size
    const maxFileSizeInBytes = 1024 * 1024; // 1 MB

    if (file.size > maxFileSizeInBytes) {
        alert('File size exceeds the limit ( 1mb ). Please choose a smaller file.');
        return
    }


    const formData = new FormData()
    formData.append('image', file)
    formData.append('prevImageName', fileName)

    isIconUploading.value = true
    const res = await Api.uploadImage(token, formData)
    isIconUploading.value = false

    if (res.isError) {
        alert(res.error)
    } else {
        if (res.result != null) {
            profileData.value.profileImage = res.result.url
        } else {
            alert('Something went wrong!')
        }
    }

}


</script>

<template>
    <div v-if="isLoading" class="loader-container">
        <div class="loader2 dark"></div>
    </div>
    <main v-else>
        <form method="post" @submit.prevent="updateProfile">
            <h2>Update Profile</h2>

            <!-- ---------- dashboard data -------------- -->
            <h3>Basic Information</h3>
            <div class="input-holder">
                <input v-model="profileData.firstName" type="text" placeholder="First name" required>
                <label>First name*</label>
            </div>

            <div class="input-holder">
                <input v-model="profileData.lastName" type="text" placeholder="Last name" required>
                <label>Last name*</label>
            </div>

            <div class="input-holder">
                <select v-model="profileData.expertIn" required>
                    <option value="Web developer">Web developer</option>
                    <option value="Fullstack web developer">Fullstack web developer</option>
                    <option value="Backend developer">Backend developer</option>
                    <option value="Frontend developer">Frontend developer</option>
                    <option value="Android developer">Android developer</option>
                    <option value="IOS developer">IOS developer</option>
                    <option value="Android & IOS developer">Android & IOS developer</option>
                    <option value="Android & Web developer">Android & Web developer</option>
                    <option value="Game developer">Game developer</option>
                    <option value="Android, Web & Game developer">Android, Web & Game developer</option>
                    <option value="Machine learning">Machine learning</option>
                    <option value="UI & UX designer">UI & UX designer</option>
                </select>
                <label>Expert in*</label>
            </div>

            <div class="input-holder">
                <textarea v-model="profileData.smallInfo"
                    placeholder="The description for your profile, it will visible on home page." maxlength="130"
                    required></textarea>
                <label>Small description*</label>
            </div>

            <div class="input-holder">
                <input v-model="dob" type="date" placeholder="Your date of birth" required>
                <label>DOB*</label>
            </div>

            <div class="input-holder">
                <input v-model="profileData.location" type="text" placeholder="Your address" required>
                <label>Address*</label>
            </div>

            <div class="input-holder">
                <input v-model="profileData.experience" type="number"
                    placeholder="Your working experience in this field (in years)" required>
                <label>Experience (years)*</label>
            </div>

            <div class="input-holder">
                <textarea v-model="profileData.about"
                    placeholder="Your profile page description, it must be long. (Markdown Supported)" required></textarea>
                <label>Profile description*</label>
            </div>



            <div class="col-2">
                <div class="input-holder">
                    <input v-model="profileData.profileImage" type="url" readonly placeholder="Profile Icon url">
                    <label>Profile Icon (Max 1mb)</label>
                </div>

                <div class="upload">
                    <input type="file" accept=".jpg, .jpeg, .png">
                    <button type="button" @click="event => uploadImage(event.target)">
                        <div class="loader2" v-if="isIconUploading"></div>
                        <span v-else>Upload</span>
                    </button>
                </div>
            </div>





            <h3>Socials Profiles</h3>
            <template v-for="social, index in profileData.socialLinks">

                <div v-if="social.name == 'github'" class="input-holder">
                    <input v-model="profileData.socialLinks[index].url" type="url" placeholder="https://www.github.com">
                    <label>Github url</label>
                </div>

                <div v-else-if="social.name == 'facebook'" class="input-holder">
                    <input v-model="profileData.socialLinks[index].url" type="url" placeholder="https://www.facebook.com">
                    <label>Facebook url</label>
                </div>

                <div v-else-if="social.name == 'instagram'" class="input-holder">
                    <input v-model="profileData.socialLinks[index].url" type="url" placeholder="https://www.insta.com">
                    <label>Instagram url</label>
                </div>

                <div v-else-if="social.name == 'linkedin'" class="input-holder">
                    <input v-model="profileData.socialLinks[index].url" type="url" placeholder="https://www.linkedin.com">
                    <label>Linkedin url</label>
                </div>

                <div v-else-if="social.name == 'hackerRank'" class="input-holder">
                    <input v-model="profileData.socialLinks[index].url" type="url" placeholder="https://www.hackerrank.com">
                    <label>HackerRank url</label>
                </div>

            </template>





            <h3>Extra Details</h3>
            <div class="input-holder">
                <input v-model="profileData.skills" type="text"
                    placeholder="Add your skills and separate each skills with '|' e.g : android | css">
                <label>Skills</label>
            </div>

            <div class="input-holder">
                <input v-model="profileData.languages" type="text"
                    placeholder="Add your languages and separate each with '|' e.g : english | hindi">
                <label>Languages</label>
            </div>




            <h3>SEO</h3>
            <div class="input-holder">
                <textarea v-model="profileData.seoDescription"
                    placeholder="Your description for the seo, it will be visible on google search."></textarea>
                <label>SEO description </label>
            </div>

            <button type="submit">
                <div class="loader2" v-if="isSubmitting"></div>
                <span v-else>Send</span>
            </button>

        </form>
    </main>
</template>

<style scoped>
.loader-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loader-container .loader2 {
    width: 30px;
    height: 30px;
}
</style>

<style>
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

form button * {
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