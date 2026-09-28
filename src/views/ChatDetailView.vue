<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Phone, Video, MoreVertical } from 'lucide-vue-next'
import ChatComposer from '../components/ChatComposer.vue'
import { useChatStore } from '../stores/chat'
import { formatTime } from '../utils/time'

const props = defineProps<{ id: string }>()
const router = useRouter()
const store = useChatStore()

const scrollContainer = ref<HTMLElement | null>(null)

const chat = computed(() => store.getChat(Number(props.id)))

const messages = computed(() => chat.value?.messages ?? [])

watch(() => messages.value.length, async () => {
  await nextTick()
  if (scrollContainer.value) scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
}, { immediate: true })

watch(() => props.id, () => {
  if (chat.value) store.markRead(chat.value.id)
}, { immediate: true })

function send(text: string): void {
  if (!text || !chat.value) return
  store.addMessage(chat.value.id, text)
}

function back(): void {
  router.push({ name: 'chats' })
}
</script>

<template>
  <div v-if="chat" class="flex h-screen flex-col bg-ink-900">
    <!-- Header -->
    <header class="flex items-center gap-3 border-b border-ink-600 bg-ink-800 px-4 py-3">
      <button @click="back" class="rounded-lg p-1.5 text-slate-300 transition hover:bg-ink-600 hover:text-white">
        <ArrowLeft :size="20" />
      </button>
      <img :src="chat.avatar" :alt="chat.name" class="h-10 w-10 rounded-full object-cover ring-2 ring-ink-600" />
      <div class="min-w-0 flex-1">
        <h2 class="truncate text-sm font-bold text-white">{{ chat.name }}</h2>
        <p class="truncate text-xs" :class="chat.status === 'Active now' ? 'text-emerald-400' : 'text-slate-400'">{{ chat.status }}</p>
      </div>
      <button class="rounded-lg p-2 text-slate-400 transition hover:bg-ink-600 hover:text-white"><Phone :size="18" /></button>
      <button class="rounded-lg p-2 text-slate-400 transition hover:bg-ink-600 hover:text-white"><Video :size="18" /></button>
      <button class="rounded-lg p-2 text-slate-400 transition hover:bg-ink-600 hover:text-white"><MoreVertical :size="18" /></button>
    </header>

    <!-- Messages -->
    <div ref="scrollContainer" class="scrollbar-thin flex-1 overflow-y-auto px-4 py-6">
      <div class="mx-auto max-w-2xl space-y-1">
        <div
          v-for="(message, index) in messages"
          :key="message.id"
          class="flex animate-rise"
          :class="message.sender === 'me' ? 'justify-end' : 'justify-start'"
        >
          <div class="flex flex-col" :class="message.sender === 'me' ? 'items-end' : 'items-start'">
            <div
              class="max-w-xs rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm sm:max-w-sm"
              :class="[
                message.sender === 'me'
                  ? 'rounded-br-md bg-gradient-to-br from-brand-500 to-brand-600 text-white'
                  : 'rounded-bl-md bg-ink-700 text-slate-100',
                index > 0 && messages[index - 1].sender === message.sender ? 'mt-0.5' : 'mt-3',
              ]"
            >
              {{ message.text }}
            </div>
            <span class="mt-1 px-1 text-[10px] text-slate-500">{{ formatTime(message.createdAt) }}</span>
          </div>
        </div>
      </div>
    </div>

    <ChatComposer @send="send" />
  </div>

  <div v-else class="flex h-screen items-center justify-center bg-ink-900">
    <div class="text-center">
      <p class="text-slate-400">Conversation not found.</p>
      <button @click="back" class="mt-4 rounded-lg bg-ink-700 px-4 py-2 text-sm text-white hover:bg-ink-600">Back to chats</button>
    </div>
  </div>
</template>
