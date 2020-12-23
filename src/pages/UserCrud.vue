<template>
  <section class="flex w-full">
    <div class="mx-auto">
      <h1 class="my-4 text-2xl text-center">User CRUD</h1>
      <div class="flex justify-end">
        <Create @newUserAdded="addUser" />
      </div>
      <table>
        <thead>
          <tr>
            <th class="px-4 py-2 border">ID</th>
            <th class="px-4 py-2 border">Avatar</th>
            <th class="px-4 py-2 border">Name</th>
            <th class="px-4 py-2 border">Email</th>
            <th class="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in state.users" :key="user.id">
            <td class="px-4 py-2 border">{{ user._id }}</td>
            <td class="px-4 py-2 border">
              <img
                :src="user.avatarUrl"
                :alt="user.name"
                class="rounded-full"
                width="50"
              />
            </td>
            <td class="px-4 py-2 border">{{ user.name }}</td>
            <td class="px-4 py-2 border">{{ user.email }}</td>
            <td class="px-4 py-2 border">
              <button
                @click="destroy(user._id)"
                class="px-2 py-1 text-white bg-red-500 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-between mt-2">
        <button
          class="px-2 py-1 rounded"
          @click="prev"
          :disabled="state.users.page == 1"
          :class="
            state.users.page == 1
              ? 'bg-gray-300 text-white'
              : 'hover:text-white hover:bg-blue-400 shadow'
          "
        >
          Prev
        </button>
        <button
          class="px-2 py-1 rounded"
          @click="next"
          :disabled="state.users.page == state.users.total_pages"
          :class="
            state.users.page == state.users.total_pages
              ? 'bg-gray-300 text-white'
              : 'hover:text-white hover:bg-blue-400 shadow'
          "
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, reactive } from "vue";
import axios from "../plugins/axios";
import Create from "../components/UserCrud/Create";
export default {
  components: { Create },
  setup() {
    const state = reactive({
      users: [],
      page: 1,
    });
    onMounted(async () => {
      const { data } = await axios.get(`/users`);
      state.users = data;
    });
    const next = async () => {
      state.page += 1;
      const { data } = await axios.get(`/users?page=${state.page}`);
      state.users = data;
    };
    const prev = async () => {
      state.page -= 1;
      const { data } = await axios.get(`/users?page=${state.page}`);
      state.users = data;
    };
    const addUser = (data) => {
      state.users.push(data);
    };
    const destroy = async (id) => {
      await axios.delete(`/users/${id}`);
      state.users = state.users.filter((user) => user._id !== id);
    };
    return { state, next, prev, addUser, destroy };
  },
};
</script>

<style></style>
