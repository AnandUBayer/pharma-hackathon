import React, { useState } from 'react'
import { Calendar, Plus, Clock, MapPin, Phone, Mail } from 'lucide-react'

interface Visit {
  id: number
  doctorName: string
  specialty: string
  time: string
  location: string
  status: 'pending' | 'completed' | 'cancelled'
  phone: string
  email: string
}

const SchedulerView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showAddModal, setShowAddModal] = useState(false)

  const visits: Visit[] = [
    {
      id: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      time: '09:00 AM',
      location: 'City Hospital, Building A',
      status: 'completed',
      phone: '+1 234-567-8901',
      email: 'sarah.j@cityhospital.com'
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Chen',
      specialty: 'Neurology',
      time: '11:30 AM',
      location: 'Metro Medical Center',
      status: 'completed',
      phone: '+1 234-567-8902',
      email: 'mchen@metromedical.com'
    },
    {
      id: 3,
      doctorName: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      time: '02:30 PM',
      location: 'Children\'s Hospital',
      status: 'pending',
      phone: '+1 234-567-8903',
      email: 'e.rodriguez@childrens.com'
    },
    {
      id: 4,
      doctorName: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      time: '04:00 PM',
      location: 'Sports Medicine Clinic',
      status: 'pending',
      phone: '+1 234-567-8904',
      email: 'jwilson@sportsmed.com'
    },
    {
      id: 5,
      doctorName: 'Dr. Lisa Anderson',
      specialty: 'Oncology',
      time: '05:30 PM',
      location: 'Cancer Treatment Center',
      status: 'pending',
      phone: '+1 234-567-8905',
      email: 'landerson@cancercenter.com'
    }
  ]

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="lmnt-theme-on-surface text-2xl font-bold">Day Scheduler</h2>
          <p className="lmnt-theme-on-surface opacity-70 text-sm">{formatDate(selectedDate)}</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-bayer-secondary-500 to-bayer-secondary-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 hover:from-bayer-secondary-600 hover:to-bayer-secondary-700"
        >
          <Plus size={24} strokeWidth={2.5} />
        </button>
      </div>

      {/* Calendar Date Selector */}
      <div className="lmnt-theme-background-bg rounded-xl p-4 shadow-md border lmnt-theme-divider-primary">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="lmnt-theme-secondary" size={20} />
          <span className="lmnt-theme-on-surface font-semibold">Select Date</span>
        </div>
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="w-full p-3 rounded-lg border lmnt-theme-divider-primary lmnt-theme-on-surface"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="lmnt-theme-background-bg rounded-xl p-4 shadow-md border lmnt-theme-divider-primary text-center">
          <p className="text-2xl font-bold lmnt-theme-secondary">{visits.length}</p>
          <p className="lmnt-theme-on-surface text-xs mt-1">Total</p>
        </div>
        <div className="lmnt-theme-success-bg lmnt-theme-on-success rounded-xl p-4 shadow-md text-center">
          <p className="text-2xl font-bold">{visits.filter(v => v.status === 'completed').length}</p>
          <p className="text-xs mt-1 lmnt-theme-on-success-inactive">Done</p>
        </div>
        <div className="lmnt-theme-secondary-bg lmnt-theme-on-secondary rounded-xl p-4 shadow-md text-center">
          <p className="text-2xl font-bold">{visits.filter(v => v.status === 'pending').length}</p>
          <p className="text-xs mt-1 lmnt-theme-on-secondary-inactive">Pending</p>
        </div>
      </div>

      {/* Visits List */}
      <div className="space-y-3">
        <h3 className="lmnt-theme-on-surface font-semibold text-lg">Scheduled Visits</h3>
        
        {visits.map((visit) => (
          <div
            key={visit.id}
            className={`lmnt-theme-background-bg rounded-xl p-4 shadow-md border transition-all ${
              visit.status === 'completed' 
                ? 'lmnt-theme-divider-success opacity-70' 
                : 'lmnt-theme-divider-primary hover:shadow-lg'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="lmnt-theme-on-surface font-bold text-lg">{visit.doctorName}</h4>
                <p className="lmnt-theme-secondary text-sm">{visit.specialty}</p>
              </div>
              {visit.status === 'completed' && (
                <span className="lmnt-theme-success-bg lmnt-theme-on-success text-xs px-3 py-1 rounded-full">
                  Completed
                </span>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 lmnt-theme-on-surface text-sm">
                <Clock size={16} className="lmnt-theme-secondary" />
                <span>{visit.time}</span>
              </div>
              <div className="flex items-center gap-2 lmnt-theme-on-surface text-sm">
                <MapPin size={16} className="lmnt-theme-secondary" />
                <span>{visit.location}</span>
              </div>
              <div className="flex items-center gap-2 lmnt-theme-on-surface text-sm">
                <Phone size={16} className="lmnt-theme-secondary" />
                <span>{visit.phone}</span>
              </div>
              <div className="flex items-center gap-2 lmnt-theme-on-surface text-sm">
                <Mail size={16} className="lmnt-theme-secondary" />
                <span>{visit.email}</span>
              </div>
            </div>

            {visit.status === 'pending' && (
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-gradient-to-r from-bayer-secondary-500 to-bayer-secondary-600 text-white py-2 rounded-lg text-sm font-semibold hover:shadow-md transition-all hover:from-bayer-secondary-600 hover:to-bayer-secondary-700">
                  Start Visit
                </button>
                <button className="flex-1 lmnt-theme-background-bg lmnt-theme-on-surface py-2 rounded-lg text-sm border-2 lmnt-theme-divider-primary hover:shadow-md transition-all font-semibold hover:border-bayer-secondary-400">
                  Reschedule
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SchedulerView