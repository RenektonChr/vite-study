<template>
  <img alt="Vue logo" src="./assets/logo.png" height="1000" />
  <!-- 传统写法 -->
  <p @click="$store.commit('add')">{{ $store.state.count }}</p>
  <!-- Vue3写法 -->
  <p @click="add">{{ count }}</p>
  <!-- <Todos /> -->
  <router-view></router-view>
</template>

<script>
import Todos from './components/todos/Todos.vue'
import { useStore } from 'vuex'
import { toRefs } from 'vue'

export default {
  name: 'App',
  components: {
    Todos
  },
  setup() {
    const store = useStore()
    function add() {
      store.commit('add')
    }

    return {
      ...toRefs(store.state),
      add
    }
  }
}
</script>
