<template>
  <div >
    <button @click="modalOpen=true">弹出一个模态框</button>
    <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          只是一个弹窗
          我的父元素是body
          <button @click="modalOpen=false">关闭</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalOpen: false
    }
  }
}
</script>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>
