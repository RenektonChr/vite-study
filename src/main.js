import { createApp, createRenderer, h } from 'vue'
import App from './App.vue'
import './index.css'
import CanvasApp from './CanvasApp.vue'
import EditTodo from './components/todos/EditTodo.vue'
import Todos from './components/todos/Todos.vue'
import Dashboard from './components/Dashboard.vue'
import NavLink from './components/NavLink.vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'

// 实例的创建方式发生了变化
const router = createRouter({
  history: createWebHistory('/base-directory'),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/todos',
      name: 'todos',
      component: Todos
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('./components/NotFound.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }else {
      return { top: 0 }
    }
  }
})

// 特性：动态路由的添加
router.addRoute({
  path: '/about',
  name: 'about',
  component: () =>  import('./components/About.vue')
})
router.addRoute('about', {
  path: '/about/info',
  name: 'info',
  component: () =>  import('./components/AboutInfo.vue')
})

const store = createStore({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    add(state) {
      state.count++;
    }
  }
})

createApp(App)
.use(router)
.use(store)
.component('comp', {
  render() {
    return h('div', 'I am a comp!')
  }
})
.component('EditTodo', EditTodo)
.component('NavLink', NavLink)
.directive('highlight', {
  beforeMount(el, binding, vnode) {
    el.style.background = binding.value
  }
})
.mount('#app')

// 自定义渲染器
const nodeOps = {
  createElement(tag) {
    // 处理元素的创建逻辑
    return { tag }
  },
  insert(child, parent, anchor) {
    // 处理元素的插入逻辑
    // 1.如果是子元素，不是真实dom，此时只需要将数据保存到前面虚拟对象上即可
    child.parent = parent
    
    if(!parent.childs) {
      parent.childs = [child]
    } else {
      parent.childs.push(child)
    }
    // 2.如果是真实的dom元素，在这里会是canvas，需要绘制
    if(parent.nodeType === 1) {
      // draw(child)

      // 事件处理
      if(child.onClick) {
        canvas.addEventListener('click', () => {
          child.onClick()
          setTimeout(() => {
            // draw(child)
          }, 0)
        })
      }
    }
    return 
  },
  remove: child => {},
  createText: test => {},
  createComment: test => {},
  setText: (node, test) => {},
  setElementTest: (el, test) => {},
  parentNode: node => {},
  nextSibling: node => {},
  querySelector: selector => {},
  setScopeId(el, id) {},
  cloneNode(el) {},
  insertStationContent(content, parent, anchor, isSVG) {},
  patchProp(el, key, prevValue, nextValue) {
    // 属性的更新
    el[key] = nextValue
  }
}
const renderer = createRenderer(nodeOps)

let ctx, canvas

// 扩展mount
function createCanvasApp(App) {
  const app = renderer.createApp(App)
  const mount = app.mount
  app.mount = function(selector) {
    // 创建并插入画布
    canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d')
    // 设置画布的基础属性
    canvas.width = 600
    canvas.height = 600
    document.querySelector(selector).appendChild(canvas)
    
    // 执行默认的mount
    mount(canvas)
  }

  return app
}

createCanvasApp(CanvasApp).mount('#demo')
