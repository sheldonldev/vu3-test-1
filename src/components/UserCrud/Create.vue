<template>
  <button
    class="px-2 py-1 mb-2 border rounded shadow hover:bg-blue-300 hover:text-white"
    @click="isModalOpen = true"
  >
    Add User
  </button>
  <teleport to="body">
    <Modal v-if="isModalOpen" @close-modal="isModalOpen = false">
      <template #title>Add New User</template>
      <template #body>
        <form @submit.prevent="submit" class="px-4 py-2">
          <div>
            <label for="user-name">Name</label>
            <input
              name="user-name"
              class="w-full px-2 py-1 my-2 border rounded"
              type="text"
              placeholder="User Name"
              v-model="state.form.name"
            />
          </div>
          <div>
            <label for="email">Email</label>
            <input
              name="email"
              class="w-full px-2 py-1 my-2 border rounded"
              type="email"
              placeholder="User Email"
              v-model="state.form.email"
            />
          </div>
          <div>
            <label for="avatar-url">Avatar</label>
            <input
              name="avatar-url"
              class="w-full px-2 py-1 my-2 border rounded"
              type="text"
              placeholder="Avatar Url"
              v-model="state.form.avatarUrl"
            />
          </div>
          <div>
            <input
              name="submit"
              class="w-full px-2 py-1 my-2 bg-blue-300 border rounded shadow hover:bg-blue-500 hover:text-white"
              type="submit"
              value="Create"
            />
          </div>
        </form>
      </template>
    </Modal>
  </teleport>
</template>

<script>
import { reactive, ref } from "vue";
import Modal from "../Modal";
import axios from "../../plugins/axios";
export default {
  components: { Modal },
  setup(_, { emit }) {
    const isModalOpen = ref(false);
    const state = reactive({
      form: {
        name: "",
        email: "",
        avatarUrl: "",
      },
    });
    const submit = async () => {
      const { data } = await axios.post("/users", state.form);
      emit("newUserAdded", data);
      state.form = {};
      isModalOpen.value = false;
    };
    return { submit, state, isModalOpen };
  },
};
</script>

<style></style>
