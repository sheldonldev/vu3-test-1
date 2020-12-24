<template>
  <AppHeader />

  <div class="flex w-full">
    <router-view />
  </div>

  <teleport to="body">
    <LoginModal v-if="isLoginOpen" @close-login-modal="closeLoginModal()" />
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
  computed: {
    isLoginOpen() {
      return this.$store.state.isLoginOpen;
    },
  },
  methods: {
    closeLoginModal() {
      this.$store.commit("setIsLoginOpen", false);
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.$store.commit("setIsAuthenticated", true);
        this.$store.commit("setAuthUser", user);
      } else {
        // No user is signed in.
        this.$store.commit("setIsAuthenticated", false);
        this.$store.commit("setAuthUser", {});
      }
    });
  },
};
</script>

<style></style>
