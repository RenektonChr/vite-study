<template>
  <li
    :class="{ completed: todo.completed, editing: todo === editedTodo }"
  >
    <div class="view">
      <!-- 绑定完成状态 -->
      <input type="checkbox" v-model="todo.completed" />
      <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
      <button @click="removeTodo(todo)">X</button>
    </div>

    <!-- 编辑待办 -->
    <EditTodo
      class="edit"
      v-model:todo-title="todo.title"
      v-todo-focus="todo === editedTodo"
      @blur="doneEdit(todo)"
      @keyup.enter="doneEdit(todo)"
      @keyup.escape="cancelEdit(todo)"
    ></EditTodo>
  </li>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  props: {
    todo: {
      type: Object,
      required: true
    },
    editedTodo: Object
  },
  emits: ['remove-todo', 'update:edited-todo'],
  setup(props, { emit }) {
    const state = reactive({
      beforeEditCache: '',  // 缓存编辑前的title
    });

    function removeTodo(todo) {
      emit('remove-todo', todo)
    }

    function editTodo(todo) {
      state.beforeEditCache = todo.title
      emit('update:edited-todo', todo)
    }

    function doneEdit(todo) {
      emit('update:edited-todo', null)
    }
    
    function cancelEdit(todo) {
      state.beforeEditCache = state.beforeEditCache
      emit('update:edited-todo', null)
    }

    return {
      ...toRefs(state),
      removeTodo,
      editTodo,
      doneEdit,
      cancelEdit
    };
  },
  directives: {
    "todo-focus": (el, { value }) => {
      if(value) {
        el.focus()
      }
    }
  }
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
.edit,
.editing .view {
  display: none;
}
.view,
.editing .edit{
  display: block;
}
</style>