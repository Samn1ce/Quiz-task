<script setup>
import { ref } from "vue";
import { useDraggable } from "@vueuse/core";
import IconRepeat from "@/components/icons/IconRepeat.vue";
import Navigations from "@/components/Navigations.vue";
import MatchQuestions from "@/utils/MatchQuestions.json";

const emit = defineEmits(["update:step"]);

// State to track dropped answers
const droppedAnswers = ref({}); // { questionId: { id, answer } }
const showResults = ref(false);

// Assign unique IDs to answers and shuffle
const answers = ref(
  [...MatchQuestions.map((q, index) => ({ id: index, answer: q.answer }))].sort(
    () => Math.random() - 0.5
  )
);

// Track currently dragged item
const draggedItem = ref(null);
const draggedFromQuestion = ref(null); // Track where the answer came from

// Setup draggable items
const draggableItems = ref([...answers.value]);

// Handle drag start
const onDragStart = (answer, questionId = null) => {
  if (showResults.value) return;
  draggedItem.value = answer;
  draggedFromQuestion.value = questionId;
};

// Handle drop
const onDrop = (question) => {
  if (draggedItem.value) {
    // Remove it from the previous question (if any)
    if (draggedFromQuestion.value !== null) {
      answers.value.push(droppedAnswers.value[draggedFromQuestion.value]); // Return previous answer to pool
      delete droppedAnswers.value[draggedFromQuestion.value];
    }

    // Assign new answer to question
    droppedAnswers.value[question.id] = draggedItem.value;

    // Remove it from available answers
    answers.value = answers.value.filter((a) => a.id !== draggedItem.value.id);

    draggedItem.value = null;
    draggedFromQuestion.value = null;
  }
};

// Handle "Continue" button click
const checkAnswers = () => {
  showResults.value = true;
};

// Reset Game
const resetGame = () => {
  droppedAnswers.value = {};
  showResults.value = false;

  // Restore all answers with IDs
  answers.value = [
    ...MatchQuestions.map((q, index) => ({ id: index, answer: q.answer })),
  ].sort(() => Math.random() - 0.5);

  draggableItems.value = [...answers.value];
};
</script>

<template>
  <div class="flex flex-col">
    <div class="max-w-sm w-11/12 mx-auto bg-zinc-100">
      <Navigations @prevStep="handleBack" />
      <div class="w-full">
        <p class="text-xl font-bold text-center">Match the Boxes</p>
        <div class="grid grid-cols-2 gap-4 pb-2">
          <div
            v-for="question in MatchQuestions"
            :key="question.id"
            class="w-full h-20 rounded-md flex justify-center items-center text-center p-2 text-sm transition-all border border-zinc-400 cursor-pointer"
            :class="{
              'bg-green-300':
                showResults &&
                droppedAnswers[question.id]?.answer === question.answer,
              'bg-red-300':
                showResults &&
                droppedAnswers[question.id]?.answer !== question.answer,
              'bg-zinc-900 text-zinc-200':
                !showResults && droppedAnswers[question.id],
              'bg-zinc-300': !showResults,
            }"
            :draggable="!showResults"
            @dragstart="
              showResults
                ? null
                : onDragStart(droppedAnswers[question.id], question.id)
            "
            @dragover.prevent
            @drop="onDrop(question)"
          >
            {{ droppedAnswers[question.id]?.answer || question.question }}
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white w-full flex-grow rounded-t-2xl mx-auto">
      <div class="max-w-sm w-11/12 mx-auto flex flex-col justify-between gap-2">
        <p class="text-zinc-800 text-center font-bold pt-2">
          Drag the Correct box to match the Question
        </p>

        <div class="grid grid-cols-3 gap-4 relative z-20">
          <div
            v-for="item in answers"
            :key="item.id"
            class="w-full h-20 rounded-md bg-zinc-900 text-zinc-400 flex justify-center items-center cursor-grab transition-all p-2 text-center"
            draggable="true"
            @dragstart="onDragStart(item)"
          >
            {{ item.answer }}
          </div>
        </div>
        <div class="mt-2 flex justify-center items-center gap-4">
          <button class="border p-2 rounded-xl" @click="resetGame">
            <IconRepeat width="30" height="30" />
          </button>
          <button
            class="bg-purple-800 p-3 w-60 rounded-2xl text-zinc-200 font-semibold"
            @click="checkAnswers"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
