<script setup lang='ts'>
</script>
<template>
    <div class="features-container" id="about">
        <h2>Some of the best features of our Apps</h2>
        <div class="features">
            <div class="card reveal">
                <h3>Simple & Easy</h3>
                <p>Our Apps are designed with simplicity and ease of use in mind,
                ensuring that users can quickly and easily navigate and use our apps without any unnecessary complexity or confusion. </p>
            </div>
            <div class="card reveal">
                <h3>High Performance</h3>
                <p>Our Apps are optimized for high performance,
                utilizing the latest technologies and best practices to ensure that they run smoothly and quickly on a wide range of devices. </p>
            </div>
            <div class="card reveal">
                <h3>Supports</h3>
                <p>We have a dedicated team of developers and technical experts, 
                ensuring that any issues or concerns are promptly addressed and resolved. </p>
            </div>
            <div class="card reveal">
                <h3>Customization</h3>
                <p>We keeps our Apps highly customizable, allowing users to tailor the app to their specific needs and preferences. 
                With a wide range of customization options, users can make our apps truly their own. </p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.features-container {
    max-width: var(--max-page-width);
    margin: 60px auto;
    margin-top: 100px;
    padding: 0 var(--page-margin);
    background-color: White;
}

.features-container h2 {
    color: var(--color-on-secondary);
    font-weight: 600;
    font-size: 30px;
    margin: 30px 0;
    text-align: center;
}

.features-container>p {
    color: var(--color-on-secondary);
    max-width: 600px;
    margin: 20px auto;
    text-align: center;
}

.features{
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
}

.features .card{
    padding: 24px 0;
    width: 250px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0px 4px 26px rgba(115, 64, 188, 0.2);
}


.features .card h3{
    font-weight: 600;
    font-size: 18px;
    text-align: center;
    color: var(--color-primary-variant);
}

.features .card p{
    text-align: center;
    color: var(--color-on-secondary);
    margin: 8px;
    font-size: 16px;
}
</style>
