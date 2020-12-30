<template>
  <img alt="Vue logo" src="./assets/logo.png" height="1000" />
  <!-- <Todos /> -->
  <router-view></router-view>
</template>

<script>
import Todos from './components/todos/Todos.vue'

export default {
  name: 'App',
  components: {
    Todos
  }
}
</script>
