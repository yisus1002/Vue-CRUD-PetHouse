import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {  path: '/home',  name: 'Home',  component: Home },
  {  path: '/nosotros',  name: 'Nosotros', component: () => import('../views/Nosotros.vue')},
  {  path: '/contactanos',  name: 'Contactanos', component: () => import('../views/Contactanos.vue')},
  {  path: '/preguntas',  name: 'Preguntas', component: () => import('../views/Preguntas.vue')},
  {  path: '/mascotas',  name: 'Mascotas', component: () => import('../components/Mascotas.vue')},
  {  path: '/productos',  name: 'Productos', component: () => import('../components/Producto.vue')},
  {  path: '/proveedor',  name: 'Proveedor', component: () => import('../components/Proveedor.vue')},
  {  path: '/loguin',  name: 'Loguin', component: () => import('../components/shared/Loguin.vue')},
  {  path: '/clientes',  name: 'Clientes', component: () => import('../components/Clientes.vue')},

  {  path: '/perfil',  name: 'Perfil', component: () => import('../components/Perfil.vue')},
  
  // {  path: '/about', name: 'About',   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
