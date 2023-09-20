<script setup lang="ts">
const showCard = ref(false)
const cardHovered = ref(false)
let timeout: ReturnType<typeof setTimeout>
const hoveredElem = ref<HTMLElement | null>(null)
const popupElem = ref<HTMLElement | null>(null)
const positionBottom = ref(false)
const popupHeight = ref(0)

function onMouseEnter() {
  if (showCard.value) return clearTimeout(timeout)
  setPopupPosition()
  timeout = setTimeout(() => {
    showCard.value = true
  }, 500)
}

function onMouseLeave() {
  if (!showCard.value) return clearTimeout(timeout)
  timeout = setTimeout(() => {
    showCard.value = false
  }, 500)
}

function onCardMouseEnter() {
  cardHovered.value = true
  clearTimeout(timeout)
}

function onCardMouseLeave() {
  cardHovered.value = false
  timeout = setTimeout(() => {
    showCard.value = false
  }, 500)
}

onMounted(async () => {
  await calcPopupHeight()
})

async function calcPopupHeight() {
  if (!popupElem.value) return

  popupElem.value.style.opacity = '0'
  popupElem.value.style.visibility = 'hidden'
  showCard.value = true
  await nextTick()
  popupHeight.value = popupElem.value.offsetHeight
  showCard.value = false
  popupElem.value.style.opacity = ''
  popupElem.value.style.visibility = ''
}

function setPopupPosition() {
  if (!hoveredElem.value) return

  // get the position and dimensions of the hovered element
  const hoveredRect = hoveredElem.value.getBoundingClientRect()
  // calculate the top position of the popup element
  const popupTop = hoveredRect.top - popupHeight.value

  // check if the popup will be above the viewport
  positionBottom.value = popupTop < 0
}

watch(showCard, (newValue) => {
  if (!newValue) clearTimeout(timeout)
})
</script>

<template>
  <div class="relative">
    <Transition name="fade">
      <div
        v-show="showCard"
        ref="popupElem"
        :class="['absolute left-1/2 -translate-x-1/2 z-50 shadow-2xl rounded-lg w-[400px]', positionBottom ? 'top-full' : 'bottom-full']"
        @mouseenter="onCardMouseEnter"
        @mouseleave="onCardMouseLeave"
      >
        <slot name="popup" />
      </div>
    </Transition>

    <div
      ref="hoveredElem"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <slot name="hover" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translate(-50%, 16px) scale(.95);
}

.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 16px) scale(.95);
  transform-origin: center;
}
</style>
