<script setup>
import IconRepeat from "@/components/icons/IconRepeat.vue";
import Navigations from "@/components/Navigations.vue";
import MatchQuestions from "@/utils/MatchQuestions.json";

// defineProps({
//   step: Number,
// });
// const emit = defineEmits(["update:step"]);

// const prevStep = () => {
//   if (step > 1) {
//     emit("update:step", step - 1); // Correct way to emit and update step
//   }
// };

const emit = defineEmits(["update:step"]);

const handleBack = () => {
  // Go back to previous step (Quiz)
  emit("update:step", 1);
};
</script>

<template>
  <div class="max-w-sm w-11/12 mx-auto bg-zinc-100">
    <Navigations @prevStep="prevStep" />
    <div class="w-full">
      <p class="text-xl font-bold text-center">Match the Boxes</p>
      <div class="grid grid-cols-2 gap-4 pb-2">
        <div
          v-for="question in MatchQuestions"
          :key="question.id"
          class="w-full h-20 rounded-md bg-zinc-300 text-zinc-400 flex justify-center items-center text-center p-2 text-sm"
        >
          {{ question.question }}
        </div>
        <!-- <div
          class="w-full h-20 rounded-md bg-zinc-300 text-zinc-400 flex justify-center items-center"
        >
          Drag & Drop
        </div>
        <div
          class="w-full h-20 rounded-md bg-zinc-300 text-zinc-400 flex justify-center items-center"
        >
          Drag & Drop
        </div>
        <div
          class="w-full h-20 rounded-md bg-zinc-300 text-zinc-400 flex justify-center items-center"
        >
          Drag & Drop
        </div>
        <div
          class="w-1/2 col-span-2 h-20 rounded-md bg-zinc-300 place-self-center text-zinc-400 flex justify-center items-center"
        >
          Drag & Drop
        </div> -->
      </div>
    </div>
  </div>
  <div class="bg-white w-full rounded-t-2xl max-w-sm mx-auto">
    <div class="w-11/12 mx-auto flex flex-col gap-2">
      <p class="text-zinc-800 text-center font-bold pt-2">
        Drag the Correct box to match the Question
      </p>
      <div class="grid grid-cols-3 gap-4">
        <div
          class="w-full h-20 rounded-md bg-zinc-300 text-zinc-400 flex justify-center items-center"
        >
          Drag & Drop
        </div>
        <div
          class="w-full h-20 rounded-md bg-zinc-300 text-zinc-400 flex justify-center items-center"
        >
          Drag & Drop
        </div>
        <div
          class="w-full h-20 rounded-md bg-zinc-300 text-zinc-400 flex justify-center items-center"
        >
          Drag & Drop
        </div>
        <div
          class="w-full place-self-center h-20 rounded-md bg-zinc-300 text-zinc-400 flex justify-center items-center"
        >
          Drag & Drop
        </div>
        <div
          class="w-full h-20 rounded-md bg-zinc-300 place-self-center text-zinc-400 flex justify-center items-center"
        >
          Drag & Drop
        </div>
      </div>
      <div class="mt-2 flex justify-center items-center gap-4">
        <button class="border p-2 rounded-xl">
          <IconRepeat width="30" height="30" />
        </button>
        <button
          class="bg-purple-800 p-3 w-60 rounded-2xl text-zinc-200 font-semibold"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>
