import { useState } from 'react'
import { emotionQuestions } from '../data/emotions'
import { useStore } from '../store/useStore'

export default function EmotionGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const { addStars, addTrainingRecord } = useStore()
  
  const question = emotionQuestions[currentQuestion]
  
  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    setShowResult(true)
    
    if (index === question.correctAnswer) {
      setScore(score + 1)
    }
  }
  
  const handleNext = () => {
    if (currentQuestion < emotionQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setGameOver(true)
      addStars(score)
      addTrainingRecord({ type: 'game' })
    }
  }
  
  const resetGame = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setGameOver(false)
  }
  
  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-4 flex items-center justify-center">
        <div className="emotion-card text-center max-w-md w-full">
          <div className="text-6xl mb-4 star-animation">⭐</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">游戏结束！</h2>
          <p className="text-xl text-gray-700 mb-6">
            你答对了 <span className="text-primary font-bold">{score}</span> / {emotionQuestions.length} 题
          </p>
          
          {score === emotionQuestions.length ? (
            <div className="bg-green-100 text-green-800 rounded-xl p-4 mb-6">
              <p className="font-semibold">太棒了！全部正确！🌟</p>
            </div>
          ) : score >= 3 ? (
            <div className="bg-blue-100 text-blue-800 rounded-xl p-4 mb-6">
              <p className="font-semibold">做得很好！继续加油！💪</p>
            </div>
          ) : (
            <div className="bg-yellow-100 text-yellow-800 rounded-xl p-4 mb-6">
              <p className="font-semibold">没关系，再练习一下！🎯</p>
            </div>
          )}
          
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-6 py-3 rounded-full text-lg font-medium">
              ⭐ +{score} 成长星星
            </span>
          </div>
          
          <button
            onClick={resetGame}
            className="w-full bg-gradient-to-r from-primary to-pink-400 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            再玩一次
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">🎮 表情认知游戏</h1>
          <p className="text-gray-600">
            第 {currentQuestion + 1} / {emotionQuestions.length} 题
          </p>
        </div>
        
        {/* 进度条 */}
        <div className="bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary to-pink-400 h-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / emotionQuestions.length) * 100}%` }}
          />
        </div>
        
        {/* 问题卡片 */}
        <div className="emotion-card text-center mb-6">
          <div className="text-8xl mb-6">{question.emoji}</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">{question.question}</h2>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`w-full py-4 px-6 rounded-xl font-medium text-lg transition-all ${
                  showResult
                    ? index === question.correctAnswer
                      ? 'bg-green-100 border-2 border-green-500 text-green-800'
                      : index === selectedAnswer
                      ? 'bg-red-100 border-2 border-red-500 text-red-800'
                      : 'bg-gray-100 text-gray-500'
                    : 'bg-pink-50 border-2 border-pink-200 text-gray-700 hover:bg-pink-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        {/* 结果反馈 */}
        {showResult && (
          <div className={`emotion-card text-center fade-in ${
            selectedAnswer === question.correctAnswer
              ? 'bg-green-50'
              : 'bg-orange-50'
          }`}>
            {selectedAnswer === question.correctAnswer ? (
              <>
                <p className="text-4xl mb-2">🎉</p>
                <p className="text-lg font-semibold text-green-800">太棒了！答对了！</p>
              </>
            ) : (
              <>
                <p className="text-4xl mb-2">💪</p>
                <p className="text-lg font-semibold text-orange-800">
                  没关系，正确答案是：{question.options[question.correctAnswer]}
                </p>
              </>
            )}
            
            <button
              onClick={handleNext}
              className="w-full mt-4 bg-gradient-to-r from-primary to-pink-400 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              {currentQuestion < emotionQuestions.length - 1 ? '下一题' : '查看结果'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
