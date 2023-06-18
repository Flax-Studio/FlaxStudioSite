<script setup lang='ts'>
</script>
<template>
    <main>
        <form>
            <h2>Project</h2>

            <!-- ---------- dashboard data -------------- -->
            <h3>Dashboard Part</h3>
            <div class="input-holder">
                <input type="text" placeholder="Name of project" required>
                <label>Project Name*</label>
            </div>

            <div class="input-holder">
                <textarea placeholder="Project description which is only visible on dashboard" required></textarea>
                <label>Project Description*</label>
            </div>

            <div class="input-holder">
                <select>
                    <option value="Android">Android</option>
                    <option value="Website">Website</option>
                    <option value="Web App">Web App</option>
                    <option value="Game">Game</option>
                    <option value="Flutter">Flutter</option>
                    <option value="React Native">React Native</option>
                </select>
                <label>Platform</label>
            </div>

            <div class="input-holder">
                <input type="text" placeholder="Name of person who will lead the team" required>
                <label>Team Lead*</label>
            </div>

            <div class="input-holder">
                <input type="date" placeholder="Start date" required>
                <label>Project Start Date*</label>
            </div>

            <div class="input-holder">
                <input type="date" placeholder="End date" required>
                <label>Project End Date*</label>
            </div>

            <div class="input-holder">
                <select>
                    <option value="0">Active</option>
                    <option value="1">Completed</option>
                    <option value="2">Failed</option>
                    <option value="3">Pending</option>
                </select>
                <label>Project Status</label>
            </div>

            <div class="col-2">
                <div class="input-holder">
                    <input type="url" readonly placeholder="Project Icon url">
                    <label>Project Icon</label>
                </div>

                <div class="upload">
                    <input type="file">
                    <button type="button">Upload</button>
                </div>
            </div>





            <!-- --------- Project page ------------ -->
            <h3>Project Page Part</h3>

            <div class="input-holder">
                <textarea
                    placeholder="Landing description for project page, it will be visible to the users who visit this page."></textarea>
                <label>Landing description</label>
            </div>

            <div class="input-holder">
                <input type="url" placeholder="Playstore url">
                <label>Playstore url</label>
            </div>


            <div class="input-holder">
                <textarea
                    placeholder="Description for project page, it will be visible to the users who visit this page (Markdown supported)"></textarea>
                <label>Project description</label>
            </div>

            <div class="input-holder">
                <textarea placeholder="Second description (Markdown supported)"></textarea>
                <label>Project second description</label>
            </div>

            <div class="input-holder">
                <textarea placeholder="e.g: <Title> --: <Content>"></textarea>
                <label>Features</label>
            </div>

            <div class="col-2">
                <div class="input-holder">
                    <input type="url" readonly placeholder="Landing image url">
                    <label>Landing image</label>
                </div>

                <div class="upload">
                    <input type="file">
                    <button type="button">Upload</button>
                </div>
            </div>

            <div class="input-holder">
                <input type="text" placeholder="SEO title for project page">
                <label>Project SEO title</label>
            </div>


            <div class="input-holder">
                <textarea placeholder="SEO description for project page"></textarea>
                <label>Project SEO description</label>
            </div>







            <h3>Privacy Page Part</h3>
            <div class="input-holder">
                <input type="text" placeholder="SEO title for project privacy page">
                <label>Project privacy SEO title</label>
            </div>


            <div class="input-holder">
                <textarea placeholder="SEO description for project privacy page"></textarea>
                <label>Project privacy SEO description</label>
            </div>

            <div class="input-holder">
                <textarea placeholder="Project privacy about description"></textarea>
                <label>Project privacy about description </label>
            </div>

            <button type="submit">Send</button>

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