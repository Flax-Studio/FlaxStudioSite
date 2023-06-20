<script setup lang='ts'>
import { marked } from 'marked'
import { ProfilePageData, AccountPublicData } from '~/data/DataType';

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
                    <img :src="pageData.profile.profileImage" :alt="pageData.profile.firstName + ' Image'">
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
                        <p>{{ pageData.profile.dob }}</p>
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
                        <template v-for="link in pageData.profile.socialLinks">
                            <a v-if="link.name == 'github' && link.url != ''" :href="link.url"><img src="../../public/extra/github.svg" alt="Github"></a>
                            <a v-if="link.name == 'facebook' && link.url != ''" :href="link.url"><img src="../../public/extra/facebook.svg" alt="Facebook"></a>
                            <a v-if="link.name == 'twitter' && link.url != ''" :href="link.url"><img src="../../public/extra/github.svg" alt="twitter"></a>
                            <a v-if="link.name == 'instagram' && link.url != ''" :href="link.url"><img src="../../public/extra/github.svg" alt="Instagram"></a>
                            <a v-if="link.name == 'linkedin' && link.url != ''" :href="link.url"><img src="../../public/extra/github.svg" alt="Linkedin"></a>
                            <a v-if="link.name == 'hackerRank' && link.url != ''" :href="link.url"><img src="../../public/extra/github.svg" alt="Hacker Rank"></a>
                        </template>

                    </div>
                </div>
            </div>
        </div>

        <div class="profile-detail-container">
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
                        <span v-for="skill in pageData.profile.skills.split('|')">{{ skill }}</span>
                    </div>

                    <hr>
                    <h2>Languages</h2>
                    <div class="chip-container">
                        <span v-for="lang in pageData.profile.languages.split('|')">{{ lang }}</span>
                    </div>

                </div>


                <ProfileMembers :user-profiles="pageData.members" />
            </div>
        </div>
    </div>
    <FooterComponent />
</template>
<style>
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
    height: 120px;
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
    gap: 24px;
    align-items: center;
}

.profile-bio .right .profile-icons img {
    display: block;
    opacity: 0.7;
    transition: scale 200ms;
}

.profile-bio .right .profile-icons img:hover {
    opacity: 1;
    scale: 1.3;
}


.profile-detail {
    max-width: var(--max-page-width);
    margin: auto;
    display: grid;
    grid-template-columns: auto 300px;
    gap: 24px;
    padding-bottom: 100px;

}

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
    color: var(--color-primary-variant);
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
    border-radius: var(--border-radius-medium);
    font-size: var(--medium-font);
    color: var(--color-primary-variant);
    font-weight: 600;
}

.profile-about .chip-container span:hover, .profile-about .chip-container a:hover {

    background-color: var(--color-primary);
    color: white;
    border: 1px solid var(--color-primary);
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