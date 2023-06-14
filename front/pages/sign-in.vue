<script setup lang="ts">
</script>
<template>
  <section>
    <div class="wrapper">
      <div class="form-container sign-in">
            <form action="#">
                <h2>login</h2>
                <div class="form-group">
                    <input type="text" required>
                    <i class="fas fa-user"></i>
                    <label for="">username</label>
                </div>
                <div class="form-group">
                    <input type="password" required>
                    <i class="fas fa-lock"></i>
                    <label for="">password</label>
                </div>
                <div class="forgot-pass">
                    <NuxtLink to="/forgot-password">forgot password?</NuxtLink>
                </div>
                <button type="submit" class="btn">Login</button>
                <div class="link">
                    <p>Don't have an account?<NuxtLink to="/sign-up" class="signup-link"> sign up</NuxtLink></p>
                    <h3>or</h3>
                </div>


                <button type="button" class="btn-2"><img src="../public/extra/google.svg" alt="google "> Countinue with
                    Google</button>
                <div class="terms-1">
                    <p>by signing up or create an account i accept <br> Company’s<NuxtLink to="#" class="terms"> Terms of use and
                            privacy policy</NuxtLink> </p>
                </div>
            </form>
        </div>
    </div>
  </section>
</template>
<style scoped>
@import './style/auth-ui.css' ;
</style>
