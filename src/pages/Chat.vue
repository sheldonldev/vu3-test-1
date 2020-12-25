<template>
  <section class="flex w-full">
    <div class="w-64 m-auto">
      <h1 class="mx-auto my-4 text-2xl text-center">
        Real Time Chat
      </h1>
      <div
        v-for="chat in state.chats"
        :key="chat.message"
        class="px-4 py-2 my-2 border rounded-lg"
        :class="chat.userId === userId ? 'text-right bg-green-300' : ''"
      >
        {{ chat.message }}
      </div>
      <input
        v-model="state.message"
        type="text"
        class="w-full px-2 py-1 mt-8 border border-blue-500 rounded-sm"
        placeholder="Start typing..."
        @keydown.enter="addMessage"
      >
    </div>
  </section>
</template>

<script>
import { onMounted, computed, reactive } from "vue";
import { chatsRef } from "../utilities/firebase";
import { useStore } from "vuex";
export default {
  setup() {
    const state = reactive({
      chats: [],
      message: "",
    });
    const store = useStore();
    const userId = computed(() => store.state.authUser.uid);
    onMounted(async () => {
      chatsRef.on("child_added", (snapshot) => {
        state.chats.push({ key: snapshot.key, ...snapshot.val() });
      });
    });

    const addMessage = () => {
      const newChat = chatsRef.push();
      newChat.set({ userId, message: state.message });
      state.message = "";
    };

    return { state, userId, addMessage };
  },
};
</script>

<style></style>
