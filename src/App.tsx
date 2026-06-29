import { HashRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EmotionExpression from './pages/EmotionExpression'
import EmotionGame from './pages/EmotionGame'
import SocialTraining from './pages/SocialTraining'
import AIStory from './pages/AIStory'
import DrawingAnalysis from './pages/DrawingAnalysis'
import StarWall from './pages/StarWall'
import ParentReport from './pages/ParentReport'
import Navigation from './components/Navigation'

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen pb-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/emotion" element={<EmotionExpression />} />
          <Route path="/game" element={<EmotionGame />} />
          <Route path="/social" element={<SocialTraining />} />
          <Route path="/story" element={<AIStory />} />
          <Route path="/drawing" element={<DrawingAnalysis />} />
          <Route path="/stars" element={<StarWall />} />
          <Route path="/report" element={<ParentReport />} />
        </Routes>
        <Navigation />
      </div>
    </HashRouter>
  )
}

export default App
