<script setup>
import { ref } from "vue";
import Back from "@/components/icons/IconBack.vue";
import Wrong from "./icons/IconWrong.vue";
import Right from "./icons/IconRight.vue";
import Questions from "../utils/Questions.json";

const selectedOption = ref(null);

const selectAnswer = (option) => {
  selectedOption.value = option; // Store selected answer
  console.log("Selected Answer:", option);

  setTimeout(() => {
    if (currentQuestionIndex.value < Questions.length - 1) {
      selectedOption.value = null; // Reset for next question
      currentQuestionIndex.value++;
    } else {
      alert("Quiz completed! 🎉");
    }
  }, 1000); // Delay before moving to next question
};

const correctOption = ref(Questions.answer);
</script>

<template>
  <div class="mx-auto w-11/12 py-5">
    <div
      class="size-10 rounded-full flex justify-center items-center bg-purple-500/50"
    >
      <Back width="26" height="26" />
    </div>
    <div
      class="w-full h-14 bg-purple-900 rounded-md flex justify-between items-center text-zinc-100 px-5 mt-8 mb-5"
    >
      <p class="font-semibold">Goal: 30 points</p>
      <p>Current Points: 30</p>
    </div>
    <div v-if="Questions.length > 0">
      <p class="font-semibold">
        Question {{ currentQuestionIndex + 1 }} / {{ Questions.length }}
      </p>
      <p>{{ Questions[currentQuestionIndex].question }}</p>
      <div class="flex flex-col gap-4 mt-3">
        <div
          v-for="(option, index) in Questions[currentQuestionIndex].options"
          :key="index"
          @click="selectAnswer(option)"
          :class="['w-full h-12 rounded-md flex items-center gap-4 px-5 cursor-pointer hover:bg-zinc-300 transition', selectedOption &&
              option === Questions[currentQuestionIndex].answer ? option === Questions[currentQuestionIndex].answer
      ? 'border-green-500 bg-green-700/50'
      : 'border-red-500 bg-red-700/50'
    : 'border-gray-500' "]"
        >
          <p class="font-bold">{{ String.fromCharCode(65 + index) }}.</p>
          <p class="font-semibold">{{ option }}</p>
          <Right
            v-if="
              selectedOption &&
              option === Questions[currentQuestionIndex].answer
            "
          />
          <Wrong
            v-if="
              selectedOption &&
              option !== Questions[currentQuestionIndex].answer
            "
          />
        </div>
        <!-- <div
          class="w-full h-14 rounded-md flex justify-between items-center gap-4 px-5 bg-red-500/30 border-red-500 border-2"
        >
          <div class="flex gap-4 items-center">
            <p class="font-bold">A.</p>
            <p class="font-semibold">Lorem</p>
          </div>
          <Wrong />
        </div>
        <div
          class="w-full h-14 rounded-md flex justify-between items-center gap-4 px-5 bg-green-500/30 border-green-500 border-2"
        >
          <div class="flex gap-4 items-center">
            <p class="font-bold">A.</p>
            <p class="font-semibold">Lorem</p>
          </div>
          <Right width="16" height="16" />
        </div>
        <div class="w-full border h-12 rounded-md flex items-center gap-4 px-5">
          <p class="font-bold">A.</p>
          <p class="font-semibold">Lorem</p>
        </div> -->
      </div>
    </div>
  </div>
</template>
