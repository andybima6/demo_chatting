import { createRouter, createWebHistory } from 'vue-router'
import { useChatStore } from '../stores/chat'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/chats', name: 'chats', component: () => import('../views/ChatListView.vue') },
    { path: '/chats/:id', name: 'chat-detail', component: () => import('../views/ChatDetailView.vue'), props: true },
  ],
})

router.beforeEach((to) => {
  const store = useChatStore()
  if (!store.isLoggedIn && to.name !== 'login') return { name: 'login' }
  if (store.isLoggedIn && to.name === 'login') return { name: 'chats' }
})

export default router
