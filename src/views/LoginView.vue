<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MessageSquare, Lock, Mail } from 'lucide-vue-next'
import { useChatStore } from '../stores/chat'

const router = useRouter()
const store = useChatStore()

const email = ref('')
const password = ref('')
const error = ref('')

const canSubmit = computed(() => email.value.trim() !== '' && password.value.trim() !== '')

function handleSubmit(): void {
  error.value = ''
  if (!canSubmit.value) {
    error.value = 'Please enter both email and password.'
    return
  }
  store.login(email.value.trim())
  router.push({ name: 'chats' })
}
</script>

<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-900 px-4">
    <div class="pointer-events-none absolute inset-0 opacity-60">
      <div class="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-600/30 blur-[120px]"></div>
      <div class="absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]"></div>
    </div>

    <div class="relative w-full max-w-md animate-fade-in">
      <div class="mb-8 text-center">
        <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg shadow-brand-600/30">
          <MessageSquare :size="30" class="text-white" />
        </div>
        <h1 class="text-3xl font-bold text-white">Pulse</h1>
        <p class="mt-1 text-sm text-slate-400">Sign in to continue your conversations</p>
      </div>

      <form @submit.prevent="handleSubmit" class="rounded-2xl border border-ink-600 bg-ink-800/80 p-7 backdrop-blur-xl shadow-2xl">
        <div class="space-y-5">
          <div>
            <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">Email</label>
            <div class="relative">
              <Mail :size="18" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                v-model="email"
                type="email"
                placeholder="chris_evans@example.com"
                class="w-full rounded-xl border border-ink-500 bg-ink-700 py-3 pl-10 pr-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
              />
            </div>
          </div>

          <div>
            <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
            <div class="relative">
              <Lock :size="18" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                v-model="password"
                type="password"
                placeholder="Enter any password"
                class="w-full rounded-xl border border-ink-500 bg-ink-700 py-3 pl-10 pr-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
              />
            </div>
          </div>

          <p v-if="error" class="text-sm text-rose-400">{{ error }}</p>

          <button
            type="submit"
            :disabled="!canSubmit"
            class="w-full rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            Sign In
          </button>
        </div>
      </form>

      <p class="mt-6 text-center text-xs text-slate-500">Login always succeeds — this is a demo workspace.</p>
    </div>
  </div>
</template>
