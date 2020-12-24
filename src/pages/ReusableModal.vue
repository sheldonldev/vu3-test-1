<template>
  <section class="flex w-full">
    <div class="w-full m-auto">
      <h1 class="text-2xl text-center">Reusable Modal</h1>
      <Modal v-if="isRedModalOpen" @close-modal="isRedModalOpen = false">
        <template #title> Modal 1 </template>
        <template #body> body </template>
      </Modal>
      <Modal v-if="isBlueModalOpen" @close-modal="isBlueModalOpen = false">
        <template #title> Modal 2 </template>
        <template #body> body </template>
      </Modal>
      <button
        class="block px-4 py-2 m-auto mt-4 border rounded shadow"
        @click="isRedModalOpen = true"
      >
        Red Modal
      </button>
      <button
        class="block px-4 py-2 m-auto mt-4 border rounded shadow"
        @click="isBlueModalOpen = true"
      >
        Blue Modal
      </button>
    </div>
  </section>
</template>

<script>
import Modal from "../components/Modal.vue";
import { ref } from "vue";
export default {
  components: { Modal },
  setup() {
    const isRedModalOpen = ref(false);
    const isBlueModalOpen = ref(false);
    return {
      isRedModalOpen,
      isBlueModalOpen,
    };
  },
};
</script>

<style></style>
