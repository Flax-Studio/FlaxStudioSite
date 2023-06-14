<script setup lang="ts">
import './style/auth-ui.css' 
</script>
<template>
  <section>
    <div class="wrapper">
      <div class="form-container sign-up">
        <form action="#">
          <h2>sign up</h2>
          <div class="form-group">
            <input type="text" required>
            <label for="">username</label>
          </div>
          <div class="form-group">
            <input type="email" required>
            <label for="">email</label>
          </div>
          <div class="form-group">
            <input type="password" required>
            <label for="">password</label>
          </div>
          <div class="form-group">
            <input type="password" required>
            <label for="">confirm password</label>
            <i class="fas fa-lock"></i>
          </div>
          <button type="submit" class="btn">sign up</button>
          <div class="link">
            <p>You already have an account?<NuxtLink to="/sign-in" class="signin-link"> sign in</NuxtLink></p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<style scoped>
@import './style/auth-ui.css';
</style>
