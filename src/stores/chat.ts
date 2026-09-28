import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type Message = {
  id: number
  text: string
  sender: 'me' | 'them'
  createdAt: Date
}

export type Chat = {
  id: number
  name: string
  handle: string
  avatar: string
  color: string
  status: string
  unread: number
  messages: Message[]
}

const people = [
  ['Budi Santoso', 'budi.santoso', 'https://randomuser.me/api/portraits/men/32.jpg', 'Kerja dari rumah'],
  ['Siti Rahmawati', 'siti.rahmawati', 'https://randomuser.me/api/portraits/women/44.jpg', 'Sedang rapat'],
  ['Andi Pratama', 'andi.pratama', 'https://randomuser.me/api/portraits/men/46.jpg', 'Aktif sekarang'],
  ['Dewi Lestari', 'dewi.lestari', 'https://randomuser.me/api/portraits/women/65.jpg', 'Biasanya membalas dalam satu jam'],
  ['Rizky Firmansyah', 'rizky.firmansyah', 'https://randomuser.me/api/portraits/men/52.jpg', 'Sedang jalan-jalan'],
  ['Putri Wulandari', 'putri.wulandari', 'https://randomuser.me/api/portraits/women/33.jpg', 'Aktif 20 menit lalu'],
  ['Agus Setiawan', 'agus.setiawan', 'https://randomuser.me/api/portraits/men/67.jpg', 'Sedang makan siang'],
  ['Ayu Anggraini', 'ayu.anggraini', 'https://randomuser.me/api/portraits/women/12.jpg', 'Jangan diganggu'],
]

const starterMessages = [
  ['Bud, mug kopi yang di kulkas boleh aku pinjam? Ngantuk banget nih.', 'them'],
  ['Boleh, ambil aja. Di mobilku juga masih banyak kalau kamu butuh lagi.', 'me'],
  ['MANTAP!', 'them'],
  ['Makasih ya, kamu penyelamat pagiku.', 'them'],
]

const now = Date.now()

const createChat = (person: typeof people[number], index: number): Chat => {

  const defaultTexts = [
    '',
    'Rapatnya diundur jam 3 sore ya, nanti aku kabari lagi.',
    'Sudah lihat fotonya? Bagus banget hasilnya.',
    'Oke, nanti malam aku kirim filenya.',
    'Jadi ngopi besok pagi? Di tempat biasa ya.',
    'Aku baru sampai. Nanti kutelepon kalau sudah santai.',
    'Makan siang bareng yuk, aku yang traktir.',
    'Nanti aja ya, aku lagi sibuk. Kabari besok.',
  ]
  const messages: Message[] = index === 0
    ? starterMessages.map(([text, sender], messageIndex) => ({
      id: messageIndex + 1,
      text,
      sender: sender as Message['sender'],
      createdAt: new Date(now - (3 - messageIndex) * 1000 * 60 * 7),
    }))
    : [{ id: index + 1, text: defaultTexts[index % defaultTexts.length], sender: index % 3 === 0 ? 'me' : 'them', createdAt: new Date(now - index * 1000 * 60 * 23) }]

  return {
    id: index + 1,
    name: person[0],
    handle: person[1],
    avatar: person[2],
    color: ['#ff8a65', '#69b9b1', '#8ea7ff', '#f5c76b'][index % 4],
    status: person[3],
    unread: index === 0 ? 2 : index % 5 === 0 ? 3 : index % 3 === 0 ? 1 : 0,
    messages,
  }
}

export const useChatStore = defineStore('chat', () => {
  const isLoggedIn = ref(false)
  const userName = ref('')
  const chats = ref(people.map(createChat))

  const sortedChats = computed(() => [...chats.value].sort((a, b) => {
    const aDate = a.messages[a.messages.length - 1]?.createdAt.getTime() ?? 0
    const bDate = b.messages[b.messages.length - 1]?.createdAt.getTime() ?? 0
    return bDate - aDate
  }))

  function login(email: string): void {
    const localName = email.split('@')[0].replace(/[._-]+/g, ' ').trim()
    userName.value = localName.split(' ').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
    isLoggedIn.value = true
  }

  function logout(): void {
    isLoggedIn.value = false
    userName.value = ''
  }

  function getChat(id: number): Chat | undefined {
    return chats.value.find((chat) => chat.id === id)
  }

  function addMessage(chatId: number, text: string): void {
    const chat = getChat(chatId)
    if (!chat) return
    chat.messages.push({ id: Date.now(), text, sender: 'me', createdAt: new Date() })
    chat.unread = 0
  }

  function markRead(chatId: number): void {
    const chat = getChat(chatId)
    if (chat) chat.unread = 0
  }

  return { isLoggedIn, userName, chats, sortedChats, login, logout, getChat, addMessage, markRead }
})
