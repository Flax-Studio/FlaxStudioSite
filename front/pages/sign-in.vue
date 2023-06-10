<script setup lang="ts">
onMounted(function () {
  let signUpLink = document.querySelector('.link .signup-link') as Element;
  let signInLink = document.querySelector('.link .signin-link') as Element;
  let wrapper = document.querySelector('.wrapper') as Element;
  signUpLink.addEventListener('click', () => {
    wrapper.classList.add('animated-signin');
    wrapper.classList.remove('animated-signup');
  });

  signInLink.addEventListener('click', () => {
    wrapper.classList.add('animated-signup');
    wrapper.classList.remove('animated-signin');
  });
})

</script>
<template>
  <HeaderComponent />
  <section>
    <div class="wrapper">
      <div class="form-container sign-up">
        <form action="#">
          <h2>sign up</h2>
          <div class="form-group">
            <input type="text" required>
            <label for="">username</label>
            <i class="fas fa-user"></i>
          </div>
          <div class="form-group">
            <input type="email" required>
            <label for="">email</label>
            <i class="fas fa-at"></i>
          </div>
          <div class="form-group">
            <input type="password" required>
            <label for="">password</label>
            <i class="fas fa-lock"></i>
          </div>
          <div class="form-group">
            <input type="password" required>
            <label for="">confirm password</label>
            <i class="fas fa-lock"></i>
          </div>
          <button type="submit" class="btn">sign up</button>
          <div class="link">
            <p>You already have an account?<a href="#" class="signin-link"> sign in</a></p>
          </div>
        </form>
      </div>
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
            <a href="#">forgot password?</a>
          </div>
          <button type="submit" class="btn">login</button>
          <div class="link">
            <p>Don't have an account?<a href="#" class="signup-link"> sign up</a></p>
            <h3>or</h3>
          </div>


          <button type="button" class="btn-2"><i class="fa-brands fa-google fa-beat"></i> countinue with
            google</button>
          <div class="terms-1">
            <p>by signing up or create an account i accept <br> Company’s <a href="#" class="terms"> Terms of use and
                privacy policy</a> </p>
          </div>
        </form>
      </div>
    </div>
  </section>
  <FooterComponent />
</template>
<style scoped>
section {
  background-color: var(--surface-color);
  min-height: 500px;
  font-weight: 400;
  display: grid;
  place-content: center;
  overflow: hidden;
}

.wrapper {
  position: relative;
  width: 35rem;
  height: 50rem;
}

@media(min-width:540px) {
  .wrapper {
    width: 40rem;
  }
}

.wrapper .form-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--surface-color);
  border-radius: .5rem;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
}

.wrapper .form-container form h2 {
  font-size: 3rem;
  text-align: center;
  text-transform: capitalize;
  color: var(--color-on-secondary);
}

.wrapper .form-container form .form-group {
  position: relative;
  width: 32rem;
  margin: 3rem 0;
}

.wrapper .form-container form .form-group i,
.wrapper .form-container form .form-group label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.6rem;
  text-transform: capitalize;
  color: var(--color-on-secondary);
  padding: 0 .5rem;
  pointer-events: none;
  transition: all .5s ease;
}

.wrapper .form-container form .form-group i {
  left: .5rem;
}

.wrapper .form-container form .form-group label {
  left: 2.5rem
}

.wrapper .form-container form .form-group input {
  width: 100%;
  height: 4rem;
  padding: 0 1rem;
  border-radius: .5rem;
  border: none;
  outline: none;
  border: .1rem solid var(--color-on-secondary);
  font-size: 1.6rem;
  color: var(--color-on-secondary);
  background: transparent;
}

form .form-group input:focus~label,
form .form-group input:valid~label,
form .form-group input:focus~i,
form .form-group input:valid~i {
  top: 0 !important;
  font-size: 1.2rem !important;
  background-color: var(--color-secondary);
}

.wrapper .form-container form .forgot-pass {
  margin: -1.5rem 0 1.5rem;
}

.wrapper .form-container form .forgot-pass a {
  color: var(--color-on-secondary);
  text-decoration: none;
  font-size: 1.4rem;
  text-transform: capitalize;
  transform: all .5s ease;
}

.wrapper .form-container form .forgot-pass a:hover {
  color: var(--mainColor);
  text-decoration: underline;
}

.wrapper .form-container form .btn {
  background: linear-gradient(90deg, #6F40BD 0%, var(--color-primary-variant) 100%);
  color: var(--color-secondary);
  text-transform: capitalize;
  width: 100%;
  height: 4rem;
  font-size: 1.6rem;
  font-weight: 500;
  outline: none;
  border: none;
  border-radius: .5rem;
  cursor: pointer;
  box-shadow: 0 .2rem 1rem rgba(0, 0, 0, 0.4);
}


.wrapper .form-container form .btn-2 {
  background-color: white;
  color: #333333;
  text-transform: capitalize;
  width: 100%;
  height: 4rem;
  font-size: 1.6rem;
  font-weight: 500;
  outline: none;
  border: none;
  border-radius: .5rem;
  cursor: pointer;
  box-shadow: 0 .2rem 1rem rgba(0, 0, 0, 0.4);
  text-decoration: none;
  transition: transform 0.3s ease;
}

.wrapper .form-container form .btn-2:hover {
  transform: translateY(-5px);

}


.wrapper .form-container form .terms-1 {
  text-align: center;
  padding-top: 3rem;
  font-size: 12px;
}

.wrapper .form-container form .terms-1 .terms {
  color: blue;
  text-decoration: none;
  font-weight: bold;
}






.wrapper .form-container form .link {
  text-align: center;
  font-size: 1.4rem;
  color: var(--color-on-secondary);
  margin: 2.5rem 0;
}

.wrapper .form-container form .link a {
  text-transform: capitalize;
  color: var(--mainColor);
  text-decoration: none;
  font-weight: 600;
  transition: all .5s ease;
}

.wrapper .form-container form .link a:hover {
  color: #da4453;
  text-decoration: underline;
}

.wrapper .sign-up {
  transform: rotate(7deg);
}

.wrapper.animated-signin .form-container.sign-in {
  animation: signin-flip 1s ease-in-out forwards;
}

@keyframes signin-flip {
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(-50rem) scale(1.1);
  }

  100% {
    transform: translateX(0) rotate(7deg) scale(1);
  }
}

.wrapper.animated-signin .form-container.sign-up {
  animation: rotatecard .7s ease-in-out forwards;
  animation-delay: .3s;
}

@keyframes rotatecard {
  0% {
    transform: rotate(7deg);
  }

  100% {
    transform: rotate(0);
    z-index: 1;
  }
}

.wrapper.animated-signup .form-container.sign-up {
  animation: signup-flip 1s ease-in-out forwards;
}

@keyframes signup-flip {
  0% {
    transform: translateX(0);
    z-index: 1;
  }

  50% {
    transform: translateX(50rem) scale(1.1);
  }

  100% {
    transform: translateX(0) rotate(7deg) scale(1);
  }
}

.wrapper.animated-signup .form-container.sign-in {
  transform: rotate(7deg);
  animation: rotatecard .7s ease-in-out forwards;
  animation-delay: .3s;
}

@keyframes rotatecard {
  0% {
    transform: rotate(7deg);
  }

  100% {
    transform: rotate(0);
    z-index: 1;
  }
}
</style>
