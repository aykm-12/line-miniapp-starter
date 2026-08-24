import liff from '@line/liff'

const LIFF_ID = import.meta.env.VITE_LIFF_ID

export function isLiffConfigured() {
  return Boolean(LIFF_ID)
}

let initPromise = null

// Safe to call multiple times — liff.init() itself is idempotent, but we
// memoize so components don't need to coordinate who calls it first.
export function initLiff() {
  if (!isLiffConfigured()) {
    return Promise.reject(
      new Error(
        'VITE_LIFF_ID が設定されていません。.env.example を参考に .env を作成してください。'
      )
    )
  }

  if (!initPromise) {
    initPromise = liff.init({ liffId: LIFF_ID })
  }

  return initPromise
}

export { liff }
