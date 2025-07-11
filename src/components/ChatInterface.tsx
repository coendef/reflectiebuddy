'use client'

import { useState, useRef, useEffect } from 'react'
import { Badge } from '@/components/Badge'

interface Message {
  id: string
  type: 'user' | 'bot' | 'badge'
  content: string
  timestamp: Date
  reflectionPhase?: string
  emotion?: string
  badge?: BadgeData
}

interface BadgeData {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

const REFLECTION_PHASES = {
  description: {
    name: 'Beschrijving',
    icon: '📝',
    color: 'blue',
    questions: [
      "Kun je me vertellen wat er precies gebeurde in de klas?",
      "Welke gedragsproblemen heb je vandaag ervaren?",
      "Beschrijf de situatie zo concreet mogelijk - wie was erbij betrokken?"
    ]
  },
  feelings: {
    name: 'Gevoelens',
    icon: '💭',
    color: 'purple',
    questions: [
      "Hoe voelde je je tijdens deze situatie?",
      "Welke emoties kwamen er bij je op?",
      "Wat ging er door je hoofd toen dit gebeurde?"
    ]
  },
  evaluation: {
    name: 'Evaluatie',
    icon: '⚖️',
    color: 'green',
    questions: [
      "Wat ging er goed in deze situatie?",
      "Wat had beter gekund?",
      "Hoe reageerden de leerlingen op jouw aanpak?"
    ]
  },
  analysis: {
    name: 'Analyse',
    icon: '🔍',
    color: 'orange',
    questions: [
      "Waarom denk je dat deze situatie zo verliep?",
      "Welke factoren speelden een rol?",
      "Wat was de onderliggende oorzaak van het gedragsprobleem?"
    ]
  },
  conclusion: {
    name: 'Conclusie',
    icon: '💡',
    color: 'teal',
    questions: [
      "Wat heb je geleerd van deze ervaring?",
      "Welke inzichten heb je gekregen?",
      "Wat zou je anders doen als dit opnieuw gebeurt?"
    ]
  },
  action: {
    name: 'Actieplan',
    icon: '🎯',
    color: 'red',
    questions: [
      "Welke concrete stappen ga je nemen?",
      "Hoe ga je dit toepassen in je volgende les?",
      "Welke vaardigheden wil je verder ontwikkelen?"
    ]
  }
}

const AVAILABLE_BADGES = [
  {
    id: 'first_reflection',
    name: 'Eerste Stappen',
    description: 'Je eerste reflectie voltooid!',
    icon: '🌱',
    color: 'green',
    trigger: 'first_message'
  },
  {
    id: 'emotion_explorer',
    name: 'Emotie Ontdekkingsreiziger',
    description: 'Je hebt je gevoelens erkend en benoemd',
    icon: '💭',
    color: 'blue',
    trigger: 'feelings_phase'
  },
  {
    id: 'deep_thinker',
    name: 'Diepe Denker',
    description: 'Je hebt diepgaand geanalyseerd',
    icon: '🧠',
    color: 'purple',
    trigger: 'analysis_phase'
  },
  {
    id: 'action_hero',
    name: 'Actie Held',
    description: 'Concrete actiepunten geformuleerd!',
    icon: '🎯',
    color: 'red',
    trigger: 'action_phase'
  },
  {
    id: 'full_cycle',
    name: 'Volledige Cyclus',
    description: 'Een complete Gibbs cyclus doorlopen!',
    icon: '🔄',
    color: 'yellow',
    trigger: 'complete_cycle'
  },
  {
    id: 'empathy_master',
    name: 'Empathie Meester',
    description: 'Je toont begrip voor leerlingen',
    icon: '❤️',
    color: 'pink',
    trigger: 'empathy_detected'
  },
  {
    id: 'theory_connector',
    name: 'Theorie Verbinder',
    description: 'Je koppelt ervaring aan theorie',
    icon: '🔗',
    color: 'teal',
    trigger: 'theory_mentioned'
  },
  {
    id: 'growth_mindset',
    name: 'Groeimindset',
    description: 'Je leert van uitdagingen!',
    icon: '📈',
    color: 'indigo',
    trigger: 'growth_detected'
  }
]

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hoi! Ik ben je Reflectie-Buddy 🤝\n\nIk help je graag bij het reflecteren op je klaservaringen. We gaan samen door de stappen van Gibbs' reflectiecyclus.\n\nVertel me eens: heb je vandaag een uitdagende situatie meegemaakt in de klas?",
      timestamp: new Date(),
      reflectionPhase: 'description'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<keyof typeof REFLECTION_PHASES>('description')
  const [completedPhases, setCompletedPhases] = useState<string[]>([])
  const [earnedBadges, setEarnedBadges] = useState<string[]>([])
  const [messageCount, setMessageCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const detectEmotion = (text: string): string => {
    const emotionKeywords = {
      frustrated: ['gefrustreerd', 'boos', 'geïrriteerd', 'kwaad'],
      anxious: ['zenuwachtig', 'onzeker', 'bang', 'gestrest'],
      confident: ['zelfverzekerd', 'trots', 'goed', 'succesvol'],
      overwhelmed: ['overweldigd', 'te veel', 'chaos', 'druk'],
      sad: ['verdrietig', 'teleurgesteld', 'down', 'somber']
    }

    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      if (keywords.some(keyword => text.toLowerCase().includes(keyword))) {
        return emotion
      }
    }
    return 'neutral'
  }

  const checkForBadgeTriggers = (userMessage: string, phase: keyof typeof REFLECTION_PHASES) => {
    const newBadges: BadgeData[] = []
    
    // First message badge
    if (messageCount === 0 && !earnedBadges.includes('first_reflection')) {
      const badge = AVAILABLE_BADGES.find(b => b.id === 'first_reflection')
      if (badge) newBadges.push(badge)
    }

    // Phase-specific badges
    if (phase === 'feelings' && !earnedBadges.includes('emotion_explorer')) {
      const badge = AVAILABLE_BADGES.find(b => b.id === 'emotion_explorer')
      if (badge) newBadges.push(badge)
    }

    if (phase === 'analysis' && !earnedBadges.includes('deep_thinker')) {
      const badge = AVAILABLE_BADGES.find(b => b.id === 'deep_thinker')
      if (badge) newBadges.push(badge)
    }

    if (phase === 'action' && !earnedBadges.includes('action_hero')) {
      const badge = AVAILABLE_BADGES.find(b => b.id === 'action_hero')
      if (badge) newBadges.push(badge)
    }

    // Content-based badges
    const lowerMessage = userMessage.toLowerCase()
    
    if ((lowerMessage.includes('leerling') || lowerMessage.includes('kind')) && 
        (lowerMessage.includes('begrijp') || lowerMessage.includes('snap')) && 
        !earnedBadges.includes('empathy_master')) {
      const badge = AVAILABLE_BADGES.find(b => b.id === 'empathy_master')
      if (badge) newBadges.push(badge)
    }

    if ((lowerMessage.includes('theorie') || lowerMessage.includes('model') || lowerMessage.includes('methode')) && 
        !earnedBadges.includes('theory_connector')) {
      const badge = AVAILABLE_BADGES.find(b => b.id === 'theory_connector')
      if (badge) newBadges.push(badge)
    }

    if ((lowerMessage.includes('leren') || lowerMessage.includes('groeien') || lowerMessage.includes('ontwikkelen')) && 
        !earnedBadges.includes('growth_mindset')) {
      const badge = AVAILABLE_BADGES.find(b => b.id === 'growth_mindset')
      if (badge) newBadges.push(badge)
    }

    // Complete cycle badge
    if (completedPhases.length === 5 && !earnedBadges.includes('full_cycle')) {
      const badge = AVAILABLE_BADGES.find(b => b.id === 'full_cycle')
      if (badge) newBadges.push(badge)
    }

    return newBadges
  }

  const addBadgeMessage = (badge: BadgeData) => {
    const badgeMessage: Message = {
      id: `badge-${Date.now()}`,
      type: 'badge',
      content: `🎉 Badge behaald: ${badge.name}!`,
      timestamp: new Date(),
      badge: badge
    }
    
    setMessages(prev => [...prev, badgeMessage])
    setEarnedBadges(prev => [...prev, badge.id])
  }

  const generateBotResponse = async (userMessage: string, phase: keyof typeof REFLECTION_PHASES) => {
    const emotion = detectEmotion(userMessage)
    
    const prompt = `Je bent een empathische AI-begeleider voor pabo-studenten. 
    
Huidige reflectiefase: ${REFLECTION_PHASES[phase].name}
Gebruiker emotie: ${emotion}
Gebruiker bericht: "${userMessage}"

Reageer empathisch en stel een vervolgvraag die past bij de ${REFLECTION_PHASES[phase].name} fase van Gibbs' reflectiecyclus.

Richtlijnen:
- Gebruik een warme, ondersteunende toon
- Erken de emotie van de student
- Stel een concrete vervolgvraag
- Bied waar relevant theoretische koppeling
- Geef praktische tips voor de klasprkatijk
- Gebruik Nederlandse taal, informeel maar professioneel

Antwoord in maximaal 3 zinnen.`

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          aiModel: 'smart'
        })
      })

      if (response.ok) {
        const data = await response.json()
        return data.response
      } else {
        return generateFallbackResponse(phase, emotion)
      }
    } catch (error) {
      return generateFallbackResponse(phase, emotion)
    }
  }

  const generateFallbackResponse = (phase: keyof typeof REFLECTION_PHASES, emotion: string) => {
    const empathyResponses = {
      frustrated: "Ik begrijp dat dit frustrerend was voor je. ",
      anxious: "Het klinkt alsof je je onzeker voelde. Dat is heel normaal! ",
      confident: "Wat fijn dat je je zelfverzekerd voelde! ",
      overwhelmed: "Het lijkt alsof het veel was om te verwerken. ",
      sad: "Ik hoor dat dit je raakte. ",
      neutral: "Bedankt voor het delen van je ervaring. "
    }

    const empathy = empathyResponses[emotion as keyof typeof empathyResponses] || empathyResponses.neutral
    const questions = REFLECTION_PHASES[phase].questions
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
    
    return `${empathy}${randomQuestion}`
  }

  const getNextPhase = (current: keyof typeof REFLECTION_PHASES): keyof typeof REFLECTION_PHASES => {
    const phases = Object.keys(REFLECTION_PHASES) as (keyof typeof REFLECTION_PHASES)[]
    const currentIndex = phases.indexOf(current)
    return phases[(currentIndex + 1) % phases.length]
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    const newMessageCount = messageCount + 1
    setMessageCount(newMessageCount)
    
    // Show Word export button after 3 messages
    if (newMessageCount >= 3) {
      setShowWordExport(true)
    }

    // Check for badge triggers
    const newBadges = checkForBadgeTriggers(inputMessage, currentPhase)
    
    // Generate bot response
    const botResponse = await generateBotResponse(inputMessage, currentPhase)
    
    // Mark current phase as completed and move to next
    if (!completedPhases.includes(currentPhase)) {
      setCompletedPhases(prev => [...prev, currentPhase])
    }

    const nextPhase = getNextPhase(currentPhase)
    setCurrentPhase(nextPhase)

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: botResponse,
      timestamp: new Date(),
      reflectionPhase: nextPhase
    }

    setTimeout(() => {
      setMessages(prev => [...prev, botMessage])
      setIsLoading(false)
      
      // Add badge messages after bot response
      newBadges.forEach((badge, index) => {
        setTimeout(() => addBadgeMessage(badge), (index + 1) * 1000)
      })
    }, 1000)
  }

  const exportToWord = async () => {
    try {
      // Dynamic import to avoid SSR issues
      const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import('docx')
      
      // Filter out badge messages for cleaner export
      const chatMessages = messages.filter(msg => msg.type !== 'badge')
      
      // Create document sections
      const children = [
        new Paragraph({
          text: "Reflectie Gesprek - Reflectie-Buddy",
          heading: HeadingLevel.TITLE,
        }),
        new Paragraph({
          text: `Datum: ${new Date().toLocaleDateString('nl-NL')}`,
          spacing: { after: 400 }
        }),
        new Paragraph({
          text: "Gespreksverlauf:",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
        })
      ]
      
      // Add each message to the document
      chatMessages.forEach((message, index) => {
        const isUser = message.type === 'user'
        const speaker = isUser ? 'Student' : 'Reflectie-Buddy'
        const time = message.timestamp.toLocaleTimeString('nl-NL', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
        
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${speaker} (${time}):`,
                bold: true,
                color: isUser ? "2563eb" : "059669"
              })
            ],
            spacing: { before: 200 }
          }),
          new Paragraph({
            text: message.content,
            spacing: { after: 200 }
          })
        )
      })
      
      // Add reflection summary
      children.push(
        new Paragraph({
          text: "Reflectie Samenvatting:",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 600, after: 200 }
        }),
        new Paragraph({
          text: `Doorlopen fasen: ${completedPhases.length}/6`,
          spacing: { after: 100 }
        }),
        new Paragraph({
          text: `Behaalde badges: ${earnedBadges.length}`,
          spacing: { after: 100 }
        }),
        new Paragraph({
          text: `Totaal berichten: ${chatMessages.length}`,
          spacing: { after: 400 }
        })
      )
      
      // Create and download document
      const doc = new Document({
        sections: [{
          properties: {},
          children: children
        }]
      })
      
      const blob = await Packer.toBlob(doc)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Reflectie-${new Date().toLocaleDateString('nl-NL').replace(/\//g, '-')}.docx`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
    } catch (error) {
      console.error('Error exporting to Word:', error)
      alert('Er is een fout opgetreden bij het exporteren naar Word.')
    }
  }
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Reflection Progress */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-6 border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Reflectie Voortgang</h3>
          {earnedBadges.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Badges:</span>
              <div className="flex space-x-1">
                {earnedBadges.slice(-3).map(badgeId => {
                  const badge = AVAILABLE_BADGES.find(b => b.id === badgeId)
                  return badge ? (
                    <span key={badgeId} className="text-lg" title={badge.name}>
                      {badge.icon}
                    </span>
                  ) : null
                })}
                {earnedBadges.length > 3 && (
                  <span className="text-sm text-gray-500">+{earnedBadges.length - 3}</span>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(REFLECTION_PHASES).map(([key, phase]) => (
            <div
              key={key}
              className={`p-3 rounded-lg text-center transition-all ${
                completedPhases.includes(key)
                  ? 'bg-green-100 border-2 border-green-300'
                  : currentPhase === key
                  ? 'bg-blue-100 border-2 border-blue-300 ring-2 ring-blue-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="text-2xl mb-1">{phase.icon}</div>
              <div className="text-xs font-medium text-gray-700">{phase.name}</div>
              {completedPhases.includes(key) && (
                <div className="text-green-600 text-xs mt-1">✓ Voltooid</div>
              )}
              {currentPhase === key && !completedPhases.includes(key) && (
                <div className="text-blue-600 text-xs mt-1">● Actief</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100 overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 p-4 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xl">🤝</span>
            </div>
            <div>
              <h3 className="font-semibold">Reflectie-Buddy</h3>
              <p className="text-sm opacity-90">
                Huidige fase: {REFLECTION_PHASES[currentPhase].icon} {REFLECTION_PHASES[currentPhase].name}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              {message.type === 'badge' ? (
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-full shadow-lg animate-bounce">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{message.badge?.icon}</span>
                      <div>
                        <div className="font-bold text-sm">{message.badge?.name}</div>
                        <div className="text-xs opacity-90">{message.badge?.description}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white message-user'
                        : 'bg-gray-100 text-gray-800 message-bot'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('nl-NL', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Deel je ervaring..."
              className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Verstuur
            </button>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
        <h4 className="font-semibold text-gray-800 mb-3">💡 Reflectie Tips</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <strong>Wees eerlijk:</strong> Deel je echte gevoelens en gedachten
          </div>
          <div>
            <strong>Denk diep na:</strong> Ga verder dan "het ging goed/slecht"
          </div>
          <div>
            <strong>Zoek patronen:</strong> Herken je terugkerende situaties?
          </div>
          <div>
            <strong>Maak het concreet:</strong> Formuleer specifieke actiepunten
          </div>
        </div>
      </div>
    </div>
  )
}