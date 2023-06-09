<script setup lang='ts'>
</script>
<template>
    <div class="dashboard">
        <Sidebar />

        <main>
            <DashboardNav />

            <section v-if="false">
                <h2>Active Projects</h2>
                <div class="projects-container">

                    <div class="card" v-for="i in 10">
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

            <section>
                <h2>Projects</h2>
                <div class="table-holder">
                    <table>
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Name</th>
                                <th>Manager</th>
                                <th>Members</th>
                                <th>Platform</th>
                                <th>Start</th>
                                <th>End</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img src="../../public/extra/no_image.png" alt="no image"></td>
                                <td>Task Planner</td>
                                <td>Sayam</td>
                                <td>5</td>
                                <td>Android</td>
                                <td>12 Jan 2023</td>
                                <td>12 Feb 2023</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

        </main>
    </div>
</template>
<style scoped>
.dashboard {
    display: grid;
    grid-template-columns: 300px auto;
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

.dashboard .table-holder{
    display: block;
    width: 100%;
    overflow: auto !important;
}
.dashboard table {
    border-spacing: 1rem;
    display: block;
}

.dashboard table img {
    width: 50px;
    border-radius: var(--border-radius-medium);
}

.dashboard table td,
.dashboard table th {
    text-align: left;
    white-space: nowrap;
}
</style>