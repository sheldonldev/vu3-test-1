<template>
  <section class="flex w-full">
    <div class="m-auto">
      <h1 class="text-2xl text-center">
        Calculator
      </h1>
      <p
        class="w-64 p-2 mt-10 mb-2 overflow-scroll text-right border rounded shadow"
      >
        <span class="block h-10 text-3xl">
          {{ currNumber }}
        </span>
        <span class="block h-5 text-sm">
          <span v-if="selectedOperator !== '='">
            {{ prevNumber }}&nbsp;{{ selectedOperator }}
            <span
              v-if="!operators.includes(currNumber)"
            >&nbsp;{{ currNumber }}</span>
          </span>
        </span>
      </p>
      <div class="w-64 grid grid-cols-4 gap-2">
        <button
          class="py-2 text-2xl bg-blue-200 border rounded shadow"
          @click="pressed('1')"
        >
          1
        </button>
        <button
          class="py-2 text-2xl bg-blue-200 border rounded shadow"
          @click="pressed('2')"
        >
          2
        </button>
        <button
          class="py-2 text-2xl bg-blue-200 border rounded shadow"
          @click="pressed('3')"
        >
          3
        </button>
        <button
          class="py-2 text-2xl bg-purple-200 border rounded shadow"
          @click="pressed('+')"
        >
          +
        </button>
        <button
          class="py-2 text-2xl bg-blue-200 border rounded shadow"
          @click="pressed('4')"
        >
          4
        </button>
        <button
          class="py-2 text-2xl bg-blue-200 border rounded shadow"
          @click="pressed('5')"
        >
          5
        </button>
        <button
          class="py-2 text-2xl bg-blue-200 border rounded shadow"
          @click="pressed('6')"
        >
          6
        </button>
        <button
          class="py-2 text-2xl bg-purple-200 border rounded shadow"
          @click="pressed('-')"
        >
          -
        </button>
        <button
          class="py-2 text-2xl bg-blue-200 border rounded shadow"
          @click="pressed('7')"
        >
          7
        </button>
        <button
          class="py-2 text-2xl bg-blue-200 border rounded shadow"
          @click="pressed('8')"
        >
          8
        </button>
        <button
          class="py-2 text-2xl bg-blue-200 border rounded shadow"
          @click="pressed('9')"
        >
          9
        </button>
        <button
          class="py-2 text-2xl bg-purple-200 border rounded shadow"
          @click="pressed('*')"
        >
          *
        </button>
        <button
          class="py-2 text-2xl bg-blue-200 border rounded shadow col-span-2"
          @click="pressed('0')"
        >
          0
        </button>
        <button
          class="py-2 text-2xl bg-blue-200 border rounded shadow"
          @click="pressed('.')"
        >
          .
        </button>
        <button
          class="py-2 text-2xl bg-purple-200 border rounded shadow"
          @click="pressed('/')"
        >
          /
        </button>
        <button
          class="py-2 text-2xl bg-green-100 border rounded shadow col-span-2"
          @click="pressed('=')"
        >
          =
        </button>
        <button
          class="py-2 text-2xl bg-yellow-100 border rounded shadow"
          @click="pressed('d')"
        >
          Del
        </button>
        <button
          class="py-2 text-2xl bg-red-100 border rounded shadow"
          @click="pressed('c')"
        >
          C
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import useWindowEvent from "../utilities/composition/useWindowEvent";
export default {
  setup() {
    const operators = ["+", "-", "*", "/"];
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
    const valid_input = ["=", "d", "c", ...operators, ...numbers];
    const currNumber = ref("");
    const prevNumber = ref("");
    const selectedOperator = ref("");

    const pressed = (value) => {
      if (valid_input.includes(value)) {
        if (value == "=") {
          result();
        } else if (operators.includes(value)) {
          operate(value);
        } else if (value == "c") {
          clear();
        } else if (value == "d") {
          dropDigit();
        } else {
          appendDigit(value);
        }
      }
    };

    const result = () => {
      if (prevNumber.value === "") {
        prevNumber.value = 0;
      } else {
        currNumber.value = calculate(
          prevNumber.value,
          currNumber.value,
          selectedOperator.value
        );
      }

      selectedOperator.value = "=";
      prevNumber.value = currNumber.value;
    };

    const operate = (value) => {
      if (prevNumber.value === "") {
        prevNumber.value = currNumber.value;
      } else {
        currNumber.value = calculate(
          prevNumber.value,
          currNumber.value,
          selectedOperator.value
        );
      }

      selectedOperator.value = value;
      currNumber.value = selectedOperator.value;
    };

    const clear = () => {
      prevNumber.value = "";
      currNumber.value = "";
      selectedOperator.value = "";
    };

    const dropDigit = () => {
      currNumber.value = currNumber.value.substr(
        0,
        currNumber.value.length - 1
      );
    };

    const appendDigit = (value) => {
      if (
        operators.includes(currNumber.value) ||
        typeof currNumber.value === "number"
      ) {
        currNumber.value = "";
      }
      if (selectedOperator.value === "=") {
        prevNumber.value = "";
      }
      currNumber.value = currNumber.value + value;
    };

    const calculate = (num1, num2, operator) => {
      if (operator === "+") {
        return parseFloat(num1) + parseFloat(num2);
      } else if (operator === "-") {
        return parseFloat(num1) - parseFloat(num2);
      } else if (operator === "*") {
        return parseFloat(num1) * parseFloat(num2);
      } else if (operator === "/") {
        return parseFloat(num1) / parseFloat(num2);
      }
    };

    const handleKeydown = (e) => {
      let value = "";
      switch (e.key) {
        case "Enter":
          value = "=";
          break;
        case "Backspace":
          value = "d";
          break;
        default:
          value = e.key;
          break;
      }
      pressed(value);
    };

    useWindowEvent("keydown", handleKeydown);

    return {
      operators,
      pressed,
      currNumber,
      prevNumber,
      selectedOperator,
    };
  },
};
</script>

<style></style>
