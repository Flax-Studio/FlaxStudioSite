<script setup lang='ts'>
import { DashboardData } from '~/data/DataType';
import Api from '~/data/api';
import { dateTimeString, getAgeFromTimestamp } from '~/data/utils'
import { marked } from 'marked'
const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001'


const activeTabIndex = ref(0)
const dashboardData = ref<DashboardData>()
const isLoading = ref(true)
const isAuthenticated = ref(false)


function changeActiveTab(index: number) {
    activeTabIndex.value = index
}

onMounted(function () {
    fetchDataFromServer()
})


async function fetchDataFromServer() {

    const token = localStorage.getItem('token')

    if (token == null) {
        //throw { message: "You don't have access to server, please signin", statusCode: 401 }
        alert("You don't have access to server, please signin")
        return
    }

    const res = await Api.getDashboardData(token!!)
    if (res.isError) {
        alert(res.error)
        return // throw { message: res.error, statusCode: 403 }
    } else {
        if (res.result != null) {
            dashboardData.value = res.result
            isLoading.value = false
            isAuthenticated.value = true
        } else {
            alert("Something went wrong, please refresh the page")
        }
    }
}



function countActiveProjects() {
    if (dashboardData.value == undefined) return 0
    let count = 0
    dashboardData.value!!.products.forEach(element => {
        if (element.dashStatus == 'active') {
            count++
        }
    });

    return count
}



function markdownToHtml(markdown: string | undefined) {
    if (markdown == undefined) return ''
    return marked(markdown)
}

</script>
<template>
    <div v-if="isLoading" class="loader-container">
        <div class="loader2 dark"></div>
    </div>
    <div v-if="isAuthenticated" class="dashboard">
        <Sidebar :onClick="(index) => changeActiveTab(index)" />

        <div>
            <DashboardNav :icon-url="serverUrl + dashboardData?.profile.profileImage"
                :role="dashboardData?.profile.role || ''"
                :name="dashboardData?.profile.firstName + ' ' + dashboardData?.profile.lastName" />

            <!-- Home -->
            <section v-if="activeTabIndex == 0">
                <h2>Active Projects</h2>
                <button v-if="dashboardData?.profile.role == 'CEO' || dashboardData?.profile.role == 'CO'">
                    <NuxtLink to="./productAdd">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z" />
                        </svg>
                        <span>Add Project</span>
                    </NuxtLink>
                </button>

                <div class="projects-container">
                    <p class="text-center" v-if="countActiveProjects() == 0">No active project found</p>
                    <template v-for="product in dashboardData?.products">
                        <div v-if="product.dashStatus == 'active'" class="card">
                            <div class="header">
                                <img :src="serverUrl + product.dashIconUrl" :alt="product.name">
                                <div>
                                    <h3>{{ product.name }}</h3>
                                    <span>{{ product.dashPlatform }}</span>
                                </div>
                            </div>
                            <p class="detail">Started At: {{ dateTimeString(product.dashStartedAt) }} | {{
                                product.dashTeamLead }}</p>
                            <p class="description">{{ product.dashDescription }}</p>
                        </div>
                    </template>

                </div>
            </section>


            <!-- Projects -->
            <section v-if="activeTabIndex == 1">
                <h2>Projects</h2>
                <div class="table-holder">
                    <table>
                        <colgroup>
                            <col style="width: auto;">
                            <col style="width: auto;">
                            <col style="width: auto;">
                            <col style="width: auto;">
                            <col style="width: auto;">
                            <col style="width: auto;">
                            <col v-if="dashboardData?.profile.role != 'MEMBER'" style="width: 6rem;">
                            <col v-if="dashboardData?.profile.role != 'MEMBER'" style="width: 6rem;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Name</th>
                                <th>Platform</th>
                                <th>Team Lead</th>
                                <th>Started At</th>
                                <th>Completed At</th>
                                <th v-if="dashboardData?.profile.role != 'MEMBER'" style="text-align: center;">Edit</th>
                                <th v-if="dashboardData?.profile.role != 'MEMBER'" style="text-align: center;">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in dashboardData?.products" :class="product.dashStatus">
                                <td><img :src="serverUrl + product.dashIconUrl" :alt="product.name"></td>
                                <td>{{ product.name }}</td>
                                <td>{{ product.dashPlatform }}</td>
                                <td>{{ product.dashTeamLead }}</td>
                                <td>{{ dateTimeString(product.dashStartedAt) }}</td>
                                <td>{{ dateTimeString(product.dashCompletedAt) }}</td>
                                <td v-if="dashboardData?.profile.role != 'MEMBER'">
                                    <NuxtLink :to="'/admin/productUpdate/' + product._id">
                                        <button>
                                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M9.75 2h3.998a.75.75 0 0 1 .102 1.493l-.102.007H12.5v17h1.245a.75.75 0 0 1 .743.648l.007.102a.75.75 0 0 1-.648.743l-.102.007H9.75a.75.75 0 0 1-.102-1.493l.102-.007H11v-17H9.75a.75.75 0 0 1-.743-.648L9 2.75a.75.75 0 0 1 .648-.743L9.75 2h3.998H9.75Zm8.496 2.997a3.253 3.253 0 0 1 3.25 3.25l.004 7.504a3.249 3.249 0 0 1-3.064 3.246l-.186.005h-4.745v-1.5h4.803A1.749 1.749 0 0 0 20 15.751l-.003-7.505a1.753 1.753 0 0 0-1.752-1.75h-4.74v-1.5h4.74Zm-8.246 0v1.5H5.25a1.75 1.75 0 0 0-1.75 1.75v7.504c0 .967.784 1.75 1.75 1.75h4.745v1.5H5.25A3.25 3.25 0 0 1 2 15.751V8.247a3.25 3.25 0 0 1 3.25-3.25H10Z" />
                                            </svg>
                                        </button>
                                    </NuxtLink>
                                </td>
                                <td v-if="dashboardData?.profile.role != 'MEMBER'">
                                    <button class="delete">
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-1.28 13.02a2.75 2.75 0 0 1-2.561 2.474l-.176.006H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75Zm6.197 4.75H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h7.374c.6 0 1.109-.425 1.225-1.002l.02-.126L18.196 6.5ZM13.75 9.25a.75.75 0 0 1 .743.648L14.5 10v7a.75.75 0 0 1-1.493.102L13 17v-7a.75.75 0 0 1 .75-.75Zm-3.5 0a.75.75 0 0 1 .743.648L11 10v7a.75.75 0 0 1-1.493.102L9.5 17v-7a.75.75 0 0 1 .75-.75Zm1.75-6a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25Z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- Members -->
            <section v-if="activeTabIndex == 2">
                <h2>Members</h2>
                <div class="table-holder">
                    <table>
                        <colgroup>
                            <col style="width: auto;">
                            <col style="width: auto;">
                            <col style="width: auto;">
                            <col style="width: auto;">
                            <col style="width: auto;">
                            <col style="width: auto;">
                            <col style="width: auto;">

                        </colgroup>
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Projects</th>
                                <th>Joined At</th>
                                <th>Public</th>
                                <th style="text-align: center;">Profile</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="member in dashboardData?.members">
                                <td><img :src="serverUrl + member.profileImage"
                                        :alt="member.firstName + ' ' + member.lastName"></td>
                                <td>{{ member.firstName }} {{ member.lastName }}</td>
                                <td>{{ member.role }}</td>
                                <td>{{ member.projects.split(' ').length }}</td>
                                <td>{{ dateTimeString(member.joinedAt) }}</td>
                                <td>{{ member.isPublic }}</td>

                                <td>
                                    <NuxtLink target="_blank" :to="'/profile/' + member._id">
                                        <button>
                                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M13.267 4.209a.75.75 0 0 0-1.034 1.086l6.251 5.955H3.75a.75.75 0 0 0 0 1.5h14.734l-6.251 5.954a.75.75 0 0 0 1.034 1.087l7.42-7.067a.996.996 0 0 0 .3-.58.758.758 0 0 0-.001-.29.995.995 0 0 0-.3-.578l-7.419-7.067Z" />
                                            </svg>
                                        </button>
                                    </NuxtLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- profile -->
            <section class="profile" v-if="activeTabIndex == 3">
                <h2>Profile</h2>

                <div class="card basic">
                    <NuxtLink to="/admin/profileUpdate">
                        <button>
                            <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-e92eabd9="">
                                <path
                                    d="M12 3.5a8.5 8.5 0 0 0-.705 16.971l-.234.936a2.117 2.117 0 0 0-.064.543C5.945 21.447 2 17.184 2 12 2 6.477 6.477 2 12 2c5.27 0 9.589 4.077 9.972 9.25a3.293 3.293 0 0 0-1.257-.25h-.002c-.09 0-.18.004-.27.011A8.501 8.501 0 0 0 12 3.5Zm8.715 8.5h-.002c-.585 0-1.17.223-1.615.67l-5.902 5.902a2.684 2.684 0 0 0-.707 1.247l-.458 1.831a1.087 1.087 0 0 0 1.319 1.318l1.83-.457a2.684 2.684 0 0 0 1.248-.707l5.902-5.902A2.285 2.285 0 0 0 20.715 12Z">
                                </path>
                            </svg>
                        </button>
                    </NuxtLink>
                    <div class="heading">
                        <img :src="serverUrl + dashboardData?.profile.profileImage"
                            :alt="dashboardData?.profile.firstName + ' ' + dashboardData?.profile.lastName">
                        <div>
                            <h3>{{ dashboardData?.profile.firstName }} {{ dashboardData?.profile.lastName }}</h3>
                            <span>Android & Web fullstack Developer</span>
                        </div>
                    </div>
                    <p>{{ dashboardData?.profile.smallInfo || 'Detail not added yet' }}</p>
                </div>


                <h4>Extra Details</h4>
                <div class="card">
                    <table>
                        <tbody>
                            <tr>
                                <th>Availability: </th>
                                <td>{{ 'Full-Time' }}</td>
                            </tr>
                            <tr>
                                <th>Age: </th>
                                <td v-if="dashboardData?.profile.dob == 0 || dashboardData?.profile.dob == undefined">Not
                                    added yet</td>
                                <td v-else>{{ getAgeFromTimestamp(dashboardData!!.profile.dob) }}</td>
                            </tr>
                            <tr>
                                <th>Location: </th>
                                <td>{{ dashboardData?.profile.location || 'Not added yet' }}</td>
                            </tr>
                            <tr>
                                <th>Experience: </th>
                                <td>{{ dashboardData?.profile.experience + ' Years' || 'Not added yet' }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="icons">
                        <template v-if="dashboardData?.profile.socialLinks"
                            v-for="social in dashboardData.profile.socialLinks">
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

                <h4>About</h4>
                <div class="card" v-html="markdownToHtml(dashboardData?.profile.about)"></div>

                <h4>External Projects</h4>
                <div class="card">
                    <div class="chip-container">
                        <a v-for="project in dashboardData?.profile.externalProjectsLinks" :href="project.url">{{
                            project.name }}</a>
                    </div>
                </div>

                <h4>Skills</h4>
                <div class="card">
                    <div class="chip-container">
                        <span v-if="dashboardData?.profile.skills.trim() != ''"
                            v-for="skill in dashboardData?.profile.skills.toLowerCase().split('|')">{{ skill }}</span>
                    </div>
                </div>

                <h4>Languages</h4>
                <div class="card">
                    <div class="chip-container">
                        <span v-if="dashboardData?.profile.languages.trim() != ''"
                            v-for="lang in dashboardData?.profile.languages.toLowerCase().split('|')">{{ lang }}</span>
                    </div>
                </div>

            </section>
        </div>
    </div>
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

.dashboard section>button {
    border-radius: var(--default-border-radius);
    border: none;
    background-color: var(--color-primary-variant);
    margin-bottom: 3rem;
}

.dashboard section>button:hover {
    background-color: var(--color-primary-variant-dark);
}

.dashboard section>button svg {
    fill: var(--color-secondary);
}

.dashboard section>button a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.6rem 1rem;
    text-decoration: none;
    color: var(--color-secondary);
    font-size: var(--medium-font);
    gap: 1rem;

}

.dashboard .text-center {
    text-align: center !important;
    color: var(--color-on-secondary);
    width: 100%;
    margin-top: 10rem;
}


.dashboard {
    display: grid;
    grid-template-columns: 20% 80%;
    width: 100%;
    background-color: var(--surface-color);
}


/* ----------------- profile ------------------- */

.dashboard .card {
    background-color: var(--surface-variant-color);
    border-radius: var(--border-radius-medium);
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
}








.dashboard section {
    max-width: 1000px;
    width: 100%;
    padding: 0 2rem;
    margin: 3rem auto;
}

.dashboard section h2 {
    color: var(--color-tertiary);
    font-size: var(--big-font);
    margin: 1em 0;
}

.dashboard section .projects-container {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 1rem;
}

.dashboard .projects-container .card {
    background-color: white;
    color: var(--color-on-secondary);
    padding: 1rem;
    border-radius: var(--border-radius-medium);
    margin: 0;
}

.dashboard .projects-container .header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.dashboard .projects-container .header img {
    width: 60px;
    border-radius: var(--border-radius-medium);
}

.dashboard .projects-container .header h3 {
    font-size: var(--average-font);
    font-weight: 600;
    margin: 0;
    margin-bottom: 0.4em;
}

.dashboard .projects-container .header span {
    font-size: var(--small-font);
    background-color: var(--color-primary-variant);
    padding: 0.4em 1em;
    border-radius: var(--default-border-radius);
    color: white;
}

.dashboard .projects-container .detail {
    font-size: var(--small-font);
    color: var(--color-primary);
    font-weight: 600;
    margin: 0.7rem 0;
}

.dashboard .projects-container .description {
    font-size: var(--medium-font);
    line-height: 1.5;
}





/* ------------------ table ------------------------- */


.dashboard table tr {
    position: relative;
}

.dashboard table img {
    width: 50px;
    border-radius: var(--border-radius-medium);
}

.dashboard table tr::before {
    content: '';
    width: 6px;
    background-color: transparent;
    position: absolute;
    z-index: 1;
    height: 60%;
    top: 50%;
    translate: 0 -50%;
    border-top-right-radius: var(--border-radius-medium);
    border-bottom-right-radius: var(--border-radius-medium);
}


.dashboard table tr.active::before {
    background-color: var(--color-primary)
}

.dashboard table tr.failed::before {
    background-color: var(--color-error)
}

.dashboard table tr.success::before {
    background-color: var(--color-success)
}

.dashboard .profile .basic button {
    border: none;
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 50px;
    height: 50px;
    background-color: var(--color-tertiary);
    border-radius: var(--default-border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
}

.dashboard .profile .basic button svg {
    fill: white;
    width: 28px;
}

.dashboard .profile {
    color: var(--color-on-secondary);
}

.dashboard .profile h4 {
    color: var(--color-tertiary);
}

.dashboard .profile .basic {
    position: relative;
}

.dashboard .profile .heading img {
    width: 80px;
    border-radius: 50%;
}

.dashboard .profile .heading {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.dashboard .profile .heading h3 {
    margin-bottom: 0.2em;
    font-size: var(--average-font);
    color: var(--color-tertiary);
}

.dashboard .profile .heading span {
    color: var(--color-primary-variant);
    font-size: var(--medium-font);
}


/* -----------extra details */

.dashboard .profile .icons {
    margin-top: 1rem;
    display: flex;
    gap: 0.4rem;
}

.dashboard .profile .icons a {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--surface-color);
    fill: var(--color-on-secondary);
    border-radius: var(--default-border-radius);
}

.dashboard .profile .icons a:hover {
    background-color: var(--color-primary-variant);
    fill: var(--color-secondary);
}

.dashboard .profile .icons svg {
    width: 24px;
    fill: inherit;

}


/* ----------- chips -------- */
.dashboard .profile .chip-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 1rem 0;
}

.dashboard .profile .chip-container a,
.dashboard .profile .chip-container span {
    text-decoration: none;
    padding: 0.6rem 1.5rem;
    border: 1px solid var(--color-primary-variant);
    border-radius: var(--default-border-radius);
    font-size: var(--medium-font);
    color: var(--color-primary-variant);
    font-weight: 600;
}

.dashboard .profile .chip-container a:hover,
.dashboard .profile .chip-container span:hover {
    background-color: var(--color-primary-variant);
    color: var(--color-secondary);

}


@media only screen and (max-width: 800px) {
    .dashboard {
        grid-template-columns: 200px auto;
    }
}
</style>


<style>
.dashboard .profile p {
    margin: 1em 0;
    font-size: var(--medium-font);
}

.dashboard .profile table td,
.dashboard .profile table th {
    padding: 0.5rem 2rem;
    padding-left: 0;
    text-align: left;
}
</style>