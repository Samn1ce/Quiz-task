<script setup>
import { ref } from "vue";
import QuestionScreen from "@/components/QuestionScreen.vue";
import MatchingGame from "@/components/MatchingGame.vue";

const step = ref(1);

const updateStep = (newStep) => {
  step.value = newStep; // ✅ Update step correctly when emitted
};
</script>

<template>
  <div class="h-screen mx-auto bg-zinc-100">
    <QuestionScreen v-if="step === 1" :step="step" @update:step="updateStep" />
    <MatchingGame v-if="step === 2" :step="step" @update:step="updateStep" />
  </div>
</template>
