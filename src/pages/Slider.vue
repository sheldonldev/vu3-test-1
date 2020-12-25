<template>
  <div class="flex flex-wrap w-full h-full">
    <div
      v-for="(slide, index) in slides"
      :key="index"
      class="absolute w-full overflow-hidden"
    >
      <transition name="fade">
        <div
          v-if="currentSlide == index"
          :class="slide.color"
          style="height: 80vh"
        >
          {{ slide.text }}
        </div>
      </transition>
    </div>
    <div
      class="absolute w-full"
      style="height: 75vh"
    >
      <div class="absolute bottom-0 flex justify-center w-full">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          :class="index == currentSlide ? 'bg-gray-700' : 'bg-gray-300'"
          class="w-4 h-4 mx-2 rounded-full shadow cursor-pointer"
          @click="changeSlide(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      slides: [
        {
          color: "bg-pink-300",
          text: "slide 1",
        },
        {
          color: "bg-blue-600",
          text: "slide 2",
        },
        {
          color: "bg-purple-600",
          text: "slide 3",
        },
        {
          color: "bg-gray-600",
          text: "slide 4",
        },
      ],
      interval: "",
      isTitleShowing: true,
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      this.currentSlide == 3 ? (this.currentSlide = 0) : this.currentSlide++;
    }, 2000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    changeSlide(index) {
      clearInterval(this.interval);
      this.currentSlide = index;
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
