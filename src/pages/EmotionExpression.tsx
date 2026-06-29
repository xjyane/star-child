import { useState } from 'react'
import { emotions } from '../data/emotions'
import { useStore } from '../store/useStore'
import { generateAIResponse } from '../utils/aiService'

export default function EmotionExpression() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { addEmotionRecord, addStars, addTrainingRecord } = useStore()
  
  const handleEmotionSelect = (emotionId: string) => {
    setSelectedEmotion(emotionId)
    setAiResponse('')
  }
  
  const handleSubmit = async () => {
    if (!selectedEmotion) return
    
    setIsLoading(true)
    addEmotionRecord({
      emotion: selectedEmotion as any,
      message
    })
    
    try {
      const response = await generateAIResponse(message, selectedEmotion)
      setAiResponse(response)
      addStars(1)
      addTrainingRecord({ type: 'emotion' })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const selectedEmotionData = emotions.find(e => e.id === selectedEmotion)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          💝 今天感觉怎么样？
        </h1>
        
        {/* 情绪选择 */}
        <div className="mb-6">
          <p className="text-gray-600 mb-4 text-center">选择你的心情</p>
          <div className="grid grid-cols-5 gap-3">
            {emotions.map((emotion) => (
              <button
                key={emotion.id}
                onClick={() => handleEmotionSelect(emotion.id)}
                className={`emotion-card text-center p-4 ${
                  selectedEmotion === emotion.id
                    ? `${emotion.color} border-2 ${emotion.borderColor} shadow-xl scale-105`
                    : 'border-2 border-transparent hover:border-gray-200'
                }`}
              >
                <div className="text-4xl mb-2">{emotion.emoji}</div>
                <p className="text-sm font-medium text-gray-700">{emotion.label}</p>
              </button>
            ))}
          </div>
        </div>
        
        {/* 消息输入 */}
        {selectedEmotion && (
          <div className="emotion-card mb-6 fade-in">
            <p className="text-gray-600 mb-3">
              你愿意告诉星宝，{selectedEmotionData?.label}的时候在想什么吗？
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="说说你的心情..."
              className="w-full p-4 border-2 border-pink-200 rounded-xl focus:border-primary focus:outline-none resize-none h-32 text-gray-700"
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full mt-4 bg-gradient-to-r from-primary to-pink-400 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isLoading ? '星宝在想...' : '和星宝说说'}
            </button>
          </div>
        )}
        
        {/* AI 回复 */}
        {aiResponse && (
          <div className="emotion-card bg-gradient-to-br from-blue-50 to-purple-50 fade-in">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-2xl">
                ⭐
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 mb-2">星宝说：</p>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{aiResponse}</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                ⭐ +1 成长星星
              </span>
            </div>
          </div>
        )}
        
        {/* 情绪小贴士 */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 情绪小贴士</h3>
          <div className="space-y-3">
            {emotions.map((emotion) => (
              <div key={emotion.id} className={`emotion-card ${emotion.color}`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{emotion.emoji}</span>
                  <div>
                    <p className="font-medium text-gray-800">{emotion.label}</p>
                    <p className="text-sm text-gray-600">{emotion.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
