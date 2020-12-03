<template>
  <div class="m-auto">
    <h1 class="my-2 text-2xl text-center">
      Vue Calendar
    </h1>
    <section class="flex justify-between mx-4">
      <h2 class="mx-2 font-bold">
        {{ monthName }}
      </h2>
      <h2 class="font-bold">
        {{ currentYear }}
      </h2>
    </section>
    <section class="flex">
      <p
        v-for="day in days"
        :key="day"
        class="my-2 text-center"
        style="width:14.28%"
      >
        {{ day }}
      </p>
    </section>
    <section
      class="flex flex-wrap"
      style="height: 10em; width: 24em;"
    >
      <p
        v-for="(blank, index) in startDay"
        :key="index"
        class="text-center"
        style="width:14.28%"
      />
      <p
        v-for="date in daysInMonth"
        :key="date"
        class="text-center"
        style="width:14.28%"
        :class="
          isThisMonth && date === today.getDate()
            ? 'text-red-500 bg-blue-50'
            : ''
        "
      >
        {{ date }}
      </p>
    </section>
    <section class="flex justify-between my-4">
      <button @click="prev()">
        &lt; Prev
      </button>
      <button @click="next()">
        Next &gt;
      </button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      today: new Date(),
    };
  },

  computed: {
    daysInMonth() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    },
    startDay() {
      return new Date(this.currentYear, this.currentMonth, 1).getDay();
    },
    monthName() {
      return new Date(
        this.currentYear,
        this.currentMonth,
      ).toLocaleString("default", { month: "long" });
    },
    isThisMonth() {
      return this.currentYear === this.today.getFullYear() &&
        this.currentMonth === this.today.getMonth()
        ? true
        : false;
    },
  },
  methods: {
    prev() {
      if (this.currentMonth == 0) {
        this.currentYear--;
        this.currentMonth = 11;
      } else {
        this.currentMonth--;
      }
    },
    next() {
      if (this.currentMonth == 11) {
        this.currentYear++;
        this.currentMonth = 0;
      } else {
        this.currentMonth++;
      }
    },
  },
};
</script>

<style></style>
