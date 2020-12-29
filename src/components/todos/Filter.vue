<template>
  <p class="filters">
      <span
        v-for="item in items"
        :key="item.value"
        @click="$emit('update:modelValue', item.value)"
        :class="{ selected: modelValue === item.value }"
      >{{ item.label }}</span>
    </p>
</template>

<script>
export default {
  props: ['items', 'modelValue'],
  emits: ['update:modelValue']
}
</script>

<style>
.filters > span {
  padding: 2px 4px;
  margin-right: 4px;
  border: 1px solid transparent;
}

.filters > span.selected {
  border-color: rgba(173, 47, 47, 0.2);
}
</style>