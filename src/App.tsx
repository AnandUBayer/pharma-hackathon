import React, { useState } from 'react'
import './styles/bayer-theme.css'
import { Calendar, Users, BarChart3, Home } from 'lucide-react'
import HomeView from './components/HomeView'
import SchedulerView from './components/SchedulerView'
import VisitsView from './components/VisitsView'
import InsightsView from './components/InsightsView'

type ViewType = 'home' | 'scheduler' | 'visits' | 'insights'

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home')

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />
      case 'scheduler':
        return <SchedulerView />
      case 'visits':
        return <VisitsView />
      case 'insights':
        return <InsightsView />
      default:
        return <HomeView />
    }
  }

  return (
    <div className="min-h-screen lmnt-theme-surface-bg flex flex-col">
      {/* Header */}
      <header className="lmnt-theme-secondary-bg lmnt-theme-on-secondary shadow-lg z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">mySAM</h1>
          <p className="text-sm lmnt-theme-on-secondary-inactive">Pharma Sales Activity Manager</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {renderView()}
      </main>

      {/* Bottom Navigation - Fixed with high z-index */}
      <nav className="fixed bottom-0 left-0 right-0 lmnt-theme-secondary-bg border-t lmnt-theme-on-secondary-stroke-border shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-2">
          <div className="flex justify-around items-center py-2">
            <button
              onClick={() => setCurrentView('home')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                currentView === 'home' ? 'lmnt-theme-secondary-variant-bg' : ''
              }`}
            >
              <Home size={24} className="text-white" strokeWidth={2.5} />
              <span className="text-xs mt-1 text-white font-medium">Home</span>
            </button>
            
            <button
              onClick={() => setCurrentView('scheduler')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                currentView === 'scheduler' ? 'lmnt-theme-secondary-variant-bg' : ''
              }`}
            >
              <Calendar size={24} className="text-white" strokeWidth={2.5} />
              <span className="text-xs mt-1 text-white font-medium">Scheduler</span>
            </button>
            
            <button
              onClick={() => setCurrentView('visits')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                currentView === 'visits' ? 'lmnt-theme-secondary-variant-bg' : ''
              }`}
            >
              <Users size={24} className="text-white" strokeWidth={2.5} />
              <span className="text-xs mt-1 text-white font-medium">Visits</span>
            </button>
            
            <button
              onClick={() => setCurrentView('insights')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                currentView === 'insights' ? 'lmnt-theme-secondary-variant-bg' : ''
              }`}
            >
              <BarChart3 size={24} className="text-white" strokeWidth={2.5} />
              <span className="text-xs mt-1 text-white font-medium">Insights</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default App