<script setup lang='ts'>
import Api from '../../data/api.js'

const router = useRouter()
const { params } = router.currentRoute.value

const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001'
const checkUrl = serverUrl + '/reset-password-validity/' + params.token

const password = ref('')
const confirmPassword = ref('')
const isProcessing = ref(false)


// fetch data from server for ssr
const { data, error } = await useFetch(checkUrl)

if (data.value == null) {
   throw { message: error.value?.data, statusCode: error.value?.statusCode || 404 }
}




async function onResetPassword(){
    if(isProcessing.value) return
    isProcessing.value = true

    if(confirmPassword.value != password.value){
        alert('Password not matching')
        return
    }

    isProcessing.value = true
    let res = await Api.resetPassword(params.token as string, password.value)
    isProcessing.value = false

    if(res.isError){
        alert(res.error)
    }else{
        if(res.result != null){
            alert('Your password is modified')
        }else{
            alert('Something went wrong')
        }
    }
    
}


</script>
<template>
    <Head>
        <Title>Reset Password</Title>
    </Head>
    <div class="auth">
        <form method="post" @submit.prevent="onResetPassword">
            <h2>Reset Password</h2>
            <p>The following action will reset your account password.</p>
            <input v-model="password" type="password" placeholder="New password">
            <input v-model="confirmPassword" type="password" placeholder="Confirm password">
            <button class="primary" type="submit">
                <span v-if="!isProcessing">Reset</span>
                <div v-else class="loader2"></div>
            </button>
        </form>
    </div>
</template>
<style scoped>@import '../../public/style/auth.css';</style>
