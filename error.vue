<script setup lang="ts">
import { ButtonVariant } from '~/types'
import AppButton from '~/storyblok/AppButton.vue'

defineProps<{
  error: {
    statusCode: number,
    statusMessage: string
  }
}>()

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="text-center mt-28 text-beige-200">
    <h1 class="text-xl">
      {{ error.statusMessage }}
    </h1>

    <AppButton
      :variant="ButtonVariant.Large"
      type-button
      class="mt-8 cursor-pointer"
      @click="handleError"
    >
      Navigate home
    </AppButton>
  </div>
</template>
