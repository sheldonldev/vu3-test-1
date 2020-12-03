<template>
  <AppHeader
    :is-authenticated="isAuthenticated"
    @open-login-modal="isLoginOpen = true"
  />

  <div class="flex w-full">
    <router-view />
  </div>

  <teleport to="body">
    <LoginModal
      v-if="isLoginOpen"
      @close-login-modal="isLoginOpen = false"
    />
  </teleport>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import LoginModal from "./components/LoginModal.vue";
import firebase from "./utilities/firebase";

export default {
  name: "App",
  components: {
    AppHeader,
    LoginModal,
  },
  data() {
    return {
      isLoginOpen: false,
      isAuthenticated: false,
      authUser: {},
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.isAuthenticated = true;
        this.authUser = user;
      } else {
        // No user is signed in.
        this.isAuthenticated = false;
        this.authUser = {};
      }
    });
  },
};
</script>

<style></style>
