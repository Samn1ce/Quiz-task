<script setup>
import { ref } from "vue";
import MatchView from "@/components/MatchView.vue";
import QuestionScreen from "@/components/QuestionScreen.vue";

const step = ref(1);
</script>

<template>
  <div class="max-w-sm h-screen mx-auto bg-zinc-100">
    <QuestionScreen v-if="step === 1" />
    <MatchView v-if="step === 2" />
  </div>
</template>
