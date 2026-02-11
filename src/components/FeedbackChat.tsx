import React, { useState, useRef, useEffect } from 'react'
import { X, Send, Sparkles, Award, TrendingUp, CheckCircle2, Star } from 'lucide-react'

interface FeedbackData {
  selectedFeedback: string[]
  rating: number
  activityStatus: {
    meetingReminder: boolean
    eventChecklist: boolean
    weeklyTeamMeet: boolean
    dailyUpdates: boolean
  }
  completionPercentage: number
}

interface Message {
  id: string
  type: 'bot' | 'user'
  text: string
  timestamp: Date
}

interface FeedbackChatProps {
  onClose: () => void
  feedbackData: FeedbackData
}

const FeedbackChat: React.FC<FeedbackChatProps> = ({ onClose, feedbackData }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initial greeting based on feedback
    const completedCount = Object.values(feedbackData.activityStatus).filter(Boolean).length
    const feedbackLabels = feedbackData.selectedFeedback.map(id => {
      const labels: { [key: string]: string } = {
        happy: 'Happy',
        productive: 'Productive',
        success: 'Success',
        improvement: 'Self Improvement',
        missed: 'Missed Opportunity',
        unfair: 'Not Fair'
      }
      return labels[id]
    }).join(', ')

    let greeting = `Hi Murthy! 🎉\n\nThanks for sharing your day with me!\n\n`
    
    // Add completion status
    if (feedbackData.completionPercentage === 100) {
      greeting += `🏆 **Incredible!** You completed ALL your priorities today! That's outstanding!\n\n`
    } else if (completedCount > 0) {
      greeting += `✅ You completed ${completedCount} out of 4 priorities today. Great progress!\n\n`
    }

    // Add rating feedback
    if (feedbackData.rating === 5) {
      greeting += `⭐⭐⭐⭐⭐ A perfect 5-star day! You're absolutely crushing it!\n\n`
    } else if (feedbackData.rating >= 4) {
      greeting += `⭐ You rated today ${feedbackData.rating}/5 - that's a solid day!\n\n`
    } else if (feedbackData.rating >= 3) {
      greeting += `⭐ You rated today ${feedbackData.rating}/5. Every day is a learning opportunity!\n\n`
    } else {
      greeting += `💪 You rated today ${feedbackData.rating}/5. Remember, tough days build resilience!\n\n`
    }

    // Add mood feedback
    if (feedbackLabels) {
      greeting += `I noticed you felt: **${feedbackLabels}** today.\n\n`
    }

    greeting += `Tell me more about your day! What were your biggest wins? Any challenges you'd like to discuss?`

    setMessages([
      {
        id: '1',
        type: 'bot',
        text: greeting,
        timestamp: new Date()
      }
    ])
  }, [feedbackData])

  const generateResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase()
    
    // Contextual responses based on feedback data
    if (lower.includes('visit') || lower.includes('doctor') || lower.includes('call')) {
      return `That's great to hear about your visits! With your ${feedbackData.rating}-star rating today, it sounds like you're making real connections. What made these visits particularly memorable?`
    }

    if (lower.includes('challenge') || lower.includes('difficult') || lower.includes('hard')) {
      return `I appreciate you sharing that challenge. ${feedbackData.completionPercentage === 100 ? 'Despite that, you still completed all your priorities - that shows real determination!' : 'Remember, every challenge is a chance to grow.'} How can I help you prepare better for tomorrow?`
    }

    if (lower.includes('success') || lower.includes('win') || lower.includes('great')) {
      return `🎉 That's fantastic! Your ${feedbackData.rating}-star day is really showing through. These successes add up - you're building momentum! What's your strategy for tomorrow?`
    }

    if (lower.includes('tired') || lower.includes('exhausted') || lower.includes('busy')) {
      return `${feedbackData.completionPercentage === 100 ? 'You completed everything today - no wonder you\'re tired! That\'s dedication.' : 'Busy days can be draining.'} Make sure to recharge tonight. You've earned it! 💪`
    }

    if (lower.includes('tomorrow') || lower.includes('plan') || lower.includes('next')) {
      return `Great mindset! Looking ahead is key. Based on today's ${feedbackData.rating}-star performance, what would make tomorrow even better? I'm here to help you plan!`
    }

    // Default encouraging responses
    const responses = [
      `That's really insightful! Your ${feedbackData.rating}/5 rating tells me you're being honest with yourself, which is the first step to improvement. What else is on your mind?`,
      `I'm listening! ${feedbackData.completionPercentage === 100 ? 'You had a perfect completion day, so you\'re clearly doing something right!' : 'Tell me more about what happened today.'}`,
      `Thanks for sharing that! Every detail helps me understand how to support you better. What would you like to focus on?`,
      `That's valuable feedback! Your honesty helps us make mySAM even better for you. Anything else you'd like to add?`
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputText.trim(),
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputText('')

    // Show typing indicator
    setIsTyping(true)

    // Generate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: generateResponse(inputText.trim()),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-2xl h-[80vh] lmnt-theme-background-bg rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-bayer-secondary-500 via-bayer-secondary-600 to-bayer-secondary-700 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <Sparkles size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Chat with mySAM</h2>
              <p className="text-sm opacity-90">Your daily feedback companion</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
          >
            <X size={28} strokeWidth={2.5} />
          </button>
        </div>

        {/* Feedback Summary Badge */}
        <div className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white p-4 flex items-center justify-around text-center">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={20} />
            <div>
              <p className="text-xl font-bold">{feedbackData.completionPercentage}%</p>
              <p className="text-xs opacity-90">Complete</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Star size={20} className="fill-current" />
            <div>
              <p className="text-xl font-bold">{feedbackData.rating}/5</p>
              <p className="text-xs opacity-90">Rating</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={20} />
            <div>
              <p className="text-xl font-bold">{feedbackData.selectedFeedback.length}</p>
              <p className="text-xs opacity-90">Moods</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-br from-bayer-secondary-500 to-bayer-secondary-600 text-white'
                    : 'lmnt-theme-surface-variant-bg lmnt-theme-on-surface border lmnt-theme-divider-primary'
                }`}
              >
                <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${message.type === 'user' ? 'opacity-80' : 'opacity-60'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="lmnt-theme-surface-variant-bg rounded-2xl p-4 border lmnt-theme-divider-primary">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-bayer-secondary-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-bayer-secondary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-bayer-secondary-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t lmnt-theme-divider-primary bg-gradient-to-r from-bayer-secondary-50 to-transparent">
          <div className="flex items-end gap-3">
            <div className="flex-1 lmnt-theme-background-bg rounded-2xl p-3 border-2 lmnt-theme-divider-primary focus-within:border-bayer-secondary-400 transition-all">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share more about your day..."
                className="w-full bg-transparent lmnt-theme-on-surface resize-none outline-none text-sm"
                rows={2}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className={`rounded-full p-4 shadow-lg transition-all ${
                inputText.trim()
                  ? 'bg-gradient-to-br from-bayer-secondary-500 to-bayer-secondary-600 text-white hover:scale-110 hover:shadow-xl'
                  : 'lmnt-theme-surface-variant-bg lmnt-theme-on-surface opacity-50 cursor-not-allowed'
              }`}
            >
              <Send size={24} strokeWidth={2.5} />
            </button>
          </div>
          
          <p className="text-xs lmnt-theme-on-surface opacity-60 mt-2 text-center">
            💡 Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  )
}

export default FeedbackChat