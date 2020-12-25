<template>
  <div>
    <p>{{ counter }}</p>
    <p>{{ doubleCounter }}</p>
    <p>{{ msg2 }}</p>
    <p ref="desc"></p>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, reactive, ref, toRefs, watch } from "vue";

export default {
  setup() {
    // counter相关的逻辑
    const { counter, doubleCounter } = useCounter();

    // 其他逻辑，单值的响应式
    const msg2 = ref("some message");

    // 使用元素的引用
    const desc = ref(null);

    // 侦听器
    watch(counter, (val, oldVal) => {
      const p = desc.value
      p.textContent = `counter change from ${oldVal} to ${val}`
    })
    return {
      counter,
      doubleCounter,
      msg2, 
      desc
    }
  }
}

function useCounter() {
  // 多值的响应式
  const data = reactive({
    counter: 1,
    doubleCounter: computed(() => data.counter * 2),
  });

  let timer = null;
  onMounted(() => {
    timer = setInterval(() => {
      data.counter++;
    }, 1000);
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  return toRefs(data);
}
</script>

<style>

</style>