<template>
  <div @click="$emit('my-click')">
    自定义组件
  </div>
</template>

<script>
export default {
  emits: ['my-click']
}
</script>

<style>

</style>