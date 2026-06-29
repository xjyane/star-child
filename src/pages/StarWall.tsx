import { useStore } from '../store/useStore'

const achievements = [
  { stars: 10, title: '头像框', emoji: '🖼️', description: '解锁专属头像框' },
  { stars: 50, title: '故事集', emoji: '📖', description: '解锁特别故事集' },
  { stars: 100, title: '成长勋章', emoji: '🏆', description: '获得荣誉勋章' },
]

export default function StarWall() {
  const { stars, trainingHistory } = useStore()
  
  const completedTypes = trainingHistory.reduce((acc, record) => {
    acc[record.type] = (acc[record.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          ⭐ 星星成长墙
        </h1>
        
        {/* 当前星星数 */}
        <div className="emotion-card text-center bg-gradient-to-br from-amber-100 to-yellow-100 mb-6">
          <div className="text-6xl mb-4 star-animation">⭐</div>
          <p className="text-gray-600 mb-2">当前成长星星</p>
          <p className="text-5xl font-bold text-amber-600">{stars}</p>
        </div>
        
        {/* 里程碑 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">🏆 解锁里程碑</h2>
          <div className="space-y-4">
            {achievements.map((achievement) => {
              const isUnlocked = stars >= achievement.stars
              return (
                <div
                  key={achievement.stars}
                  className={`emotion-card flex items-center gap-4 ${
                    isUnlocked ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-gray-50 opacity-60'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                    isUnlocked ? 'bg-gradient-to-br from-amber-200 to-yellow-300' : 'bg-gray-200'
                  }`}>
                    {achievement.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${isUnlocked ? 'text-green-600' : 'text-gray-400'}`}>
                      ⭐ {achievement.stars}
                    </p>
                    {isUnlocked && <span className="text-green-600 text-sm">已解锁</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        
        {/* 训练统计 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">📊 训练统计</h2>
          <div className="emotion-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💝</span>
                  <span className="text-gray-700">情绪表达</span>
                </div>
                <span className="text-lg font-bold text-primary">{completedTypes.emotion || 0} 次</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎮</span>
                  <span className="text-gray-700">表情游戏</span>
                </div>
                <span className="text-lg font-bold text-yellow-500">{completedTypes.game || 0} 次</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👫</span>
                  <span className="text-gray-700">社交训练</span>
                </div>
                <span className="text-lg font-bold text-blue-500">{completedTypes.social || 0} 次</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📚</span>
                  <span className="text-gray-700">AI绘本</span>
                </div>
                <span className="text-lg font-bold text-purple-500">{completedTypes.story || 0} 次</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎨</span>
                  <span className="text-gray-700">绘画分析</span>
                </div>
                <span className="text-lg font-bold text-green-500">{completedTypes.drawing || 0} 次</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 鼓励语 */}
        <div className="emotion-card bg-gradient-to-br from-purple-50 to-pink-50 text-center">
          <p className="text-4xl mb-4">🌟</p>
          <p className="text-gray-700 leading-relaxed">
            {stars === 0
              ? '今天还没有获得星星哦，快去完成任务吧！'
              : stars < 10
              ? '继续保持！每颗星星都是进步的证明！'
              : stars < 50
              ? '太棒了！你已经获得了不少星星，继续加油！'
              : stars < 100
              ? '哇！你真的好厉害！再坚持一下就能解锁更多奖励！'
              : '你就是最闪耀的那颗星星！🎉'}
          </p>
        </div>
      </div>
    </div>
  )
}
