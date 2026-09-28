<script setup lang="ts">
import { ref } from 'vue'
import { Send } from 'lucide-vue-next'

defineEmits<{
  send: [text: string]
}>()

const draft = ref('')
</script>

<template>
  <footer class="border-t border-ink-600 bg-ink-800 px-4 py-3">
    <div class="mx-auto flex max-w-2xl items-center gap-2">
      <input
        v-model="draft"
        @keydown.enter.prevent="$emit('send', draft.trim()); draft = ''"
        type="text"
        placeholder="Type a message…"
        class="flex-1 rounded-full border border-ink-500 bg-ink-700 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
      />
      <button
        @click="$emit('send', draft.trim()); draft = ''"
        :disabled="!draft.trim()"
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-600/30 transition hover:brightness-110 disabled:opacity-40 disabled:shadow-none"
      >
        <Send :size="18" />
      </button>
    </div>
  </footer>
</template>
