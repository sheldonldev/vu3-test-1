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
        ref="addNewHeroRef"
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
import { computed, onMounted, ref } from "vue";

export default {
  setup() {
    const addNewHeroRef = ref("");
    onMounted(() => {
      addNewHeroRef.value.focus();
    });
    const newHero = ref("");
    const superHeroes = ref([
      { name: "Super Girl" },
      { name: "Batman" },
      { name: "Super Man" },
    ]);
    const heroesCount = computed(() => {
      get: () => superHeroes.value.length;
    });
    const remove = index => {
      superHeroes.value = superHeroes.value.filter((hero, i) => i != index);
    };
    const addNewHero = () => {
      if (newHero.value) {
        superHeroes.value.unshift({ name: newHero.value });
        newHero.value = "";
      }
    };
    return {
      superHeroes,
      newHero,
      heroesCount,
      remove,
      addNewHero,
      addNewHeroRef,
    };
  },
};
</script>

<style></style>
