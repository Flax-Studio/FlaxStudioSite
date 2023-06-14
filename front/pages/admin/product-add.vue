<script setup lang='ts'>
</script>
<template>
    <main>
        <form>
            <h2>Product</h2>

            <h3>SEO Part</h3>
            <div class="input-holder">
                <input type="text" placeholder="Title which is visible on google search">
                <label>Product Name</label>
            </div>

            <div class="input-holder">
                <textarea placeholder="Description which is visible on google search"></textarea>
                <label>Landing description</label>
            </div>

            <h3>Landing Part</h3>
            <div class="input-holder">
                <input type="text" placeholder="Product name">
                <label>Product Name</label>
            </div>

            <div class="input-holder">
                <textarea placeholder="Landing description"></textarea>
                <label>Landing description</label>
            </div>

            <div class="col-2">
                <div class="input-holder">
                    <input type="url" readonly placeholder="Landing image url">
                    <label>Landing Image</label>
                </div>

                <div class="upload">
                    <input type="file" >
                    <button type="button">Upload</button>
                </div>
            </div>


            <div class="input-holder">
                <input type="url" placeholder="https://play.google.com/store/apps/details?id=com.flaxstudio.drawon">
                <label>Playstore url</label>
            </div>

            <h3>Content Part</h3>
            <div class="input-holder">
                <textarea
                    placeholder="Write full descriptions, use **text** to bold, *text* to italic and ***text*** to bold + italic "></textarea>
                <label>About description</label>
            </div>
            <div class="input-holder">
                <textarea placeholder="Write small ending lines..."></textarea>
                <label>About end description</label>
            </div>

            <h3>Features</h3>
            <div class="input-holder">
                <textarea placeholder="e.g: <Title> --: <Content>"></textarea>
                <label>Features</label>
            </div>

            <button type="submit">Send</button>

        </form>
    </main>
</template>
<style scoped>
main {
    background-color: var(--surface-color);
    overflow: auto;
    margin-bottom: 10rem;
}

main form {
    max-width: var(--max-page-width);
    margin: auto;
    background-color: white !important;
    padding: var(--page-margin);
    min-height: 100vh;
    color: var(--color-on-secondary);
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


form .col-2{
    display: grid;
    grid-template-columns: auto max-content;
    gap: 1rem;
    align-items: center;
}

form .upload{
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

form button{
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

form button:hover{
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
form textarea {
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