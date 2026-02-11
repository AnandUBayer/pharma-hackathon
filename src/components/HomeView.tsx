import React, { useState, useEffect } from 'react'
import { 
  Calendar, 
  CheckSquare, 
  Users, 
  Send, 
  Smile, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  AlertCircle, 
  Frown,
  Clock,
  Award,
  Zap,
  Trophy,
  Star,
  Flame,
  Sparkles,
  CheckCircle2,
  X,
  MessageCircle
} from 'lucide-react'
import VoiceChatbot from './VoiceChatbot'

interface ActivityStatus {
  meetingReminder: boolean
  eventChecklist: boolean
  weeklyTeamMeet: boolean
  dailyUpdates: boolean
}

interface FeedbackOption {
  id: string
  label: string
  icon: React.ReactNode
  color: string
  bgColor: string
  gradient: string
  quote: string
}

const HomeView: React.FC = () => {
  const [activityStatus, setActivityStatus] = useState<ActivityStatus>({
    meetingReminder: false,
    eventChecklist: false,
    weeklyTeamMeet: false,
    dailyUpdates: false
  })
  
  const [selectedFeedback, setSelectedFeedback] = useState<string[]>([])
  const [rating, setRating] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [pulseActivity, setPulseActivity] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [activePopup, setActivePopup] = useState<FeedbackOption | null>(null)
  const [showChatbot, setShowChatbot] = useState(false)

  const feedbackOptions: FeedbackOption[] = [
    {
      id: 'happy',
      label: 'Happy',
      icon: <Smile size={32} strokeWidth={2.5} />,
      color: 'lmnt-theme-success',
      bgColor: 'lmnt-theme-success-bg',
      gradient: 'from-teal-400 to-cyan-500',
      quote: "Your positive energy is contagious! Keep spreading joy and making a difference in every interaction. 🌟"
    },
    {
      id: 'productive',
      label: 'Productive',
      icon: <TrendingUp size={32} strokeWidth={2.5} />,
      color: 'lmnt-theme-secondary',
      bgColor: 'lmnt-theme-secondary-bg',
      gradient: 'from-blue-400 to-blue-600',
      quote: "Productivity is your superpower! You're crushing your goals and setting the bar high. Keep up the amazing momentum! 🚀"
    },
    {
      id: 'success',
      label: 'Success',
      icon: <Target size={32} strokeWidth={2.5} />,
      color: 'lmnt-theme-success',
      bgColor: 'lmnt-theme-success-variant-bg',
      gradient: 'from-emerald-400 to-teal-500',
      quote: "Success looks great on you! Every win, big or small, is a step toward excellence. Celebrate this achievement! 🎯"
    },
    {
      id: 'improvement',
      label: 'Self Improvement',
      icon: <Lightbulb size={32} strokeWidth={2.5} />,
      color: 'lmnt-theme-secondary-variant',
      bgColor: 'lmnt-theme-secondary-variant-bg',
      gradient: 'from-sky-400 to-blue-500',
      quote: "Growth mindset activated! Every lesson learned today makes you stronger tomorrow. You're investing in your best self! 💡"
    },
    {
      id: 'missed',
      label: 'Missed Opportunity',
      icon: <AlertCircle size={32} strokeWidth={2.5} />,
      color: 'lmnt-theme-primary',
      bgColor: 'lmnt-theme-primary-variant-bg',
      gradient: 'from-indigo-400 to-purple-500',
      quote: "Every missed opportunity is a lesson in disguise. Tomorrow brings fresh chances to shine. Stay focused and keep pushing forward! 💪"
    },
    {
      id: 'unfair',
      label: 'Not Fair',
      icon: <Frown size={32} strokeWidth={2.5} />,
      color: 'lmnt-theme-primary-variant',
      bgColor: 'lmnt-theme-surface-variant-bg',
      gradient: 'from-slate-400 to-gray-500',
      quote: "Tough days don't define you—your resilience does. Tomorrow is a new opportunity to turn things around. You've got this! 🌈"
    }
  ]

  const toggleActivity = (activity: keyof ActivityStatus) => {
    setActivityStatus(prev => {
      const newStatus = {
        ...prev,
        [activity]: !prev[activity]
      }
      
      // Show celebration when activity is completed
      if (!prev[activity]) {
        setPulseActivity(activity)
        setTimeout(() => setPulseActivity(null), 1000)
        
        // Show confetti when all activities are completed
        const allCompleted = Object.values(newStatus).every(Boolean)
        if (allCompleted) {
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 3000)
        }
      }
      
      return newStatus
    })
  }

  const toggleFeedback = (option: FeedbackOption) => {
    // Show popup with motivational quote
    setActivePopup(option)
    setShowPopup(true)
    
    // Toggle selection
    setSelectedFeedback(prev =>
      prev.includes(option.id)
        ? prev.filter(item => item !== option.id)
        : [...prev, option.id]
    )
  }

  const closePopup = () => {
    setShowPopup(false)
    setTimeout(() => setActivePopup(null), 300)
  }

  const completedActivities = Object.values(activityStatus).filter(Boolean).length
  const totalActivities = Object.keys(activityStatus).length
  const completionPercentage = (completedActivities / totalActivities) * 100

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  })

  // Get streak and level based on completion
  const streak = 5 // This would come from backend
  const level = Math.floor(completedActivities * 2.5)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 relative">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div 
                className={`w-2 h-2 ${
                  i % 4 === 0 ? 'bg-bayer-secondary-400' :
                  i % 4 === 1 ? 'bg-bayer-secondary-600' :
                  i % 4 === 2 ? 'bg-bayer-secondary-300' :
                  'bg-bayer-secondary-500'
                } rounded-full`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Motivational Popup */}
      {showPopup && activePopup && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closePopup}
        >
          <div 
            className={`bg-gradient-to-br ${activePopup.gradient} rounded-3xl p-8 max-w-md w-full shadow-2xl transform animate-scale-in relative`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
            >
              <X size={24} className="text-white" strokeWidth={2.5} />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 rounded-full p-6 animate-bounce-slow">
                {React.cloneElement(activePopup.icon as React.ReactElement, { 
                  size: 64, 
                  className: 'text-white',
                  strokeWidth: 2.5 
                })}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-white text-2xl font-bold text-center mb-4">
              {activePopup.label}
            </h3>

            {/* Motivational Quote */}
            <p className="text-white text-center text-lg leading-relaxed mb-6 font-medium">
              {activePopup.quote}
            </p>

            {/* Sparkles decoration */}
            <div className="flex justify-center gap-2">
              <Sparkles className="text-white opacity-70 animate-pulse" size={20} />
              <Sparkles className="text-white opacity-70 animate-pulse" size={16} style={{ animationDelay: '0.2s' }} />
              <Sparkles className="text-white opacity-70 animate-pulse" size={20} style={{ animationDelay: '0.4s' }} />
            </div>

            {/* XP Reward */}
            <div className="mt-6 bg-white bg-opacity-20 rounded-full px-4 py-2 flex items-center justify-center gap-2">
              <Star size={20} className="text-yellow-300 fill-current" />
              <span className="text-white font-bold">+5 XP</span>
            </div>
          </div>
        </div>
      )}

      {/* Hero Header with Gradient */}
      <div className="relative lmnt-theme-secondary-bg lmnt-theme-on-secondary rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-3xl font-bold">Welcome back, Murthy!</h2>
                <Sparkles className="animate-bounce" size={24} />
              </div>
              <p className="text-sm lmnt-theme-on-secondary-inactive">{today}</p>
              
              {/* Streak Counter */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 bg-white bg-opacity-20 rounded-full px-3 py-1">
                  <Flame className="text-orange-300" size={18} />
                  <span className="text-sm font-bold">{streak} Day Streak!</span>
                </div>
                <div className="flex items-center gap-1 bg-white bg-opacity-20 rounded-full px-3 py-1">
                  <Trophy className="text-yellow-300" size={18} />
                  <span className="text-sm font-bold">Level {level}</span>
                </div>
              </div>
            </div>
            <div className="lmnt-theme-secondary-variant-bg lmnt-theme-on-secondary rounded-2xl p-4 animate-bounce-slow shadow-lg">
              <Award size={32} />
            </div>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="animate-pulse" size={20} />
                <span className="text-sm font-bold">Daily Progress</span>
              </div>
              <span className="text-lg font-bold">{completedActivities}/{totalActivities}</span>
            </div>
            <div className="relative w-full bg-white bg-opacity-20 rounded-full h-4 overflow-hidden shadow-inner">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-2"
                style={{ width: `${completionPercentage}%` }}
              >
                {completionPercentage > 0 && (
                  <Zap size={12} className="text-white animate-pulse" />
                )}
              </div>
              {completionPercentage === 100 && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 h-full rounded-full animate-pulse" />
              )}
            </div>
            {completionPercentage === 100 && (
              <p className="text-center mt-2 text-sm font-bold animate-bounce">
                🎉 Perfect Day! You're crushing it! 🎉
              </p>
            )}
          </div>
        </div>
      </div>

      {/* AI Assistant Quick Access */}
      <button
        onClick={() => setShowChatbot(true)}
        className="w-full lmnt-theme-success-bg lmnt-theme-on-success rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all hover:scale-105 transform"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <MessageCircle size={28} strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg">AI Call Assistant</h3>
              <p className="text-sm lmnt-theme-on-success-inactive">Document your day with voice or text</p>
            </div>
          </div>
          <Sparkles size={24} className="animate-pulse" />
        </div>
      </button>

      {/* Gamified Activity Trackers with Enhanced Visuals */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="lmnt-theme-on-surface font-bold text-xl flex items-center gap-2">
            <Sparkles className="lmnt-theme-secondary animate-pulse" size={24} />
            Today's Priorities
          </h3>
          <div className="text-sm lmnt-theme-on-surface opacity-70">
            Complete all for bonus XP!
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Meeting Reminder */}
          <button
            onClick={() => toggleActivity('meetingReminder')}
            className={`relative rounded-2xl p-5 shadow-lg transition-all duration-300 transform ${
              activityStatus.meetingReminder
                ? 'lmnt-theme-success-bg lmnt-theme-on-success scale-105 shadow-2xl'
                : 'lmnt-theme-background-bg lmnt-theme-on-surface border-2 lmnt-theme-divider-primary hover:scale-105 hover:shadow-xl'
            } ${pulseActivity === 'meetingReminder' ? 'animate-pulse-once' : ''}`}
          >
            {activityStatus.meetingReminder && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-2 shadow-lg animate-bounce">
                <CheckCircle2 size={20} className="text-white" strokeWidth={3} />
              </div>
            )}
            <div className="flex flex-col items-center gap-3 text-center">
              <div className={`${activityStatus.meetingReminder ? 'animate-wiggle' : ''}`}>
                <Calendar size={40} strokeWidth={activityStatus.meetingReminder ? 2.5 : 2} />
              </div>
              <span className="text-sm font-bold">Meeting Reminder</span>
              <span className="text-xs opacity-70">Doctor visits scheduled</span>
              {activityStatus.meetingReminder && (
                <div className="flex items-center gap-1 text-xs font-bold">
                  <Star size={12} className="fill-current" />
                  <span>+10 XP</span>
                </div>
              )}
            </div>
          </button>

          {/* Event Checklist */}
          <button
            onClick={() => toggleActivity('eventChecklist')}
            className={`relative rounded-2xl p-5 shadow-lg transition-all duration-300 transform ${
              activityStatus.eventChecklist
                ? 'lmnt-theme-success-bg lmnt-theme-on-success scale-105 shadow-2xl'
                : 'lmnt-theme-background-bg lmnt-theme-on-surface border-2 lmnt-theme-divider-primary hover:scale-105 hover:shadow-xl'
            } ${pulseActivity === 'eventChecklist' ? 'animate-pulse-once' : ''}`}
          >
            {activityStatus.eventChecklist && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-2 shadow-lg animate-bounce">
                <CheckCircle2 size={20} className="text-white" strokeWidth={3} />
              </div>
            )}
            <div className="flex flex-col items-center gap-3 text-center">
              <div className={`${activityStatus.eventChecklist ? 'animate-wiggle' : ''}`}>
                <CheckSquare size={40} strokeWidth={activityStatus.eventChecklist ? 2.5 : 2} />
              </div>
              <span className="text-sm font-bold">Event Checklist</span>
              <span className="text-xs opacity-70">Materials ready</span>
              {activityStatus.eventChecklist && (
                <div className="flex items-center gap-1 text-xs font-bold">
                  <Star size={12} className="fill-current" />
                  <span>+10 XP</span>
                </div>
              )}
            </div>
          </button>

          {/* Weekly Team Meet */}
          <button
            onClick={() => toggleActivity('weeklyTeamMeet')}
            className={`relative rounded-2xl p-5 shadow-lg transition-all duration-300 transform ${
              activityStatus.weeklyTeamMeet
                ? 'lmnt-theme-success-bg lmnt-theme-on-success scale-105 shadow-2xl'
                : 'lmnt-theme-background-bg lmnt-theme-on-surface border-2 lmnt-theme-divider-primary hover:scale-105 hover:shadow-xl'
            } ${pulseActivity === 'weeklyTeamMeet' ? 'animate-pulse-once' : ''}`}
          >
            {activityStatus.weeklyTeamMeet && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-2 shadow-lg animate-bounce">
                <CheckCircle2 size={20} className="text-white" strokeWidth={3} />
              </div>
            )}
            <div className="flex flex-col items-center gap-3 text-center">
              <div className={`${activityStatus.weeklyTeamMeet ? 'animate-wiggle' : ''}`}>
                <Users size={40} strokeWidth={activityStatus.weeklyTeamMeet ? 2.5 : 2} />
              </div>
              <span className="text-sm font-bold">Weekly Team Meet</span>
              <span className="text-xs opacity-70">Collaborate & sync</span>
              {activityStatus.weeklyTeamMeet && (
                <div className="flex items-center gap-1 text-xs font-bold">
                  <Star size={12} className="fill-current" />
                  <span>+10 XP</span>
                </div>
              )}
            </div>
          </button>

          {/* Daily Updates */}
          <button
            onClick={() => toggleActivity('dailyUpdates')}
            className={`relative rounded-2xl p-5 shadow-lg transition-all duration-300 transform ${
              activityStatus.dailyUpdates
                ? 'lmnt-theme-success-bg lmnt-theme-on-success scale-105 shadow-2xl'
                : 'lmnt-theme-background-bg lmnt-theme-on-surface border-2 lmnt-theme-divider-primary hover:scale-105 hover:shadow-xl'
            } ${pulseActivity === 'dailyUpdates' ? 'animate-pulse-once' : ''}`}
          >
            {activityStatus.dailyUpdates && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-2 shadow-lg animate-bounce">
                <CheckCircle2 size={20} className="text-white" strokeWidth={3} />
              </div>
            )}
            <div className="flex flex-col items-center gap-3 text-center">
              <div className={`${activityStatus.dailyUpdates ? 'animate-wiggle' : ''}`}>
                <Send size={40} strokeWidth={activityStatus.dailyUpdates ? 2.5 : 2} />
              </div>
              <span className="text-sm font-bold">Daily Updates</span>
              <span className="text-xs opacity-70">Report to manager</span>
              {activityStatus.dailyUpdates && (
                <div className="flex items-center gap-1 text-xs font-bold">
                  <Star size={12} className="fill-current" />
                  <span>+10 XP</span>
                </div>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Enhanced Performance Summary */}
      <div className="relative lmnt-theme-secondary-bg lmnt-theme-on-secondary rounded-2xl p-6 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl opacity-10" />
        <div className="relative z-10">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Clock size={20} />
            Today's Summary
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white bg-opacity-10 rounded-xl">
              <p className="text-3xl font-bold">8/8</p>
              <p className="text-xs mt-1 lmnt-theme-on-secondary-inactive">Visits</p>
            </div>
            <div className="text-center p-3 bg-white bg-opacity-10 rounded-xl">
              <p className="text-3xl font-bold">87%</p>
              <p className="text-xs mt-1 lmnt-theme-on-secondary-inactive">Success</p>
            </div>
            <div className="text-center p-3 bg-white bg-opacity-10 rounded-xl">
              <p className="text-3xl font-bold">5</p>
              <p className="text-xs mt-1 lmnt-theme-on-secondary-inactive">Prescriptions</p>
            </div>
            <div className="text-center p-3 bg-white bg-opacity-10 rounded-xl">
              <p className="text-3xl font-bold">3</p>
              <p className="text-xs mt-1 lmnt-theme-on-secondary-inactive">Follow-ups</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Feedback Options with Gradients */}
      <div className="space-y-4">
        <h3 className="lmnt-theme-on-surface font-bold text-xl flex items-center gap-2">
          <TrendingUp className="lmnt-theme-secondary animate-pulse" size={24} />
          How Did It Go?
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {feedbackOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleFeedback(option)}
              className={`relative rounded-2xl p-6 shadow-lg transition-all duration-300 transform ${
                selectedFeedback.includes(option.id)
                  ? `bg-gradient-to-br ${option.gradient} text-white border-2 border-white scale-105 shadow-2xl`
                  : 'lmnt-theme-background-bg lmnt-theme-on-surface border-2 lmnt-theme-divider-primary hover:scale-105 hover:shadow-xl'
              }`}
            >
              {selectedFeedback.includes(option.id) && (
                <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg">
                  <CheckCircle2 size={20} className="text-green-500" strokeWidth={3} />
                </div>
              )}
              <div className="flex flex-col items-center gap-3">
                <div className={selectedFeedback.includes(option.id) ? 'animate-bounce-slow' : ''}>
                  {option.icon}
                </div>
                <span className="text-sm font-bold text-center">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Rating Section */}
      <div className="lmnt-theme-background-bg rounded-2xl p-6 shadow-xl border-2 lmnt-theme-divider-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-bayer-secondary-200 to-transparent rounded-full blur-2xl opacity-30" />
        <div className="relative z-10">
          <h3 className="lmnt-theme-on-surface font-bold text-xl mb-4 flex items-center gap-2">
            <Target className="lmnt-theme-secondary" size={24} />
            Rate Your Day
          </h3>
          <div className="flex justify-center gap-3 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-5xl transition-all duration-300 ${
                  star <= rating 
                    ? 'lmnt-theme-secondary scale-110 animate-bounce-slow' 
                    : 'lmnt-theme-on-surface opacity-30 hover:scale-110'
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <p className="text-center lmnt-theme-on-surface text-sm font-semibold">
            {rating === 0 && '⭐ Tap to rate your day'}
            {rating === 1 && '💪 Challenging day - Tomorrow will be better!'}
            {rating === 2 && '📈 Room for improvement'}
            {rating === 3 && '👍 Solid average day'}
            {rating === 4 && '🎯 Great day!'}
            {rating === 5 && '🏆 Excellent day! You\'re a superstar!'}
          </p>
        </div>
      </div>

      {/* Enhanced Submit Button */}
      <button
        disabled={selectedFeedback.length === 0 || rating === 0}
        className={`w-full py-5 rounded-2xl font-bold shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg ${
          selectedFeedback.length > 0 && rating > 0
            ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white hover:shadow-2xl hover:scale-105 transform'
            : 'lmnt-theme-surface-variant-bg lmnt-theme-on-surface opacity-50 cursor-not-allowed'
        }`}
      >
        <Send size={24} />
        <span>Submit Daily Feedback</span>
        {selectedFeedback.length > 0 && rating > 0 && (
          <Sparkles size={20} className="animate-pulse" />
        )}
      </button>

      {/* Voice Chatbot */}
      {showChatbot && <VoiceChatbot onClose={() => setShowChatbot(false)} />}
    </div>
  )
}

export default HomeView