<template>
  <section
    class="fixed top-0 z-20 w-screen h-screen bg-gray-500 opacity-50"
    @click="closeModal()"
  />
  <div class="absolute inset-0">
    <div class="flex h-full">
      <div class="z-30 w-1/3 p-4 m-auto bg-white rounded shadow">
        <h1 class="m-auto text-center">
          <slot name="title" />
        </h1>
        <main>
          <slot name="body" />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["close-modal"],
  setup(_, { emit }) {
    const closeModal = () => {
      emit("close-modal");
    };
    return {
      closeModal,
    };
  },
};
</script>

<style></style>
