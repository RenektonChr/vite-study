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

  <!-- renderTest -->
  <RenderTest v-model:counter="counter">
    <template v-slot:default>title</template>
    <template v-slot:content>content...</template>
  </RenderTest>

  <!-- 函数是组件 -->
  <Functional level="3">这是一个动态的H元素</Functional>
</template>

<script>
import { h } from 'vue'
import ModalButton from './ModalButton.vue'
import Composition from './Composition.vue'
import Emits from './Emits.vue'
import VmodelTest from './VmodelTest.vue'
import Functional from './Functional.vue'

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
    VmodelTest,
    RenderTest: {
      props: {
        counter: {
          type: Number,
          default: 0
        }
      },
      render() {
        this.$slots.default()
        this.$slots.content()
        return h('div', [
          h('div', {onClick: this.onClick}, [
            `I am RenderTest: ${this.counter}`,
            this.$slots.default(),
            this.$slots.content()
          ])
        ])
      },
      methods: {
        onClick() {
          this.$emit('update:counter', this.counter + 1)
        }
      }
    },
    Functional
  },
  methods: {
    onClick() {
      console.log('click me!')
    }
  },
};
</script>
