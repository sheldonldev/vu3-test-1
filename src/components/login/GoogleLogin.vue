<template>
  <section class="mt-6">
    <button
      class="w-full p-2 text-center text-white bg-blue-400 rounded shadow"
      @click="loginWithGoogle()"
    >
      Login with Google <i class="fab fa-google" />
    </button>
    <p class="mt-4 text-center text-gray-400">
      --- Or ---
    </p>
  </section>
</template>

<script>
import firebase from "../../utilities/firebase";

export default {
  emits: ["close-login-from-google"],
  methods: {
    loginWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(user => {
          this.close();
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    },
    close() {
      this.$emit("close-login-from-google");
    },
  },
};
</script>

<style></style>
