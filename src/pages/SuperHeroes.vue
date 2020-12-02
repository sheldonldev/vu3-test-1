<template>
  <div class="m-auto">
    <h1 class="text-3xl text-center">
      Super Heroes {{ heroesCount }}
    </h1>
    <ul class="mt-2">
      <li
        v-for="(hero, index) in superHeroes"
        :key="hero.name"
        class="flex justify-between"
      >
        <div>{{ hero.name }}</div>
        <button @click="remove(index)">
          x
        </button>
      </li>
    </ul>
    <form
      class="mt-8"
      @submit.prevent="addNewHero"
    >
      <input
        v-model.trim.lazy.number="newHero"
        class="px-2 mr-2 border rounded"
        placeholder="Enter new hero"
      >
      <button
        class="px-2 text-white border rounded bg-gradient-to-br from-red-700 to-pink-300"
        type="submit"
      >
        Add
      </button>
    </form>
  </div>
</template>

<script>
export default {

  data() {
    return {
      newHero: "",

      superHeroes: [
        { name: "Super Girl" },
        { name: "Batman" },
        { name: "Super Man" },
      ],
    };
  },

  computed: {
    heroesCount() {
      return this.superHeroes.length;
    },
  },
  methods: {
    addNewHero() {
      if (this.newHero) {
        this.superHeroes.unshift({ name: this.newHero });
        this.newHero = "";
      }
    },

    remove(index) {
      this.superHeroes = this.superHeroes.filter((hero, i) => i != index);
    },
  },
};
</script>

<style></style>
