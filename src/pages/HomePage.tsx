import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'

const features = [
  {
    path: '/emotion',
    icon: '💝',
    title: '今日心情',
    description: '记录和表达情绪',
    color: 'from-pink-400 to-rose-400'
  },
  {
    path: '/game',
    icon: '🎮',
    title: '表情游戏',
    description: '认识不同表情',
    color: 'from-yellow-400 to-orange-400'
  },
  {
    path: '/social',
    icon: '👫',
    title: '社交训练',
    description: '学习社交技能',
    color: 'from-blue-400 to-cyan-400'
  },
  {
    path: '/story',
    icon: '📚',
    title: 'AI绘本',
    description: '听星宝讲故事',
    color: 'from-purple-400 to-violet-400'
  },
  {
    path: '/drawing',
    icon: '🎨',
    title: '绘画分析',
    description: '了解画中心情',
    color: 'from-green-400 to-emerald-400'
  },
  {
    path: '/stars',
    icon: '⭐',
    title: '星星墙',
    description: '成长里程碑',
    color: 'from-amber-400 to-yellow-400'
  },
  {
    path: '/report',
    icon: '📊',
    title: '家长报告',
    description: '查看成长数据',
    color: 'from-indigo-400 to-blue-400'
  },
]

export default function HomePage() {
  const { stars, emotionRecords } = useStore()
  const todayEmotion = emotionRecords[emotionRecords.length - 1]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-primary to-pink-300 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">⭐ 星星的孩子</h1>
            <p className="text-sm opacity-90">星宝在这里陪伴你</p>
          </div>
          <div className="text-center">
            <div className="text-3xl">⭐</div>
            <div className="text-xl font-bold">{stars}</div>
          </div>
        </div>
        
        {/* 今日心情 */}
        {todayEmotion && (
          <div className="mt-4 bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="text-sm opacity-90 mb-2">今日心情</p>
            <div className="flex items-center gap-3">
              <span className="text-4xl">
                {todayEmotion.emotion === 'happy' && '😊'}
                {todayEmotion.emotion === 'sad' && '😭'}
                {todayEmotion.emotion === 'angry' && '😡'}
                {todayEmotion.emotion === 'fear' && '😨'}
                {todayEmotion.emotion === 'tired' && '😴'}
              </span>
              <p className="text-white">{todayEmotion.message}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* 功能模块 */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">✨ 选择你想做的事情</h2>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => (
            <Link
              key={feature.path}
              to={feature.path}
              className="emotion-card bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-3`}>
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
      
      {/* 引导语 */}
      <div className="p-4 mt-2">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 text-center">
          <p className="text-4xl mb-3">🌟</p>
          <p className="text-gray-700 leading-relaxed">
            每一个孩子，都是夜空中独一无二的星星。<br/>
            星宝会一直陪伴你，帮助你更好地表达和理解自己的情绪。
          </p>
        </div>
      </div>
    </div>
  )
}
