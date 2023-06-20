<script setup lang='ts'>
import { AccountSmallData } from '../data/DataType';
defineProps<{
    userProfiles: AccountSmallData[]
}>()
</script>
<template>
    <div class="members">
        <h3>Members</h3>

        <a v-for="user in userProfiles" :href="'/profile/' + user._id">
            <div>
                <img :src="user.profileImage" :alt="user.firstName + ' ' + user.lastName + ' Image'">
                <div>
                    <h4>{{ user.firstName + ' ' + user.lastName}}</h4>
                    <p>{{ user.expertIn }}</p>
                </div>
            </div>
        </a>
    </div>
</template>
<style scoped>
.members {
    margin-right: 16px;
    background-color: white;
    border-radius: var(--default-border-radius);
    min-height: 200px;
    height: max-content;
}

.members>a>div {
    padding: 16px;
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: 12px;
    align-items: center;
    border-top: 1px solid rgb(233, 233, 233);
    cursor: pointer;

}

.members a{
    display: block;
    text-decoration: none;
}

.members a:hover{
    background-color: rgba(0, 0, 0, 0.062);
    
}


.members img {
    width: 40px;
    border-radius: 50%;
}

.members h3 {
    margin: 16px;
}

.members h4 {
    font-size: 16px;
}

.members p {
    font-size: 14px;
}

@media only screen and (max-width: 900px) {

    .profile-detail .members {
        margin-left: 16px;
    }

    .members>a>div {
        padding: 16px 24px;

    }

    .members h3 {
        margin: 24px;
    }
}
</style>
