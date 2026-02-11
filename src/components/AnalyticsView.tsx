import React from 'react'
import { TrendingUp, Target, Users, Calendar, Award, BarChart3 } from 'lucide-react'

const AnalyticsView: React.FC = () => {
  const weeklyData = [
    { day: 'Mon', visits: 8, success: 6 },
    { day: 'Tue', visits: 7, success: 5 },
    { day: 'Wed', visits: 9, success: 8 },
    { day: 'Thu', visits: 6, success: 5 },
    { day: 'Fri', visits: 8, success: 7 }
  ]

  const maxVisits = Math.max(...weeklyData.map(d => d.visits))

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="lmnt-theme-on-surface text-2xl font-bold">Analytics</h2>
        <p className="lmnt-theme-on-surface opacity-70 text-sm">Track your performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="lmnt-theme-secondary-bg lmnt-theme-on-secondary rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <Target size={24} />
            <span className="text-2xl font-bold">38</span>
          </div>
          <p className="text-sm lmnt-theme-on-secondary-inactive">This Week</p>
        </div>

        <div className="lmnt-theme-success-bg lmnt-theme-on-success rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp size={24} />
            <span className="text-2xl font-bold">87%</span>
          </div>
          <p className="text-sm lmnt-theme-on-success-inactive">Success Rate</p>
        </div>

        <div className="lmnt-theme-background-bg rounded-xl p-4 shadow-md border lmnt-theme-divider-primary">
          <div className="flex items-center justify-between mb-2">
            <Users className="lmnt-theme-secondary" size={24} />
            <span className="text-2xl font-bold lmnt-theme-secondary">24</span>
          </div>
          <p className="lmnt-theme-on-surface text-sm">New Prescriptions</p>
        </div>

        <div className="lmnt-theme-background-bg rounded-xl p-4 shadow-md border lmnt-theme-divider-primary">
          <div className="flex items-center justify-between mb-2">
            <Award className="lmnt-theme-success" size={24} />
            <span className="text-2xl font-bold lmnt-theme-success">12</span>
          </div>
          <p className="lmnt-theme-on-surface text-sm">Achievements</p>
        </div>
      </div>

      {/* Weekly Performance Chart */}
      <div className="lmnt-theme-background-bg rounded-xl p-5 shadow-md border lmnt-theme-divider-primary">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="lmnt-theme-secondary" size={20} />
          <h3 className="lmnt-theme-on-surface font-bold text-lg">Weekly Performance</h3>
        </div>
        
        <div className="space-y-4">
          {weeklyData.map((data) => (
            <div key={data.day}>
              <div className="flex items-center justify-between mb-1">
                <span className="lmnt-theme-on-surface text-sm font-semibold">{data.day}</span>
                <span className="lmnt-theme-on-surface text-sm">{data.visits} visits</span>
              </div>
              <div className="flex gap-1">
                <div className="flex-1 bg-bayer-secondary-100 rounded-full h-6 overflow-hidden">
                  <div 
                    className="lmnt-theme-secondary-bg h-full rounded-full transition-all duration-500"
                    style={{ width: `${(data.visits / maxVisits) * 100}%` }}
                  />
                </div>
                <div className="flex-1 bg-bayer-secondary-100 rounded-full h-6 overflow-hidden">
                  <div 
                    className="lmnt-theme-success-bg h-full rounded-full transition-all duration-500"
                    style={{ width: `${(data.success / maxVisits) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="lmnt-theme-secondary text-xs">Total</span>
                <span className="lmnt-theme-success text-xs">{data.success} successful</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t lmnt-theme-divider-primary">
          <div className="flex justify-around text-center">
            <div>
              <p className="text-2xl font-bold lmnt-theme-secondary">38</p>
              <p className="lmnt-theme-on-surface text-xs">Total Visits</p>
            </div>
            <div>
              <p className="text-2xl font-bold lmnt-theme-success">31</p>
              <p className="lmnt-theme-on-surface text-xs">Successful</p>
            </div>
            <div>
              <p className="text-2xl font-bold lmnt-theme-on-surface">7</p>
              <p className="lmnt-theme-on-surface text-xs">Follow-ups</p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Goals */}
      <div className="lmnt-theme-secondary-bg lmnt-theme-on-secondary rounded-xl p-5 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={20} />
          <h3 className="font-bold text-lg">Monthly Goals</h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Doctor Visits</span>
              <span className="text-sm font-bold">142/160</span>
            </div>
            <div className="w-full bg-bayer-secondary-900 bg-opacity-30 rounded-full h-3">
              <div className="lmnt-theme-secondary-variant-bg h-3 rounded-full" style={{ width: '89%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">New Prescriptions</span>
              <span className="text-sm font-bold">24/30</span>
            </div>
            <div className="w-full bg-bayer-secondary-900 bg-opacity-30 rounded-full h-3">
              <div className="lmnt-theme-secondary-variant-bg h-3 rounded-full" style={{ width: '80%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Success Rate</span>
              <span className="text-sm font-bold">87%/85%</span>
            </div>
            <div className="w-full bg-bayer-secondary-900 bg-opacity-30 rounded-full h-3">
              <div className="lmnt-theme-success-bg h-3 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="lmnt-theme-background-bg rounded-xl p-5 shadow-md border lmnt-theme-divider-primary">
        <div className="flex items-center gap-2 mb-4">
          <Award className="lmnt-theme-success" size={20} />
          <h3 className="lmnt-theme-on-surface font-bold text-lg">Recent Achievements</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 lmnt-theme-success-bg lmnt-theme-on-success rounded-lg">
            <Award size={24} />
            <div>
              <p className="font-semibold text-sm">Perfect Week!</p>
              <p className="text-xs lmnt-theme-on-success-inactive">Completed all scheduled visits</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 lmnt-theme-secondary-bg lmnt-theme-on-secondary rounded-lg">
            <Target size={24} />
            <div>
              <p className="font-semibold text-sm">Top Performer</p>
              <p className="text-xs lmnt-theme-on-secondary-inactive">Highest success rate this month</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 lmnt-theme-secondary-variant-bg lmnt-theme-on-secondary rounded-lg">
            <TrendingUp size={24} />
            <div>
              <p className="font-semibold text-sm">Rising Star</p>
              <p className="text-xs lmnt-theme-on-secondary-inactive">30% increase in conversions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsView