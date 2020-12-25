<template>
  <section
    class="fixed top-0 z-20 w-screen h-screen bg-gray-500 opacity-50"
    @click="close()"
  />
  <div class="absolute inset-0">
    <div class="flex h-full">
      <div class="z-30 w-1/3 p-4 m-auto bg-white rounded shadow">
        <h1 class="my-4 text-2xl text-center">
          Login
        </h1>
        <GoogleLogin @close-login-from-google="close()" />
        <FormLogin @close-login-from-form="close()" />
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from "./login/GoogleLogin";
import FormLogin from "./login/FormLogin";

export default {
  components: {
    GoogleLogin,
    FormLogin,
  },
  emits: ["close-login-modal"],
  methods: {
    close() {
      this.$emit("close-login-modal");
    },
  },
};
</script>

<style></style>
