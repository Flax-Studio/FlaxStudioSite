<script setup lang="ts">
</script>
<template>
  <section>
    <div class="wrapper">
      <div class="form-container forgot-password">
            <form action="#">
                <h2>Forgot Password</h2>
                <div class="form-group">
                    <input type="text" required>
                    <i class="fas fa-user"></i>
                    <label for="" name="email">Email</label>
                </div>
                <button Countinue type="button" class="btn-2">Send Email</button>
            </form>
        </div>
    </div>
  </section>
</template>
<style scoped>
@import './style/auth-ui.css' ;
</style>
