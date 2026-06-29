import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', icon: '🏠', label: '首页' },
  { path: '/emotion', icon: '💝', label: '心情' },
  { path: '/game', icon: '🎮', label: '游戏' },
  { path: '/social', icon: '👫', label: '社交' },
  { path: '/story', icon: '📚', label: '故事' },
  { path: '/stars', icon: '⭐', label: '星星' },
]

export default function Navigation() {
  const location = useLocation()
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-200 shadow-lg z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all ${
              location.pathname === item.path
                ? 'text-primary-dark bg-pink-50'
                : 'text-gray-500 hover:text-primary'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
