import React, { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Send, X, Minimize2, Maximize2, MessageCircle, Volume2, VolumeX } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'bot'
  text: string
  timestamp: Date
}

interface VoiceChatbotProps {
  onClose?: () => void
}

const VoiceChatbot: React.FC<VoiceChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Hi Murthy! 👋 I'm your AI assistant. Tell me about your day - I'll help you document your calls and activities. You can speak or type!",
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = ''
        let finalTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPiece = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPiece + ' '
          } else {
            interimTranscript += transcriptPiece
          }
        }

        setTranscript(finalTranscript || interimTranscript)
        
        if (finalTranscript) {
          setInputText(prev => prev + finalTranscript)
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      setTranscript('')
    } else {
      recognitionRef.current?.start()
      setIsListening(true)
    }
  }

  const speakText = (text: string) => {
    if (synthRef.current && !isSpeaking) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.0
      utterance.pitch = 1.0
      utterance.volume = 1.0
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      
      synthRef.current.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Context-aware responses
    if (lowerMessage.includes('visit') || lowerMessage.includes('doctor') || lowerMessage.includes('met')) {
      return "Great! I've noted that visit. Can you tell me more about the outcome? Did you discuss any specific products or get any commitments?"
    }
    
    if (lowerMessage.includes('prescription') || lowerMessage.includes('sample')) {
      return "Excellent work on securing that! How many samples did you provide? Any follow-up needed?"
    }
    
    if (lowerMessage.includes('follow up') || lowerMessage.includes('callback')) {
      return "I've recorded that follow-up. When would you like to schedule the next interaction?"
    }
    
    if (lowerMessage.includes('challenge') || lowerMessage.includes('difficult') || lowerMessage.includes('issue')) {
      return "I understand. Let me note that challenge. What support do you need from the team to address this?"
    }
    
    if (lowerMessage.includes('success') || lowerMessage.includes('great') || lowerMessage.includes('excellent')) {
      return "That's fantastic! 🎉 Your hard work is paying off. Anything else you'd like to share about today?"
    }
    
    // Default responses
    const responses = [
      "Got it! I've recorded that. What else happened today?",
      "Thanks for sharing! Tell me more about your interactions.",
      "Noted! Any other important details from today?",
      "Perfect! I'm documenting everything. Continue when you're ready.",
      "Understood. How did the rest of your day go?"
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

    // Generate and add bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: generateBotResponse(inputText.trim()),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      speakText(botResponse.text)
    }, 800)

    setInputText('')
    setTranscript('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-24 right-4 lmnt-theme-secondary-bg lmnt-theme-on-secondary rounded-full p-4 shadow-2xl hover:scale-110 transition-transform z-40 animate-bounce-slow"
      >
        <MessageCircle size={28} />
        {isListening && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>
    )
  }

  return (
    <div className="fixed bottom-20 right-4 w-[calc(100%-2rem)] max-w-md lmnt-theme-background-bg rounded-3xl shadow-2xl border-2 lmnt-theme-divider-primary z-40 flex flex-col max-h-[70vh]">
      {/* Header */}
      <div className="lmnt-theme-secondary-bg lmnt-theme-on-secondary rounded-t-3xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <MessageCircle size={24} />
            {isListening && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            )}
          </div>
          <div>
            <h3 className="font-bold">AI Call Assistant</h3>
            <p className="text-xs lmnt-theme-on-secondary-inactive">
              {isListening ? '🎤 Listening...' : 'Ready to help'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
          >
            <Minimize2 size={20} />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] max-h-[400px]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                message.type === 'user'
                  ? 'lmnt-theme-secondary-bg lmnt-theme-on-secondary'
                  : 'lmnt-theme-surface-variant-bg lmnt-theme-on-surface'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-60 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {transcript && isListening && (
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl p-3 bg-bayer-secondary-100 border-2 border-bayer-secondary-400 border-dashed">
              <p className="text-sm lmnt-theme-on-surface opacity-70 italic">{transcript}</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t lmnt-theme-divider-primary">
        <div className="flex items-end gap-2">
          <div className="flex-1 lmnt-theme-surface-variant-bg rounded-2xl p-3 border lmnt-theme-divider-primary">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type or speak your notes..."
              className="w-full bg-transparent lmnt-theme-on-surface resize-none outline-none text-sm"
              rows={2}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <button
              onClick={toggleListening}
              className={`rounded-full p-3 shadow-lg transition-all ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'lmnt-theme-secondary-bg lmnt-theme-on-secondary hover:scale-110'
              }`}
            >
              {isListening ? <MicOff size={24} /> : <Mic size={24} />}
            </button>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className={`rounded-full p-3 shadow-lg transition-all ${
                inputText.trim()
                  ? 'lmnt-theme-success-bg lmnt-theme-on-success hover:scale-110'
                  : 'lmnt-theme-surface-variant-bg lmnt-theme-on-surface opacity-50 cursor-not-allowed'
              }`}
            >
              <Send size={24} />
            </button>
          </div>
        </div>

        {/* Voice Controls */}
        <div className="flex items-center justify-between mt-2 px-2">
          <div className="flex items-center gap-2">
            {isListening && (
              <div className="flex items-center gap-1">
                <div className="w-1 h-3 bg-red-500 rounded-full animate-pulse" />
                <div className="w-1 h-4 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                <div className="w-1 h-5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-1 h-4 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                <div className="w-1 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            )}
          </div>
          
          <button
            onClick={isSpeaking ? stopSpeaking : undefined}
            className={`text-xs flex items-center gap-1 px-2 py-1 rounded-full transition-all ${
              isSpeaking
                ? 'lmnt-theme-secondary-bg lmnt-theme-on-secondary'
                : 'lmnt-theme-on-surface opacity-50'
            }`}
          >
            {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span>{isSpeaking ? 'Stop' : 'Voice'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default VoiceChatbot