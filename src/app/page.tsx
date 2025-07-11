'use client'

import { useState } from 'react'
import ChatInterface from '@/components/ChatInterface'
import ReflectionGuide from '@/components/ReflectionGuide'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'chat' | 'guide'>('chat')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🤝</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Reflectie-Buddy</h1>
                <p className="text-sm text-gray-600">Jouw AI-begeleider voor klasreflectie</p>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'chat'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                💬 Chat
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'guide'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                📚 Reflectie Uitleg
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === 'chat' && <ChatInterface />}
        {activeTab === 'guide' && <ReflectionGuide />}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-blue-100 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <p className="text-gray-600 text-sm">
            💙 Gemaakt voor pabo-studenten om te groeien in hun reflectievaardigheden
          </p>
        </div>
      </footer>
    </div>
  )
}