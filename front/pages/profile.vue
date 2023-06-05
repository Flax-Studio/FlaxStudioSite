<script setup lang='ts'>
import { userProfiles } from '../data/CommonData';
</script>
<template>
    <HeaderComponent />
    <div class="profile-container">
        <div class="profile-parent">
            <div class="profile-bio">
                <div class="left">
                    <img src="../public/profiles/nitesh_image.png" alt="nitesh">
                    <div>
                        <h2>Nitesh Kumar</h2>
                        <p class="info">Android, Web & Game developer</p>
                        <p class="small-info">As an intermediate developer, I recognize that there is always room for
                            improvement and growth. I am constantly seeking out new challenges and opportunities to expand
                            my skillset and knowledge base.</p>
                        <a href="mailto:niteshdev547@gmail.com">Contact</a>
                    </div>
                </div>
                <div class="right">
                    <div class="info">
                        <p>Availability:</p>
                        <p>Full-time</p>
                    </div>
                    <div class="info">
                        <p>Age:</p>
                        <p>19</p>
                    </div>
                    <div class="info">
                        <p>Location:</p>
                        <p>India, Bihar</p>
                    </div>
                    <div class="info">
                        <p>Experience:</p>
                        <p>1.5 years</p>
                    </div>
                    <div class="profile-icons">
                        <a href="https://github.com/nitesh-dev/"><img src="../public/extra/github.svg" alt="github"></a>
                        <a href="https://twitter.com/niteshdev547"><img src="../public/extra/twitter.svg"
                                alt="twitter"></a>
                        <!-- <a href="#"><img src="../../assets/extra/instagram.svg" alt="instagram"></a> -->
                        <!-- <a href="#"><img src="../../assets/extra/linkedin.svg" alt="linkedin"></a>
                            <a href="#"><img src="../../assets/extra/facebook.svg" alt="facebook"></a> -->
                    </div>
                </div>
            </div>
        </div>

        <div class="profile-detail-container">
            <div class="profile-detail">
                <div class="profile-about">
                    <h2 id="about">About</h2>
                    <p>As an intermediate Android, game, and web developer, I am constantly honing my skills and expanding
                        my knowledge in the ever-evolving world of digital technology. I have always been fascinated by the
                        ability of technology to connect people and empower them to accomplish incredible things, and that
                        is what motivates me every day.</p>
                    <p>In my journey as a developer, I have gained a solid foundation in developing mobile applications for
                        the Android operating system. I have learned how to build applications that leverage the full
                        potential of the platform, from designing intuitive user interfaces to implementing complex features
                        that enhance user engagement and interactivity.</p>
                    <p>As a game developer, I have been able to express my creativity and imagination through designing
                        immersive gaming experiences. I enjoy the challenge of crafting compelling gameplay mechanics,
                        creating visually stunning graphics, and incorporating new technologies and trends to make my games
                        stand out.</p>
                    <p>In addition to my Android and game development skills, I have also developed proficiency in web
                        development. I have learned how to create responsive and user-friendly websites that deliver an
                        exceptional user experience across multiple devices and platforms.</p>
                    <p>As an intermediate developer, I recognize that there is always room for improvement and growth. I am
                        constantly seeking out new challenges and opportunities to expand my skillset and knowledge base. I
                        am excited to continue on this journey of exploration and discovery, pushing the limits of what I
                        can achieve as a developer and contributing to the digital world in meaningful ways.</p>

                    <hr>
                    <h2>Skills</h2>
                    <div class="chip-container">
                        <span>Python</span>
                        <span>Android</span>
                        <span>Javascript</span>
                        <span>Typescript</span>
                        <span>Figma</span>
                        <span>C++</span>
                        <span>Kotlin</span>
                        <span>Mysql</span>
                        <span>HTML</span>
                        <span>Unity</span>
                        <span>Vue</span>
                    </div>

                    <hr>
                    <h2>Languages</h2>
                    <div class="chip-container">
                        <span>English</span>
                        <span>Hindi</span>
                    </div>

                </div>


                <ProfileMembers :user-profiles="userProfiles" />
            </div>
        </div>
    </div>
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

.profile-about .chip-container span {
    border-radius: var(--default-border-radius);
    font-size: 16px;
    border: 1px solid rgb(136, 136, 136);
    cursor: pointer;
    padding: 4px 24px;
    transition: all 200ms;
}

.profile-about .chip-container span:hover {

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