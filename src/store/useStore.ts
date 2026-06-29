import { create } from 'zustand'

export interface EmotionRecord {
  id: string
  emotion: 'happy' | 'sad' | 'angry' | 'fear' | 'tired'
  message: string
  timestamp: number
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface TrainingRecord {
  id: string
  type: 'emotion' | 'game' | 'social' | 'story' | 'drawing'
  completedAt: number
}

interface AppState {
  stars: number
  emotionRecords: EmotionRecord[]
  chatMessages: ChatMessage[]
  trainingHistory: TrainingRecord[]
  
  addStars: (count: number) => void
  addEmotionRecord: (record: Omit<EmotionRecord, 'id' | 'timestamp'>) => void
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  addTrainingRecord: (record: Omit<TrainingRecord, 'id' | 'completedAt'>) => void
  
  getEmotionStats: () => Record<string, number>
}

export const useStore = create<AppState>((set, get) => ({
  stars: 0,
  emotionRecords: [],
  chatMessages: [],
  trainingHistory: [],
  
  addStars: (count) => set((state) => ({ stars: state.stars + count })),
  
  addEmotionRecord: (record) => set((state) => ({
    emotionRecords: [
      ...state.emotionRecords,
      { ...record, id: Date.now().toString(), timestamp: Date.now() }
    ]
  })),
  
  addChatMessage: (message) => set((state) => ({
    chatMessages: [
      ...state.chatMessages,
      { ...message, id: Date.now().toString(), timestamp: Date.now() }
    ]
  })),
  
  addTrainingRecord: (record) => set((state) => ({
    trainingHistory: [
      ...state.trainingHistory,
      { ...record, id: Date.now().toString(), completedAt: Date.now() }
    ]
  })),
  
  getEmotionStats: () => {
    const records = get().emotionRecords
    return records.reduce((acc, record) => {
      acc[record.emotion] = (acc[record.emotion] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }
}))
