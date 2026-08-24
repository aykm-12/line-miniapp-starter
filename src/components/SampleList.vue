<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../lib/supabase'

const props = defineProps({
  userId: { type: String, required: true },
})

const items = ref([])
const newTitle = ref('')
const loading = ref(true)
const error = ref('')

async function fetchItems() {
  loading.value = true
  const { data, error: fetchError } = await supabase
    .from('sample_items')
    .select('*')
    .order('created_at', { ascending: false })

  if (fetchError) {
    error.value = fetchError.message
  } else {
    items.value = data
  }
  loading.value = false
}

async function addItem() {
  if (!newTitle.value.trim()) return

  const { error: insertError } = await supabase
    .from('sample_items')
    .insert({ title: newTitle.value.trim(), line_user_id: props.userId })

  if (insertError) {
    error.value = insertError.message
    return
  }

  newTitle.value = ''
  await fetchItems()
}

onMounted(fetchItems)
</script>

<template>
  <div>
    <h2 class="mb-2 font-semibold">サンプルリスト（Supabase連携）</h2>

    <div v-if="error" class="mb-3 rounded bg-red-50 p-2 text-sm text-red-700">
      {{ error }}
    </div>

    <form class="mb-3 flex gap-2" @submit.prevent="addItem">
      <input
        v-model="newTitle"
        type="text"
        placeholder="やることを入力"
        class="flex-1 rounded border border-slate-300 px-3 py-2 text-sm"
      />
      <button
        type="submit"
        class="rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white"
      >
        追加
      </button>
    </form>

    <p v-if="loading" class="text-sm text-slate-500">読み込み中...</p>
    <ul v-else class="space-y-2">
      <li
        v-for="item in items"
        :key="item.id"
        class="rounded border border-slate-200 px-3 py-2 text-sm"
      >
        {{ item.title }}
      </li>
      <li v-if="items.length === 0" class="text-sm text-slate-400">
        まだデータがありません。
      </li>
    </ul>
  </div>
</template>
