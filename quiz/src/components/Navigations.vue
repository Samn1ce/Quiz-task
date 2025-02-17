<script setup>
import Back from "./icons/IconBack.vue";
import Right from "./icons/IconRight.vue";

defineProps({
  step: Number,
  prevStep: Function,
});
</script>

<template>
  <div class="flex justify-between items-center py-5 mx-auto">
    <div
      @click="prevStep"
      class="size-8 rounded-md border flex justify-center items-center cursor-pointer"
    >
      <Back width="20" height="20" fill="#59168b" />
    </div>
    <h1 class="font-bold">Course Preview</h1>
    <div class="size-8 rounded-md border flex justify-center items-center">
      <Right width="16" height="16" />
    </div>
  </div>
</template>
