<template>

    <div class="m-auto">
      <h1 class="text-3xl text-center">Super Heroes {{ heroesCount }}</h1>
      <ul class="mt-2">
        <li class="flex justify-between" v-for="(hero, index) in superHeroes" :key="hero.name">
          <div>{{ hero.name }}</div>
          <button @click="remove(index)">x</button>
        </li>
      </ul>
      <form class="mt-8" @submit.prevent="addNewHero">
        <input class="px-2 mr-2 border rounded" v-model.trim.lazy.number="newHero" placeholder="Enter new hero">
        <button class="px-2 text-white border rounded bg-gradient-to-br from-red-700 to-pink-300" type="submit">Add</button>
      </form>
    </div>

</template>

<script>

export default {

  methods: {

    addNewHero() {
      if (this.newHero) {
        this.superHeroes.unshift(
          { name: this.newHero }
        );
        this.newHero = "";
      }
    },

    remove(index) {
      this.superHeroes = this.superHeroes.filter((hero, i) => i != index);
    }

  },

  computed: {

    heroesCount() {
      return this.superHeroes.length;
    },

  },

  data() {
    return {

      newHero: "",

      superHeroes: [
        { name : 'Super Girl' },
        { name : 'Batman' },
        { name : 'Super Man' },
      ],

    };
  },

}
</script>

<style>

</style>
