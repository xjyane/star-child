import { useState } from 'react'
import { socialScenarios } from '../data/emotions'
import { useStore } from '../store/useStore'

export default function SocialTraining() {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([])
  const { addStars, addTrainingRecord } = useStore()
  
  const scenario = socialScenarios[currentScenario]
  
  const handleOptionSelect = (index: number) => {
    setSelectedOption(index)
    setShowFeedback(true)
    
    if (socialScenarios[currentScenario].options[index].isCorrect) {
      if (!completedScenarios.includes(currentScenario)) {
        addStars(2)
        setCompletedScenarios([...completedScenarios, currentScenario])
      }
    }
  }
  
  const handleNext = () => {
    if (currentScenario < socialScenarios.length - 1) {
      setCurrentScenario(currentScenario + 1)
      setSelectedOption(null)
      setShowFeedback(false)
    } else {
      addTrainingRecord({ type: 'social' })
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">👫 社交训练</h1>
          <p className="text-gray-600">学习处理社交场景</p>
        </div>
        
        {/* 进度指示 */}
        <div className="flex justify-center gap-2 mb-6">
          {socialScenarios.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentScenario
                  ? 'bg-primary scale-125'
                  : completedScenarios.includes(index)
                  ? 'bg-green-400'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        {/* 场景卡片 */}
        <div className="emotion-card mb-6">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-600 font-medium mb-2">💭 情境</p>
            <h2 className="text-xl font-semibold text-gray-800">{scenario.title}</h2>
          </div>
          
          <div className="space-y-3">
            {scenario.options.map((option, index) => {
              let optionStyle = 'bg-white border-2 border-gray-200'
              
              if (showFeedback) {
                if (option.isCorrect) {
                  optionStyle = 'bg-green-50 border-2 border-green-500'
                } else if (index === selectedOption && !option.isCorrect) {
                  optionStyle = 'bg-red-50 border-2 border-red-500'
                }
              }
              
              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={showFeedback}
                  className={`w-full py-4 px-6 rounded-xl font-medium text-left transition-all ${optionStyle}`}
                >
                  <span className="text-gray-400 mr-3">{String.fromCharCode(65 + index)}</span>
                  {option.text}
                </button>
              )
            })}
          </div>
        </div>
        
        {/* 反馈 */}
        {showFeedback && (
          <div className={`emotion-card mb-6 fade-in ${
            scenario.options[selectedOption!].isCorrect
              ? 'bg-gradient-to-br from-green-50 to-emerald-50'
              : 'bg-gradient-to-br from-orange-50 to-yellow-50'
          }`}>
            <div className="text-center mb-4">
              <span className="text-4xl">
                {scenario.options[selectedOption!].isCorrect ? '🌟' : '💪'}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed text-center">
              {scenario.options[selectedOption!].feedback}
            </p>
            
            {scenario.options[selectedOption!].isCorrect && (
              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  ⭐ +2 成长星星
                </span>
              </div>
            )}
            
            <button
              onClick={handleNext}
              className="w-full mt-6 bg-gradient-to-r from-primary to-pink-400 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              {currentScenario < socialScenarios.length - 1 ? '下一个场景' : '完成训练'}
            </button>
          </div>
        )}
        
        {/* 社交技巧提示 */}
        <div className="emotion-card bg-gradient-to-br from-purple-50 to-pink-50">
          <h3 className="font-semibold text-gray-800 mb-3">🌈 社交小技巧</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span>💬</span>
              <span>用语言表达感受，而不是动手</span>
            </li>
            <li className="flex items-start gap-2">
              <span>🙏</span>
              <span>学会说"请"和"谢谢"</span>
            </li>
            <li className="flex items-start gap-2">
              <span>🤝</span>
              <span>主动分享可以交到更多朋友</span>
            </li>
            <li className="flex items-start gap-2">
              <span>💭</span>
              <span>尊重别人的想法和感受</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
