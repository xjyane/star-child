import { useState, useRef } from 'react'
import { analyzeDrawing } from '../utils/aiService'
import { useStore } from '../store/useStore'

export default function DrawingAnalysis() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<{
    mood: string
    description: string
    suggestions: string[]
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addStars, addTrainingRecord } = useStore()
  
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
        setAnalysis(null)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleAnalyze = async () => {
    if (!selectedImage) return
    
    setIsLoading(true)
    
    try {
      const result = await analyzeDrawing(selectedImage)
      setAnalysis(result)
      addStars(2)
      addTrainingRecord({ type: 'drawing' })
    } catch (error) {
      console.error('Error analyzing drawing:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleReset = () => {
    setSelectedImage(null)
    setAnalysis(null)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🎨 绘画情绪分析
        </h1>
        
        <p className="text-gray-600 text-center mb-6">
          上传你的绘画作品，星宝会帮你分析画中的心情
        </p>
        
        {!selectedImage ? (
          <div className="emotion-card text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
              🎨
            </div>
            <p className="text-gray-600 mb-4">
              选择或拍摄一张你的绘画作品
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-gradient-to-r from-primary to-pink-400 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              选择图片
            </button>
          </div>
        ) : (
          <div className="emotion-card fade-in">
            <div className="mb-6">
              <img
                src={selectedImage}
                alt="绘画作品"
                className="w-full rounded-xl"
              />
            </div>
            
            {!analysis ? (
              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-pink-400 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isLoading ? '星宝在分析...' : '开始分析'}
              </button>
            ) : (
              <div className="space-y-4 fade-in">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 text-center">
                  <p className="text-sm text-purple-600 font-medium mb-2">星宝感受到的心情</p>
                  <p className="text-3xl font-bold text-purple-800">{analysis.mood}</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                  <p className="text-gray-700 leading-relaxed">{analysis.description}</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-3">💡 星宝的建议</h3>
                  <ul className="space-y-2">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span>✨</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-center mb-4">
                  <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-6 py-3 rounded-full text-lg font-medium">
                    ⭐ +2 成长星星
                  </span>
                </div>
                
                <button
                  onClick={handleReset}
                  className="w-full bg-gradient-to-r from-primary to-pink-400 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  再分析一幅画
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* 示例说明 */}
        <div className="emotion-card mt-6 bg-gradient-to-br from-yellow-50 to-orange-50">
          <h3 className="font-semibold text-gray-800 mb-3">🎯 如何分析绘画</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span>🎨</span>
              <span>明亮的颜色通常代表开心的心情</span>
            </li>
            <li className="flex items-start gap-2">
              <span>🌧️</span>
              <span>灰色或深蓝色可能代表有点难过</span>
            </li>
            <li className="flex items-start gap-2">
              <span>❤️</span>
              <span>红色通常代表强烈的情感</span>
            </li>
            <li className="flex items-start gap-2">
              <span>🌈</span>
              <span>彩虹代表快乐和希望</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
