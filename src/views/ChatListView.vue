<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, MessageSquare, LogOut, MessageCircle } from 'lucide-vue-next'
import { useChatStore } from '../stores/chat'
import { formatTime } from '../utils/time'

const router = useRouter()
const store = useChatStore()

const query = ref('')

const filteredChats = computed(() => {
  const q = query.value.trim().toLowerCase()
  const list = store.sortedChats
  if (!q) return list
  return list.filter((chat) => chat.name.toLowerCase().includes(q))
})

function openChat(id: number): void {
  router.push({ name: 'chat-detail', params: { id } })
}

function logout(): void {
  store.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="flex h-screen w-full">
    <!-- Sidebar -->
    <aside class="flex w-full max-w-sm flex-col border-r border-ink-600 bg-ink-800">
      <header class="flex items-center justify-between border-b border-ink-600 px-5 py-4">
        <div class="flex items-center gap-2.5">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600">
            <MessageSquare :size="18" class="text-white" />
          </div>
          <div>
            <h1 class="text-base font-bold leading-tight text-white">Pulse</h1>
            <p class="text-[11px] text-slate-400">Signed in as {{ store.userName }}</p>
          </div>
        </div>
        <button @click="logout" class="rounded-lg p-2 text-slate-400 transition hover:bg-ink-600 hover:text-white" title="Sign out">
          <LogOut :size="18" />
        </button>
      </header>

      <div class="px-5 py-4">
        <div class="relative">
          <Search :size="17" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            v-model="query"
            type="text"
            placeholder="Search people…"
            class="w-full rounded-xl border border-ink-500 bg-ink-700 py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      <div class="scrollbar-thin flex-1 overflow-y-auto px-3 pb-4">
        <button
          v-for="chat in filteredChats"
          :key="chat.id"
          @click="openChat(chat.id)"
          class="group flex w-full items-center gap-3 rounded-xl px-2.5 py-3 text-left transition hover:bg-ink-700"
        >
          <div class="relative shrink-0">
            <img :src="chat.avatar" :alt="chat.name" class="h-12 w-12 rounded-full object-cover ring-2 ring-ink-600 transition group-hover:ring-brand-500/40" />
            <span v-if="chat.status === 'Active now'" class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-ink-800 bg-emerald-400"></span>
          </div>

          <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-2">
              <h2 class="truncate text-sm font-semibold text-white">{{ chat.name }}</h2>
              <span class="shrink-0 text-[11px] text-slate-500">{{ formatTime(chat.messages[chat.messages.length - 1].createdAt) }}</span>
            </div>
            <div class="mt-0.5 flex items-center justify-between gap-2">
              <p class="truncate text-xs text-slate-400">
                {{ chat.messages[chat.messages.length - 1].sender === 'me' ? 'You: ' : '' }}{{ chat.messages[chat.messages.length - 1].text }}
              </p>
              <span v-if="chat.unread > 0" class="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1.5 text-[10px] font-bold text-white">
                {{ chat.unread }}
              </span>
            </div>
          </div>
        </button>

        <div v-if="filteredChats.length === 0" class="mt-12 flex flex-col items-center text-center">
          <Search :size="28" class="text-slate-600" />
          <p class="mt-3 text-sm text-slate-500">No people found for "{{ query }}"</p>
        </div>
      </div>
    </aside>

    <!-- Welcome pane -->
    <main class="relative hidden flex-1 items-center justify-center bg-ink-900 md:flex">
      <div class="text-center">
        <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-ink-700">
          <MessageCircle :size="36" class="text-brand-400" />
        </div>
        <h2 class="text-2xl font-bold text-white">Welcome back, {{ store.userName }}</h2>
        <p class="mt-2 text-sm text-slate-400">Select a conversation from the list to start chatting.</p>
      </div>
    </main>
  </div>
</template>
