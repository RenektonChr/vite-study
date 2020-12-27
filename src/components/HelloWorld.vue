<template>
  <h1>{{ msg }}</h1>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  
  <Composition></Composition>
  <!-- Teleport: ModalButton -->
  <ModalButton></ModalButton>
  <!-- Emits选项 -->
  <Emits @my-click="onClick"></Emits>
  <!-- 实例方法定义组件 -->
  <comp />
  <!-- v-model的使用 -->
  <VmodelTest v-model:counter="counter"></VmodelTest>
</template>

<script>
import ModalButton from './ModalButton.vue'
import Composition from './Composition.vue'
import Emits from './Emits.vue'
import VmodelTest from './VmodelTest.vue'

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      counter: 1
    }
  },
  components: {
    ModalButton,
    Composition,
    Emits,
    VmodelTest
  },
  methods: {
    onClick() {
      console.log('click me!')
    }
  },
};
</script>
