import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Browse from '../views/Browse.vue'
import Graph from '../views/Graph.vue'

const routes = [
  {
    path: '/',
    name: 'Browse',
    component: Browse
  },
  {
    path: '/:id',
    name: 'BrowseID',
    component: Browse
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/graph',
    name: "Graph",
    component: Graph
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
