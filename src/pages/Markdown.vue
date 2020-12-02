<template>
  <div class="w-full h-screen m-auto">
    <h1 class="my-2 text-2xl text-center">
      Markdown
    </h1>
    <section class="flex w-10/12 m-auto h-5/6">
      <article class="w-1/2 border bg-gray-50">
        <textarea
          class="w-full h-full p-2"
          :value="inputText"
          @input="update"
        />
      </article>
      <article
        class="w-1/2 border bg-gray-50"
        v-html="renderedText"
      />
    </section>
  </div>
</template>

<script>
import marked from "marked";
import debounce from "../utilities/mixins/debounce";

export default {
  mixins: [debounce],

  data() {
    return {
      inputText: "",
    };
  },

  computed: {
    renderedText() {
      return marked(this.inputText);
    },
  },

  methods: {
    update(e) {
      return this.debounce(() => {
        this.inputText = e.target.value;
      });
    },
  },
};
</script>

<style></style>
