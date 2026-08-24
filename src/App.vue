<script setup>
import { onMounted, ref } from 'vue'
import { initLiff, isLiffConfigured, liff } from './lib/liff'
import { isSupabaseConfigured } from './lib/supabase'
import SampleList from './components/SampleList.vue'

const status = ref('loading') // 'loading' | 'ready' | 'guest' | 'error'
const errorMessage = ref('')
const userName = ref('')
const userId = ref('')

onMounted(async () => {
  if (!isLiffConfigured()) {
    status.value = 'error'
    errorMessage.value =
      'VITE_LIFF_ID が未設定です。.env.example をコピーして .env を作成し、LIFF IDを設定してください。'
    return
  }

  try {
    await initLiff()

    if (!liff.isLoggedIn() && !liff.isInClient()) {
      liff.login()
      return
    }

    if (liff.isLoggedIn()) {
      const profile = await liff.getProfile()
      userName.value = profile.displayName
      userId.value = profile.userId
      status.value = 'ready'
    } else {
      status.value = 'guest'
    }
  } catch (err) {
    status.value = 'error'
    errorMessage.value = err.message
    console.error('LIFF init failed', err)
  }
})
</script>

<template>
  <div class="mx-auto min-h-screen max-w-md bg-white px-4 py-8 text-slate-800">
    <h1 class="mb-6 text-2xl font-bold">LINEミニアプリ 雛形</h1>

    <div v-if="status === 'loading'" class="text-slate-500">読み込み中...</div>

    <div v-else-if="status === 'error'" class="rounded-lg bg-red-50 p-4 text-red-700">
      <p class="font-semibold">初期化エラー</p>
      <p class="mt-1 text-sm">{{ errorMessage }}</p>
      <p class="mt-2 text-sm">
        詳しくは <code class="rounded bg-red-100 px-1">docs/04_troubleshooting.md</code> を確認してください。
      </p>
    </div>

    <div v-else-if="status === 'guest'" class="rounded-lg bg-amber-50 p-4 text-amber-700">
      LINEアプリ内で開くとログインした状態で利用できます。
    </div>

    <div v-else class="space-y-6">
      <div class="rounded-lg bg-slate-50 p-4">
        <p class="text-sm text-slate-500">ログイン中のユーザー</p>
        <p class="font-semibold">{{ userName }}</p>
        <p class="break-all text-xs text-slate-400">{{ userId }}</p>
      </div>

      <div v-if="!isSupabaseConfigured()" class="rounded-lg bg-red-50 p-4 text-sm text-red-700">
        Supabaseの環境変数（VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY）が未設定です。
      </div>
      <SampleList v-else :user-id="userId" />
    </div>
  </div>
</template>
