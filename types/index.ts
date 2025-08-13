// ユーザー関連の型定義
export interface User {
  id: string
  lineId: string
  email?: string
  name?: string
  image?: string
  profileImage?: string
  isAdmin: boolean
  points: number
  isLineFriend: boolean
  friendBonusGiven: boolean
  createdAt: string
  updatedAt: string
}

// レース関連の型定義
export interface Race {
  id: string
  raceDate: string
  venue: string
  raceNumber: number
  raceName: string
  raceType: string
  distance: number
  weather?: string
  trackCondition?: string
  postTime: string
  gradeClass?: string
  prizeFirst?: number
  noteUrl?: string
  pointCost: number
  isFree: boolean
  isPublished: boolean
  category?: 'central' | 'local' | 'g1' | 'g2g3' | 'free'
  showOnTop?: boolean
  topOrder?: number
  createdAt: string
  updatedAt: string
  horses?: Horse[]
  horsesCount?: number
}

// 馬情報の型定義
export interface Horse {
  id: string
  raceId: string
  horseNumber: number
  horseName: string
  age: number
  sex: string
  weight: number
  weightChange?: number
  jockey: string
  trainer: string
  odds?: number
  popularity?: number
  takigawaIndex?: number
  comment?: string
  createdAt: string
  updatedAt: string
}

// お知らせの型定義
export interface Notice {
  id: string
  title: string
  content: string
  type: 'campaign' | 'maintenance' | 'update'
  isNew: boolean
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

// 特徴セクションの型定義
export interface Feature {
  id: string
  icon: string
  title: string
  description: string
  order: number
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

// ポイント取引の型定義
export interface PointTransaction {
  id: string
  userId: string
  amount: number
  type: 'purchase' | 'view' | 'bonus'
  description: string
  relatedId?: string
  createdAt: string
}

// 閲覧履歴の型定義
export interface ViewHistory {
  id: string
  userId: string
  raceId: string
  viewedAt: string
  race?: Race
  pointsUsed?: number
}

// セッションの型定義
export interface Session {
  user?: User & {
    id: string
  }
  expires: string
}