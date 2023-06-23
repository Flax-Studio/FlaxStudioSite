<script setup lang='ts'>
import { marked } from 'marked'
import { ProfilePageData, AccountPublicData } from '~/data/DataType';
import {getAgeFromTimestamp} from '~/data/utils'

const router = useRouter()
const { params } = router.currentRoute.value

const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001'
const dataUrl = serverUrl + '/profile/' + params.username


const accountPublicData: AccountPublicData = {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    profileImage: '',
    role: 'MEMBER',
    expertIn: '',
    smallInfo: '',
    dob: 0,
    location: '',
    experience: 0,
    socialLinks: [],
    about: '',
    externalProjectsLinks: [],
    skills: '',
    languages: '',
    joinedAt: 0,
    seoDescription: ''
}

let pageData: ProfilePageData = {
    profile: accountPublicData,
    members: []
}


// fetch data from server for ssr
const { data, error } = await useFetch(dataUrl)
if (data.value != null) {
    pageData = data.value as ProfilePageData

} else {
    throw { message: 'Requested page could not be found.', statusCode: error.value?.statusCode || 404 }
}

useServerSeoMeta({
    title: pageData.profile.firstName + ' ' + pageData.profile.lastName,
    ogTitle: pageData.profile.firstName + ' ' + pageData.profile.lastName,
    description: pageData.profile.seoDescription,
    ogDescription: pageData.profile.seoDescription,
    ogImage: pageData.profile.profileImage,
    twitterCard: 'summary_large_image',
})

function markdownToHtml(markdown: string) {
    return marked(markdown)
}


</script>
<template>
    <HeaderComponent />
    <div class="profile-container">
        <div class="profile-parent">
            <div class="profile-bio">
                <div class="left">
                    <img :src="serverUrl + pageData.profile.profileImage" :alt="pageData.profile.firstName + ' Image'">
                    <div>
                        <h2>{{ pageData.profile.firstName }} {{ pageData.profile.lastName }}</h2>
                        <p class="info">{{ pageData.profile.expertIn }}</p>
                        <p class="small-info">{{ pageData.profile.smallInfo }}</p>
                        <a :href="'mailto:' + pageData.profile.email">Contact</a>
                    </div>
                </div>
                <div class="right">
                    <div class="info">
                        <p>Availability:</p>
                        <p>Full-time</p>
                    </div>
                    <div class="info">
                        <p>Age:</p>
                        <p>{{ getAgeFromTimestamp(pageData.profile.dob) }}</p>
                    </div>
                    <div class="info">
                        <p>Location:</p>
                        <p>{{ pageData.profile.location }}</p>
                    </div>
                    <div class="info">
                        <p>Experience:</p>
                        <p>{{ pageData.profile.experience }} years</p>
                    </div>
                    <div class="profile-icons">
   
                        <template
                            v-for="social in pageData.profile.socialLinks">
                            <a :href="social.url" v-if="social.url != '' && social.name == 'github'">
                                <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision"
                                    text-rendering="geometricPrecision" image-rendering="optimizeQuality"
                                    fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640">
                                    <path
                                        d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z" />
                                </svg>
                            </a>
                            <a :href="social.url" v-else-if="social.url != '' && social.name == 'linkedin'">
                                <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision"
                                    text-rendering="geometricPrecision" image-rendering="optimizeQuality"
                                    fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640">
                                    <path
                                        d="M640.012 121.513c-23.528 10.524-48.875 17.516-75.343 20.634 27.118-16.24 47.858-41.977 57.756-72.615-25.347 14.988-53.516 25.985-83.363 31.866-24-25.5-58.087-41.35-95.848-41.35-72.508 0-131.21 58.736-131.21 131.198 0 10.228 1.134 20.232 3.355 29.882-109.1-5.528-205.821-57.757-270.57-137.222a131.423 131.423 0 0 0-17.764 66c0 45.497 23.102 85.738 58.347 109.207-21.508-.638-41.74-6.638-59.505-16.359v1.642c0 63.627 45.225 116.718 105.32 128.718-11.008 2.988-22.63 4.642-34.606 4.642-8.48 0-16.654-.874-24.78-2.35 16.783 52.11 65.233 90.095 122.612 91.205-44.989 35.245-101.493 56.233-163.09 56.233-10.63 0-20.988-.65-31.334-1.89 58.229 37.359 127.206 58.997 201.31 58.997 241.42 0 373.552-200.069 373.552-373.54 0-5.764-.13-11.35-.366-16.996 25.642-18.343 47.87-41.493 65.469-67.844l.059-.059z" />
                                </svg>
                            </a>

                            <a :href="social.url" v-else-if="social.url != '' && social.name == 'twitter'">
                                <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision"
                                    text-rendering="geometricPrecision" image-rendering="optimizeQuality"
                                    fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640">
                                    <path
                                        d="M228.582 205.715h126.462v64.832h1.83c17.611-31.595 60.675-64.832 124.892-64.832C615.303 205.715 640 288.818 640 396.926v220.219H508.116V421.93c0-46.536-.969-106.442-68.576-106.442-68.67 0-79.194 50.658-79.194 103.052v198.605H228.581v-411.43zM137.152 91.43c0 37.855-30.721 68.576-68.576 68.576-37.855 0-68.587-30.721-68.587-68.576 0-37.855 30.732-68.576 68.587-68.576 37.855 0 68.576 30.721 68.576 68.576zM-.011 205.715h137.163v411.43H-.011v-411.43z" />
                                </svg>
                            </a>

                            <a :href="social.url" v-else-if="social.url != '' && social.name == 'instagram'">
                                <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision"
                                    text-rendering="geometricPrecision" image-rendering="optimizeQuality"
                                    fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640">
                                    <path
                                        d="M184.715 2.752h270.582C556.908 2.752 640 84.816 640 185.069v269.85c0 100.277-83.092 182.317-184.703 182.317H184.715C83.104 637.236 0 555.196 0 454.919v-269.85C0 84.816 83.103 2.752 184.715 2.752zm133.561 145.939c98.741 0 178.868 80.127 178.868 178.868 0 98.753-80.127 178.868-178.868 178.868-98.765 0-178.88-80.115-178.88-178.868 0-98.741 80.115-178.868 178.88-178.868zm0 60.414c65.387 0 118.454 53.056 118.454 118.454s-53.068 118.466-118.454 118.466c-65.41 0-118.466-53.067-118.466-118.466 0-65.398 53.056-118.454 118.466-118.454zM491.321 123.9c16.04 0 29.044 13.004 29.044 29.032 0 16.04-13.004 29.044-29.044 29.044-16.028 0-29.032-13.004-29.032-29.044 0-16.028 13.004-29.032 29.032-29.032zM206.825 54.58H433.21c85.005 0 154.526 69.178 154.526 153.712V435.81c0 84.532-69.52 153.699-154.526 153.699H206.825c-85.005 0-154.537-69.167-154.537-153.7V208.29c0-84.532 69.532-153.71 154.537-153.71z" />
                                </svg>
                            </a>

                            <a :href="social.url" v-else-if="social.url != '' && social.name == 'hackerRank'">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path
                                        d="M477.5 128C463 103.05 285.13 0 256.16 0S49.25 102.79 34.84 128s-14.49 230.8 0 256 192.38 128 221.32 128S463 409.08 477.49 384s14.51-231 .01-256zM316.13 414.22c-4 0-40.91-35.77-38-38.69.87-.87 6.26-1.48 17.55-1.83 0-26.23.59-68.59.94-86.32 0-2-.44-3.43-.44-5.85h-79.93c0 7.1-.46 36.2 1.37 72.88.23 4.54-1.58 6-5.74 5.94-10.13 0-20.27-.11-30.41-.08-4.1 0-5.87-1.53-5.74-6.11.92-33.44 3-84-.15-212.67v-3.17c-9.67-.35-16.38-1-17.26-1.84-2.92-2.92 34.54-38.69 38.49-38.69s41.17 35.78 38.27 38.69c-.87.87-7.9 1.49-16.77 1.84v3.16c-2.42 25.75-2 79.59-2.63 105.39h80.26c0-4.55.39-34.74-1.2-83.64-.1-3.39.95-5.17 4.21-5.2 11.07-.08 22.15-.13 33.23-.06 3.46 0 4.57 1.72 4.5 5.38C333 354.64 336 341.29 336 373.69c8.87.35 16.82 1 17.69 1.84 2.88 2.91-33.62 38.69-37.58 38.69z" />
                                </svg>
                            </a>

                        </template>

                    </div>
                </div>
            </div>
        </div>

        <div class="profile-detail-container" id="about">
            <div class="profile-detail">
                <div class="profile-about">
                    <h2 id="about">About</h2>
                    <div v-html="markdownToHtml(pageData.profile.about)"></div>

                    <hr>
                    <h2>External Projects</h2>
                    <div class="chip-container">
                        <a v-for="project in pageData.profile.externalProjectsLinks" :href="project.url">{{ project.name }}</a>
                    </div>

                    <hr>
                    <h2>Skills</h2>
                    <div class="chip-container">
                        <span v-for="skill in pageData.profile.skills.toLowerCase().split('|')">{{ skill }}</span>
                    </div>

                    <hr>
                    <h2>Languages</h2>
                    <div class="chip-container">
                        <span v-for="lang in pageData.profile.languages.toLowerCase().split('|')">{{ lang }}</span>
                    </div>

                </div>


                <ProfileMembers :user-profiles="pageData.members" />
            </div>
        </div>
    </div>
    <FooterComponent />
</template>
<style scoped>

.profile-container {
    overflow: auto;
    background-color: var(--surface-color);
    color: var(--color-on-secondary);
}

.profile-parent {
    margin-top: 100px;
    margin-bottom: 100px;
    background-color: white;
}

.profile-bio {
    padding: 40px 24px;
    max-width: var(--max-page-width);
    margin: 0 auto;
    display: grid;
    gap: 30px;
    grid-template-columns: 1fr 350px;
    color: var(--color-on-secondary);
}

.profile-bio .left {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 24px;
}


.profile-bio .left img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
}

.profile-bio .left h2 {
    color: var(--color-on-secondary);
    margin-bottom: 8px;
}

.profile-bio .left .info {
    margin-bottom: 16px;
    color: var(--color-primary-variant);
}

.profile-bio .left a {
    padding: 8px 24px;
    background-color: var(--color-primary-variant);
    color: white;
    text-decoration: none;
    border-radius: 4px;
    margin-top: 24px;
    display: inline-block;
}

.profile-bio .right .info {
    display: grid;
    grid-template-columns: 2.5fr 3fr;
    gap: 20px;
    margin-bottom: 8px;
}

.profile-bio .right .info p:first-child {
    font-weight: 600;
}

.profile-bio .right .profile-icons {
    margin-top: 40px;
    display: flex;
    align-items: center;
    gap: 0.4rem;
}


.profile-bio .right .profile-icons a {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--surface-color);
    fill: var(--color-on-secondary);
    border-radius: var(--default-border-radius);
}

.profile-bio .right .profile-icons a:hover {
    background-color: var(--color-primary-variant);
    fill: var(--color-secondary);
}

.profile-bio .right .profile-icons svg {
    width: 24px;
    fill: inherit;

}


.profile-detail {
    max-width: var(--max-page-width);
    margin: auto;
    display: grid;
    grid-template-columns: auto 300px;
    gap: 24px;
    padding-bottom: 100px;

}


.profile-about hr {
    margin: 24px 0;
    border: none;
    border-bottom: 1px solid rgb(219, 219, 219);
}

.profile-about .chip-container {
    margin-top: 24px;
    margin-bottom: 50px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.profile-about .chip-container span, .profile-about .chip-container a {
    text-decoration: none;
    padding: 0.6rem 1.5rem;
    border: 1px solid var(--color-primary-variant);
    border-radius: var(--default-border-radius);
    font-size: var(--medium-font);
    color: var(--color-primary-variant);
    font-weight: 600;
}

.profile-about .chip-container span:hover, .profile-about .chip-container a:hover {

    background-color: var(--color-primary-variant);
    color: white;
}




@media only screen and (max-width: 900px) {
    .profile-bio {
        gap: 60px;
        grid-template-columns: 100%;
    }

    .profile-bio .left {
        grid-template-columns: 100%;
    }

    .profile-bio .left img {
        margin: auto;
    }

    .profile-bio .left * {
        text-align: center;
    }

    .profile-bio .right .info p:first-child {
        text-align: right;
    }

    .profile-bio .right .info {
        grid-template-columns: 1fr 1fr;
    }

    .profile-detail {
        grid-template-columns: 100%;
        gap: 24px;
    }

    .profile-icons {
        justify-content: center;
    }

    .profile-detail .profile-about {
        margin-right: 16px;
    }

    .profile-detail .members {
        margin-left: 16px;
    }

    .members>div {
        padding: 16px 24px;

    }

    .members h3 {
        margin: 24px;
    }
}

@media only screen and (max-width: 400px) {
    .hide-responsive {
        display: none;
    }
}
</style>


<style>
.profile-detail .profile-about {
    border-radius: var(--default-border-radius);
    margin-left: 16px;
    background-color: white;
    padding: 24px;

}

.profile-about p {
    margin: 24px 0;
    color: var(--color-on-secondary);
}

.profile-about h2 {
    color: var(--color-tertiary);
}
</style>