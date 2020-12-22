<template>
  <nav
    class="w-full px-4 py-2 text-white bg-gradient-to-br from-blue-800 to-blue-600"
  >
    <router-link
      v-for="page in pages"
      :key="page.title"
      :to="page.to"
      class="mx-2"
    >
      {{ page.title }}
    </router-link>
    <div class="inline-block float-right">
      <button
        v-if="!isAuthenticated"
        class="mx-2"
        @click="openLoginModal"
      >
        Login
      </button>
      <button
        v-else
        class="mx-2"
        @click="logout()"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
import firebase from "../utilities/firebase";

export default {
  emits: ["open-login-modal", "logout"],
  data() {
    return {
      pages: [
        { title: "Home", to: "/" },
        { title: "Super Heroes", to: "/super-heroes" },
        { title: "Calendar", to: "/calendar" },
        { title: "Markdown", to: "/markdown" },
        { title: "Slider", to: "/slider" },
        { title: "Calculator", to: "/calculator" },
        { title: "Modal", to: "/reusable-modal" },
        { title: "Chat", to: "/chat" },
      ],
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(function () {
          // Sign-out successful.
        })
        .catch(function (error) {
          // An error happened.
          console.log(error);
        });
    },
    openLoginModal(){
      this.$store.commit('setIsLoginOpen', true);
    }
  },
};
</script>

<style></style>
