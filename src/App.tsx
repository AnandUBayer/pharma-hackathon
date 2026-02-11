import React, { useState } from 'react'
import './styles/bayer-theme.css'
import { Calendar, Users, BarChart3, Home } from 'lucide-react'
import HomeView from './components/HomeView'
import PlannerView from './components/PlannerView'
import VisitsView from './components/VisitsView'
import AnalyticsView from './components/AnalyticsView'

type ViewType = 'home' | 'planner' | 'visits' | 'analytics'

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home')

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />
      case 'planner':
        return <PlannerView />
      case 'visits':
        return <VisitsView />
      case 'analytics':
        return <AnalyticsView />
      default:
        return <HomeView />
    }
  }

  return (
    <div className="min-h-screen lmnt-theme-surface-bg flex flex-col">
      {/* Header */}
      <header className="lmnt-theme-secondary-bg lmnt-theme-on-secondary shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">mySAM</h1>
          <p className="text-sm lmnt-theme-on-secondary-inactive">Pharma Sales Activity Manager</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {renderView()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 lmnt-theme-background-bg border-t lmnt-theme-divider-primary shadow-lg">
        <div className="max-w-7xl mx-auto px-2">
          <div className="flex justify-around items-center py-2">
            <button
              onClick={() => setCurrentView('home')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                currentView === 'home' ? 'lmnt-theme-secondary-bg lmnt-theme-on-secondary' : 'lmnt-theme-on-surface'
              }`}
            >
              <Home size={24} />
              <span className="text-xs mt-1">Home</span>
            </button>
            
            <button
              onClick={() => setCurrentView('planner')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                currentView === 'planner' ? 'lmnt-theme-secondary-bg lmnt-theme-on-secondary' : 'lmnt-theme-on-surface'
              }`}
            >
              <Calendar size={24} />
              <span className="text-xs mt-1">Planner</span>
            </button>
            
            <button
              onClick={() => setCurrentView('visits')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                currentView === 'visits' ? 'lmnt-theme-secondary-bg lmnt-theme-on-secondary' : 'lmnt-theme-on-surface'
              }`}
            >
              <Users size={24} />
              <span className="text-xs mt-1">Visits</span>
            </button>
            
            <button
              onClick={() => setCurrentView('analytics')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                currentView === 'analytics' ? 'lmnt-theme-secondary-bg lmnt-theme-on-secondary' : 'lmnt-theme-on-surface'
              }`}
            >
              <BarChart3 size={24} />
              <span className="text-xs mt-1">Analytics</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default App