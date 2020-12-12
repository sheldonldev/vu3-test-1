<template>
  <form class="py-2" @submit.prevent="submit">
    <div class="my-4">
      <input
        ref="emailInputRef"
        v-model.lazy="form.email"
        class="w-full p-2 rounded shadow"
        placeholder="Email"
        type="text"
      />
    </div>
    <div class="my-4">
      <input
        v-model.lazy="form.password"
        class="w-full p-2 rounded shadow"
        placeholder="Password"
        type="password"
      />
    </div>
    <button
      type="submit"
      class="w-full py-2 my-4 text-white bg-purple-700 border rounded shadow"
    >
      <span v-if="!isLoading">Login</span>
      <span v-else>⌛ Loading...</span>
    </button>
  </form>
</template>

<script>
import firebase from "../../utilities/firebase";

export default {
  emits: ["close-login-from-form"],
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      isLoading: false,
    };
  },
  mounted() {
    this.$refs.emailInputRef.focus();
  },
  methods: {
    submit() {
      this.isLoading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then((user) => {
          this.isLoading = false;
          this.form.email = "";
          this.form.password = "";
          this.close();
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          this.isLoading = false;
          this.form.email = "";
          this.form.password = "";
        });
    },
    close() {
      this.$emit("close-login-from-form");
    },
  },
};
</script>

<style></style>
