<template>
  <div>
    <!-- 新增todo -->
    <EditTodo
      v-model:todo-title="newTodo" 
      @keyup.enter="addTodo" 
      autofocus 
      placeholder="新增今日待办" 
      autocomplete="off"
    ></EditTodo>
    <!-- todo列表 -->
    <ul>
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        v-model:edited-todo="editedTodo"
        @remove-todo="removeTodo"
      ></TodoItem>
    </ul>
    <!-- 过滤 -->
    <Filter :items="filterItems" v-model="visibility"></Filter>

    <!-- 回退到首页 -->
    <button @click="backToDash">dashboard</button>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import TodoItem from './todoItem.vue'
import Filter from './Filter.vue'
import { useTodos } from './useTodos'
import  { useFilter } from './useFilter'

export default {
  components: {
    TodoItem,
    Filter
  },
  setup() {
    const todoState = reactive({
      newTodo: '',
      editedTodo: null,  // 正在编辑的todo
    })
    const { todos, addTodo, removeTodo } = useTodos(todoState)
    const filterState = useFilter(todos)
    const router = useRouter()

    // route是响应式对象，可监控其变化并做相应
    const route = useRoute()
    watch(() => route.query, (query) => {
      console.log('query--->', query)
    })

    function backToDash() {
      router.push('/')
    }

    // 路由守卫
    onBeforeRouteLeave((to, form) => {
      const answer = window.confirm('你确定要离开吗？')
      if(!answer) {
        return false
      }
    })

    return {
      ...toRefs(todoState),
      ...toRefs(filterState),
      addTodo,
      removeTodo,
      backToDash
    }
  }
}
</script>

<style>
</style>