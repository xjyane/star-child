import { useState } from 'react'
import { generateAIStory } from '../utils/aiService'
import { useStore } from '../store/useStore'

const storyThemes = [
  { id: '情绪管理', emoji: '🎭', description: '学习管理情绪' },
  { id: '社交技能', emoji: '👫', description: '学会与人相处' },
  { id: '勇气与自信', emoji: '🦁', description: '变得更勇敢' },
]

export default function AIStory() {
  const [, setSelectedTheme] = useState<string | null>(null)
  const [story, setStory] = useState<{ title: string; content: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { addStars, addTrainingRecord } = useStore()
  
  const handleGenerateStory = async (theme: string) => {
    setSelectedTheme(theme)
    setIsLoading(true)
    
    try {
      const newStory = await generateAIStory(theme)
      setStory(newStory)
      addStars(2)
      addTrainingRecord({ type: 'story' })
    } catch (error) {
      console.error('Error generating story:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleReset = () => {
    setSelectedTheme(null)
    setStory(null)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          📚 AI 绘本故事
        </h1>
        
        {!story ? (
          <>
            <p className="text-gray-600 text-center mb-6">
              选择一个主题，星宝为你讲一个温暖的故事
            </p>
            
            <div className="space-y-4">
              {storyThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleGenerateStory(theme.id)}
                  disabled={isLoading}
                  className="emotion-card w-full text-left bg-white hover:shadow-xl transition-all disabled:opacity-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-3xl">
                      {theme.emoji}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{theme.id}</h3>
                      <p className="text-sm text-gray-500">{theme.description}</p>
                    </div>
                    <span className="text-2xl text-gray-400">→</span>
                  </div>
                </button>
              ))}
            </div>
            
            {isLoading && (
              <div className="emotion-card text-center mt-6">
                <div className="text-4xl mb-4 star-animation">⭐</div>
                <p className="text-gray-600">星宝正在为你讲故事...</p>
              </div>
            )}
          </>
        ) : (
          <div className="emotion-card fade-in">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 star-animation">
                📖
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{story.title}</h2>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {story.content}
              </p>
            </div>
            
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-6 py-3 rounded-full text-lg font-medium">
                ⭐ +2 成长星星
              </span>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleReset}
                className="w-full bg-gradient-to-r from-primary to-pink-400 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                再听一个故事
              </button>
            </div>
          </div>
        )}
        
        {/* 故事的意义 */}
        <div className="emotion-card mt-6 bg-gradient-to-br from-green-50 to-emerald-50">
          <h3 className="font-semibold text-gray-800 mb-3">🌟 星宝想告诉你</h3>
          <p className="text-gray-700 leading-relaxed">
            每个故事都藏着一个道理，通过故事学习，比直接说教更容易记住哦！
            听完故事后，可以和爸爸妈妈讨论故事里发生了什么，你学到了什么。
          </p>
        </div>
      </div>
    </div>
  )
}
