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
</template>

<script>
import ModalButton from './ModalButton.vue'
import Composition from './Composition.vue'
import Emits from './Emits.vue'

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    ModalButton,
    Composition,
    Emits
  },
  methods: {
    onClick() {
      console.log('click me!')
    }
  },
};
</script>
