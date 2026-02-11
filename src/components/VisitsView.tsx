import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, CheckCircle, XCircle, User } from 'lucide-react'

interface Doctor {
  id: number
  name: string
  specialty: string
  hospital: string
  phone: string
  email: string
  lastVisit: string
  status: 'active' | 'pending' | 'inactive'
}

const VisitsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'inactive'>('all')

  const doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      hospital: 'City Hospital',
      phone: '+1 234-567-8901',
      email: 'sarah.j@cityhospital.com',
      lastVisit: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      hospital: 'Metro Medical Center',
      phone: '+1 234-567-8902',
      email: 'mchen@metromedical.com',
      lastVisit: '2024-01-14',
      status: 'active'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      hospital: 'Children\'s Hospital',
      phone: '+1 234-567-8903',
      email: 'e.rodriguez@childrens.com',
      lastVisit: '2024-01-10',
      status: 'pending'
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      hospital: 'Sports Medicine Clinic',
      phone: '+1 234-567-8904',
      email: 'jwilson@sportsmed.com',
      lastVisit: '2024-01-08',
      status: 'active'
    },
    {
      id: 5,
      name: 'Dr. Lisa Anderson',
      specialty: 'Oncology',
      hospital: 'Cancer Treatment Center',
      phone: '+1 234-567-8905',
      email: 'landerson@cancercenter.com',
      lastVisit: '2023-12-20',
      status: 'inactive'
    }
  ]

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || doctor.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'lmnt-theme-success-bg lmnt-theme-on-success'
      case 'pending':
        return 'lmnt-theme-secondary-variant-bg lmnt-theme-on-secondary'
      case 'inactive':
        return 'lmnt-theme-surface-variant-bg lmnt-theme-on-surface'
      default:
        return 'lmnt-theme-surface-variant-bg lmnt-theme-on-surface'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="lmnt-theme-on-surface text-2xl font-bold">Doctor Visits</h2>
        <p className="lmnt-theme-on-surface opacity-70 text-sm">Manage your doctor relationships</p>
      </div>

      {/* Search Bar */}
      <div className="lmnt-theme-background-bg rounded-xl p-4 shadow-md border lmnt-theme-divider-primary">
        <input
          type="text"
          placeholder="Search doctors, specialties, or hospitals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 rounded-lg border lmnt-theme-divider-primary lmnt-theme-on-surface"
        />
      </div>

      {/* Filter Buttons - Primary Style */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
            filterStatus === 'all'
              ? 'bg-gradient-to-r from-bayer-secondary-500 to-bayer-secondary-600 text-white shadow-lg'
              : 'lmnt-theme-background-bg lmnt-theme-on-surface border-2 lmnt-theme-divider-primary hover:border-bayer-secondary-400'
          }`}
        >
          All ({doctors.length})
        </button>
        <button
          onClick={() => setFilterStatus('active')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
            filterStatus === 'active'
              ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-lg'
              : 'lmnt-theme-background-bg lmnt-theme-on-surface border-2 lmnt-theme-divider-primary hover:border-bayer-secondary-400'
          }`}
        >
          Active ({doctors.filter(d => d.status === 'active').length})
        </button>
        <button
          onClick={() => setFilterStatus('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
            filterStatus === 'pending'
              ? 'bg-gradient-to-r from-bayer-secondary-400 to-bayer-secondary-500 text-white shadow-lg'
              : 'lmnt-theme-background-bg lmnt-theme-on-surface border-2 lmnt-theme-divider-primary hover:border-bayer-secondary-400'
          }`}
        >
          Pending ({doctors.filter(d => d.status === 'pending').length})
        </button>
        <button
          onClick={() => setFilterStatus('inactive')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
            filterStatus === 'inactive'
              ? 'lmnt-theme-surface-variant-bg lmnt-theme-on-surface shadow-lg'
              : 'lmnt-theme-background-bg lmnt-theme-on-surface border-2 lmnt-theme-divider-primary hover:border-bayer-secondary-400'
          }`}
        >
          Inactive ({doctors.filter(d => d.status === 'inactive').length})
        </button>
      </div>

      {/* Doctors List */}
      <div className="space-y-3">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="lmnt-theme-background-bg rounded-xl p-4 shadow-md border lmnt-theme-divider-primary hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="lmnt-theme-secondary-bg lmnt-theme-on-secondary rounded-full p-3">
                  <User size={24} />
                </div>
                <div>
                  <h4 className="lmnt-theme-on-surface font-bold text-lg">{doctor.name}</h4>
                  <p className="lmnt-theme-secondary text-sm">{doctor.specialty}</p>
                </div>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(doctor.status)}`}>
                {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
              </span>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 lmnt-theme-on-surface text-sm">
                <MapPin size={16} className="lmnt-theme-secondary" />
                <span>{doctor.hospital}</span>
              </div>
              <div className="flex items-center gap-2 lmnt-theme-on-surface text-sm">
                <Phone size={16} className="lmnt-theme-secondary" />
                <span>{doctor.phone}</span>
              </div>
              <div className="flex items-center gap-2 lmnt-theme-on-surface text-sm">
                <Mail size={16} className="lmnt-theme-secondary" />
                <span>{doctor.email}</span>
              </div>
              <div className="flex items-center gap-2 lmnt-theme-on-surface text-sm">
                <Clock size={16} className="lmnt-theme-secondary" />
                <span>Last visit: {new Date(doctor.lastVisit).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-gradient-to-r from-bayer-secondary-500 to-bayer-secondary-600 text-white py-2 rounded-lg text-sm font-semibold hover:shadow-md transition-all hover:from-bayer-secondary-600 hover:to-bayer-secondary-700">
                Schedule Visit
              </button>
              <button className="flex-1 lmnt-theme-background-bg lmnt-theme-on-surface py-2 rounded-lg text-sm border-2 lmnt-theme-divider-primary hover:shadow-md transition-all font-semibold hover:border-bayer-secondary-400">
                View History
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <p className="lmnt-theme-on-surface opacity-70">No doctors found matching your criteria</p>
        </div>
      )}
    </div>
  )
}

export default VisitsView