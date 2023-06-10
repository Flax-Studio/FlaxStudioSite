<script setup lang='ts'>

const activeTabIndex = ref(0)


function changeActiveTab(index: number) {
    activeTabIndex.value = index
}
</script>
<template>
    <div class="dashboard">
        <Sidebar :onClick="(index) => changeActiveTab(index)" />

        <main>
            <DashboardNav />

            <!-- Home -->
            <section v-if="activeTabIndex == 0">
                <h2>Active Projects</h2>
                <div class="projects-container">

                    <div class="card" v-for="i in 4">
                        <div class="header">
                            <img src="../../public/extra/no_image.png" alt="no_image">
                            <div>
                                <h3>Task Planner</h3>
                                <span>Android</span>
                            </div>
                        </div>
                        <p class="detail">Started: 20 Jun 2023 | Sayam</p>
                        <p class="description">A simple android app to track and manage your work easily.</p>
                    </div>

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
                            <col style="width: 6rem;">
                            <col style="width: 6rem;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Name</th>
                                <th>Platform</th>
                                <th>Team Lead</th>
                                <th>Started At</th>
                                <th>Completed At</th>
                                <th style="text-align: center;">Edit</th>
                                <th style="text-align: center;">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="status, index in ['active', 'failed', 'success']" :class="status">
                                <td><img src="../../public/extra/no_image.png" alt="no_image"></td>
                                <td>Task Planner</td>
                                <td>Android</td>
                                <td>Sayam</td>
                                <td>10 Jan 2022</td>
                                <td>20 Feb 2022</td>
                                <td>
                                    <button>
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.75 2h3.998a.75.75 0 0 1 .102 1.493l-.102.007H12.5v17h1.245a.75.75 0 0 1 .743.648l.007.102a.75.75 0 0 1-.648.743l-.102.007H9.75a.75.75 0 0 1-.102-1.493l.102-.007H11v-17H9.75a.75.75 0 0 1-.743-.648L9 2.75a.75.75 0 0 1 .648-.743L9.75 2h3.998H9.75Zm8.496 2.997a3.253 3.253 0 0 1 3.25 3.25l.004 7.504a3.249 3.249 0 0 1-3.064 3.246l-.186.005h-4.745v-1.5h4.803A1.749 1.749 0 0 0 20 15.751l-.003-7.505a1.753 1.753 0 0 0-1.752-1.75h-4.74v-1.5h4.74Zm-8.246 0v1.5H5.25a1.75 1.75 0 0 0-1.75 1.75v7.504c0 .967.784 1.75 1.75 1.75h4.745v1.5H5.25A3.25 3.25 0 0 1 2 15.751V8.247a3.25 3.25 0 0 1 3.25-3.25H10Z" />
                                        </svg>
                                    </button>
                                </td>
                                <td>
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
                            <col style="width: 6rem;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Name</th>
                                <th>Platform</th>
                                <th>Role</th>
                                <th>Projects</th>
                                <th>Joined At</th>
                                <th>Profile</th>
                                <th style="text-align: center;">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="status, index in 5">
                                <td><img src="../../public/extra/no_image.png" alt="no_image"></td>
                                <td>Nitesh Kumar</td>
                                <td>Android</td>
                                <td>CEO</td>
                                <td>5</td>
                                <td>10 Jan 2022</td>

                                <td>
                                    <button>
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13.267 4.209a.75.75 0 0 0-1.034 1.086l6.251 5.955H3.75a.75.75 0 0 0 0 1.5h14.734l-6.251 5.954a.75.75 0 0 0 1.034 1.087l7.42-7.067a.996.996 0 0 0 .3-.58.758.758 0 0 0-.001-.29.995.995 0 0 0-.3-.578l-7.419-7.067Z" />
                                        </svg>
                                    </button>
                                </td>
                                <td>
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

            <section v-if="activeTabIndex == 3">
                <h2>Profile</h2>
            </section>



        </main>
    </div>
</template>
<style scoped>
.dashboard {
    display: grid;
    grid-template-columns: 20% 80%;
    width: 100%;
    background-color: var(--surface-color);
}


section {
    max-width: 1000px;
    width: 100%;
    padding: 0 2rem;
    margin: 3rem auto;
}

section h2 {
    color: var(--color-tertiary);
    font-size: var(--big-font);
    margin: 1em 0;
}

section .projects-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.projects-container .card {
    max-width: 18rem;
    background-color: white;
    color: var(--color-on-secondary);
    padding: 1rem;
    border-radius: var(--border-radius-medium);
}

.projects-container .header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.projects-container .header img {
    width: 60px;
    border-radius: var(--border-radius-medium);
}

.projects-container .header h3 {
    font-size: var(--medium-2-font);
    font-weight: 600;
    margin-bottom: 0.4em;
}

.projects-container .header span {
    font-size: var(--small-font);
    background-color: var(--color-primary-variant);
    padding: 0.4em 1em;
    border-radius: var(--default-border-radius);
    color: white;
}

.projects-container .detail {
    font-size: var(--small-font);
    color: var(--color-primary);
    font-weight: 600;
    margin: 0.7rem 0;
}

.projects-container .description {
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
</style>