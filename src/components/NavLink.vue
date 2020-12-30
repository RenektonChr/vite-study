<template>
  <div :class="{ active: isActive }" @click="navigate">
    {{ route.name }}
  </div>
</template>

<script>
import { RouterLink, useLink } from 'vue-router'
export default {
  props: {
    ...RouterLink.props,
    inactiveCalss:  String
  },

  setup(props) {
    const { route, href, isActive, isExactActive, navigate } = useLink(props)
    console.log(route, href, isActive, isExactActive, navigate)

    return {
      route, isActive, navigate
    }
  }
}
</script>

<style>
.active {
  background-color: #3fb983;
}
</style>