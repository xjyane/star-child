import { useStore } from '../store/useStore'
import { emotions } from '../data/emotions'

export default function ParentReport() {
  const { stars, emotionRecords, trainingHistory } = useStore()
  
  const emotionStats = emotionRecords.reduce((acc, record) => {
    acc[record.emotion] = (acc[record.emotion] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const totalRecords = emotionRecords.length
  const trainingCount = trainingHistory.length
  
  // 计算本周数据
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  const weeklyRecords = emotionRecords.filter(r => r.timestamp > oneWeekAgo)
  const weeklyStats = weeklyRecords.reduce((acc, record) => {
    acc[record.emotion] = (acc[record.emotion] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          📊 家长成长报告
        </h1>
        
        {/* 总体概览 */}
        <div className="emotion-card mb-6 bg-gradient-to-br from-blue-50 to-purple-50">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">📈 本周概览</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">{weeklyRecords.length}</p>
              <p className="text-sm text-gray-600">情绪记录</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">{trainingCount}</p>
              <p className="text-sm text-gray-600">训练完成</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-600">{stars}</p>
              <p className="text-sm text-gray-600">获得星星</p>
            </div>
          </div>
        </div>
        
        {/* 情绪分布 */}
        <div className="emotion-card mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">💝 情绪分布</h2>
          {totalRecords === 0 ? (
            <p className="text-gray-500 text-center py-8">
              暂无情绪记录，开始记录孩子的情绪吧
            </p>
          ) : (
            <div className="space-y-4">
              {emotions.map((emotion) => {
                const count = emotionStats[emotion.id] || 0
                const percentage = totalRecords > 0 ? (count / totalRecords) * 100 : 0
                
                return (
                  <div key={emotion.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{emotion.emoji}</span>
                        <span className="text-gray-700">{emotion.label}</span>
                      </div>
                      <span className="text-gray-600">{count} 次</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${emotion.color.replace('bg-', 'bg-')}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
        
        {/* 训练记录 */}
        <div className="emotion-card mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">🎯 训练详情</h2>
          {trainingHistory.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              暂无训练记录
            </p>
          ) : (
            <div className="space-y-3">
              {['emotion', 'game', 'social', 'story', 'drawing'].map((type) => {
                const count = trainingHistory.filter(t => t.type === type).length
                if (count === 0) return null
                
                const labels: Record<string, { label: string; emoji: string }> = {
                  emotion: { label: '情绪表达', emoji: '💝' },
                  game: { label: '表情游戏', emoji: '🎮' },
                  social: { label: '社交训练', emoji: '👫' },
                  story: { label: 'AI绘本', emoji: '📚' },
                  drawing: { label: '绘画分析', emoji: '🎨' },
                }
                
                return (
                  <div key={type} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{labels[type].emoji}</span>
                      <span className="text-gray-700">{labels[type].label}</span>
                    </div>
                    <span className="text-primary font-semibold">{count} 次</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
        
        {/* 成长建议 */}
        <div className="emotion-card bg-gradient-to-br from-green-50 to-emerald-50">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">💡 成长建议</h2>
          <div className="space-y-3 text-gray-700">
            {weeklyRecords.length === 0 && trainingCount === 0 ? (
              <p>今天还没有进行任何训练，建议每天花一些时间和孩子一起完成1-2个训练任务。</p>
            ) : (
              <>
                {weeklyStats['sad'] > 2 && (
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="font-medium text-blue-800">💙 情绪关注</p>
                    <p className="text-sm mt-1">孩子最近记录的"难过"情绪较多，建议多关注孩子的情绪变化，给予更多陪伴和安慰。</p>
                  </div>
                )}
                {weeklyStats['angry'] > 2 && (
                  <div className="bg-orange-50 rounded-xl p-4">
                    <p className="font-medium text-orange-800">🧡 情绪管理</p>
                    <p className="text-sm mt-1">孩子记录的"生气"情绪较多，可以通过情绪管理绘本帮助孩子学习表达和控制情绪。</p>
                  </div>
                )}
                {trainingCount > 0 && trainingCount < 3 && (
                  <div className="bg-purple-50 rounded-xl p-4">
                    <p className="font-medium text-purple-800">💜 训练建议</p>
                    <p className="text-sm mt-1">本周训练完成较少，建议每天完成1-2个训练任务，持续训练有助于提升孩子的情绪表达能力。</p>
                  </div>
                )}
                {trainingCount >= 5 && (
                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="font-medium text-green-800">🌟 优秀表现</p>
                    <p className="text-sm mt-1">本周训练完成很棒！继续保持，孩子的情绪表达能力正在稳步提升。</p>
                  </div>
                )}
                {(!weeklyStats['sad'] && !weeklyStats['angry'] && weeklyRecords.length > 0) && (
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <p className="font-medium text-yellow-800">⭐ 积极信号</p>
                    <p className="text-sm mt-1">本周孩子整体情绪表现积极，继续保持良好的沟通和陪伴。</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* 页脚 */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>报告生成时间：{new Date().toLocaleDateString('zh-CN')}</p>
          <p className="mt-2">⭐ 星星的孩子 · AI情感陪伴</p>
        </div>
      </div>
    </div>
  )
}
