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

  <!-- 函数式组件 -->
  <Functional level="3">这是一个动态的H元素</Functional>

  <!-- 异步组件 -->
  <AsyncComp></AsyncComp>

  <!-- 自定义指令 -->
  <p v-highlight="'green'">highlight this text!!!</p>

  <!-- 动画 -->
  <TransitionTest></TransitionTest>

  <!-- 发送和监听事件 -->
  <button @click="sendMsg">emit event</button>
</template>

<script>
import { h, defineAsyncComponent } from 'vue'
import ModalButton from './ModalButton.vue'
import Composition from './Composition.vue'
import Emits from './Emits.vue'
import VmodelTest from './VmodelTest.vue'
import Functional from './Functional.vue'
import TransitionTest from './TransitionTest.vue'

// 事件的派发和监听
import mitt from 'mitt'

export const emitter = mitt()

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
    Functional,
    AsyncComp: defineAsyncComponent(() => import('./nextPage.vue')),
    TransitionTest
  },
  methods: {
    onClick() {
      console.log('click me!')
    },
    sendMsg() {
      emitter.emit('someEvent', 'fooooooo')
    }
  },
};
</script>
