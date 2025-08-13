// 開発用のモック認証設定
// 実際の実装時はNextAuthを使用

import type { Session } from '@/types'

export const mockSession: Session = {
  user: {
    id: 'mock-user-id',
    lineId: 'mock-line-id',
    name: '開発ユーザー',
    email: 'dev@example.com',
    profileImage: undefined,
    points: 1000,
    isAdmin: true,
    isLineFriend: true,
    friendBonusGiven: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30日後
}

// モック用のuseSession Hook
export function useSession() {
  return {
    data: mockSession,
    status: 'authenticated' as const,
  }
}

// モック用のsignOut関数
export async function signOut(options?: { callbackUrl?: string }) {
  if (options?.callbackUrl) {
    window.location.href = options.callbackUrl
  }
}