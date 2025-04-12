// src/app/test/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { checkConnection } from '@/lib/api'

export default function TestPage() {
  const [message, setMessage] = useState('接続確認中...')

  useEffect(() => {
    checkConnection().then(setMessage)
  }, [])

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">FastAPI 接続テスト</h1>
      <p>{message}</p>
    </main>
  )
}
