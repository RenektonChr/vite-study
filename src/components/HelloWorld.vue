<template>
  <h1>{{ msg }}</h1>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  
  <Composition></Composition>
  <!-- Teleport: ModalButton -->
  <ModalButton></ModalButton>
</template>

<script>
import ModalButton from './ModalButton.vue'
import Composition from './Composition.vue'

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    ModalButton,
    Composition
  },
  setup() {

    return {
    };
  },
};
</script>
