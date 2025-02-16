<script setup>
import { ref } from "vue";
import Back from "@/components/icons/IconBack.vue";
import Wrong from "./icons/IconWrong.vue";
import Right from "./icons/IconRight.vue";
import Questions from "../utils/Questions.json";

defineProps({
  step: Number, // Receive `step` as a prop
});
const emit = defineEmits(["update:step"]); // Define event emitter

const nextStep = () => {
  emit("update:step", 2); // Update `step` to 2 in the parent
};

const selectedOption = ref(null);
const currentQuestionIndex = ref(0);

const selectAnswer = (option) => {
  selectedOption.value = option; // Store selected answer
  console.log("Selected Answer:", option);

  setTimeout(() => {
    if (currentQuestionIndex.value < Questions.length - 1) {
      selectedOption.value = null; // Reset for next question
      currentQuestionIndex.value++;
    } else {
      alert("Quiz completed! 🎉");
      nextStep();
    }
  }, 1000); // Delay before moving to next question
};
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
          :class="[
            'w-full h-12 rounded-md flex justify-between items-center gap-4 px-5 cursor-pointer hover:bg-zinc-300 transition border-2',
            selectedOption
              ? option === Questions[currentQuestionIndex].answer
                ? 'border-green-500 bg-green-700/50' // ✅ Correct: Green border
                : selectedOption === option
                ? 'border-red-500 bg-red-700/50' // ❌ Only selected wrong answer turns red
                : 'border-gray-500' // 🟡 Other options stay gray
              : 'border-gray-500', // Default state
          ]"
        >
          <div class="flex gap-4">
            <p class="font-bold">{{ String.fromCharCode(65 + index) }}.</p>
            <p class="font-semibold">{{ option }}</p>
          </div>
          <Right
            width="20"
            height="20"
            v-if="
              selectedOption &&
              option === Questions[currentQuestionIndex].answer
            "
          />
          <Wrong
            width="20"
            height="20"
            v-if="
              selectedOption === option && // ⬅️ Only show for selected option
              option !== Questions[currentQuestionIndex].answer
            "
          />
        </div>
        <div
          v-if="
            selectedOption &&
            selectedOption !== Questions[currentQuestionIndex].answer
          "
          class="flex gap-4 border border-red-500 bg-red-700/50 rounded-md p-5 text-red-900"
        >
          <Wrong width="20" height="20" />
          <div>
            <p class="font-bold">Think again!</p>
            <p class="text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing.
            </p>
          </div>
        </div>
        <div
          v-if="
            selectedOption &&
            selectedOption === Questions[currentQuestionIndex].answer
          "
          class="flex gap-4 border border-green-500 bg-green-700/50 rounded-md p-5 text-green-900"
        >
          <Right width="20" height="20" />
          <div>
            <p class="font-bold">Right!</p>
            <p class="text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
