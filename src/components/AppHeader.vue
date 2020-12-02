<template>
  <nav
    class="w-full px-4 py-2 text-white bg-gradient-to-br from-blue-800 to-blue-600"
  >
    <router-link
      v-for="page in pages"
      :key="page.title"
      :to="page.to"
      class="m-2"
    >
      {{ page.title }}
    </router-link>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      pages: [
        { title: "Home", to: "/" },
        { title: "Super Heroes", to: "/super-heroes" },
        { title: "Calendar", to: "/calendar" },
        { title: "Markdown", to: "/markdown" },
        { title: "Slider", to: "/slider" },
      ],
    };
  },
};
</script>

<style></style>
