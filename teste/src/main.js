import Vue from 'vue'
import App from './App.vue'
import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)
import VueRouter from "vue-router"
import Clientes from './components/Clientes.vue'
import Perguntas from './components/Perguntas.vue'
import Home from './components/Home.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  {path: "/", component:Home},
  {path: "/crud", component:Clientes},
  {path: "/perguntas", component:Perguntas}
]

const router = new VueRouter({
  routes: routes,
  mode:"history"
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
