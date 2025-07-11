'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/Badge'

interface UserStats {
  totalReflections: number
  currentStreak: number
  longestStreak: number
  completedCycles: number
  badges: string[]
  weeklyGoal: number
  weeklyProgress: number
}

const AVAILABLE_BADGES = [
  {
    id: 'first_reflection',
    name: 'Eerste Stappen',
    description: 'Je eerste reflectie voltooid',
    icon: '🌱',
    color: 'green',
    requirement: 'Voltooi je eerste reflectie'
  },
  {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: '7 dagen op rij gereflecteerd',
    icon: '🔥',
    color: 'orange',
    requirement: '7 dagen streak'
  },
  {
    id: 'deep_thinker',
    name: 'Diepe Denker',
    description: '10 volledige Gibbs cycli voltooid',
    icon: '🧠',
    color: 'purple',
    requirement: '10 complete cycli'
  },
  {
    id: 'emotion_explorer',
    name: 'Emotie Ontdekkingsreiziger',
    description: 'Verschillende emoties erkend en benoemd',
    icon: '💭',
    color: 'blue',
    requirement: 'Emoties in reflecties benoemen'
  },
  {
    id: 'action_hero',
    name: 'Actie Held',
    description: 'Concrete actiepunten geformuleerd',
    icon: '🎯',
    color: 'red',
    requirement: 'Actiepunten maken'
  },
  {
    id: 'theory_connector',
    name: 'Theorie Verbinder',
    description: 'Ervaringen gekoppeld aan pedagogische theorie',
    icon: '🔗',
    color: 'teal',
    requirement: 'Theorie koppeling maken'
  },
  {
    id: 'month_master',
    name: 'Maand Meester',
    description: '30 dagen reflectie volgehouden',
    icon: '👑',
    color: 'yellow',
    requirement: '30 dagen streak'
  },
  {
    id: 'growth_mindset',
    name: 'Groeimindset',
    description: 'Leren van fouten en uitdagingen',
    icon: '📈',
    color: 'indigo',
    requirement: 'Groei tonen in reflecties'
  }
]

export default function UserProgress() {
  const [userStats, setUserStats] = useState<UserStats>({
    totalReflections: 12,
    currentStreak: 5,
    longestStreak: 8,
    completedCycles: 3,
    badges: ['first_reflection', 'emotion_explorer', 'action_hero'],
    weeklyGoal: 5,
    weeklyProgress: 3
  })

  const [selectedBadge, setSelectedBadge] = useState<string | null>(null)

  const getProgressPercentage = () => {
    return Math.min((userStats.weeklyProgress / userStats.weeklyGoal) * 100, 100)
  }

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return '👑'
    if (streak >= 14) return '🔥'
    if (streak >= 7) return '⚡'
    if (streak >= 3) return '🌟'
    return '🌱'
  }

  const earnedBadges = AVAILABLE_BADGES.filter(badge => userStats.badges.includes(badge.id))
  const availableBadges = AVAILABLE_BADGES.filter(badge => !userStats.badges.includes(badge.id))

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          🏆 Jouw Reflectie Voortgang
        </h2>
        <p className="text-lg text-gray-600">
          Bekijk je groei en behaalde prestaties in reflectie
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 text-center">
          <div className="text-3xl font-bold">{userStats.totalReflections}</div>
          <div className="text-sm opacity-90">Totaal Reflecties</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 text-center">
          <div className="text-3xl font-bold flex items-center justify-center">
            {getStreakEmoji(userStats.currentStreak)} {userStats.currentStreak}
          </div>
          <div className="text-sm opacity-90">Huidige Streak</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 text-center">
          <div className="text-3xl font-bold">{userStats.completedCycles}</div>
          <div className="text-sm opacity-90">Volledige Cycli</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 text-center">
          <div className="text-3xl font-bold">{userStats.badges.length}</div>
          <div className="text-sm opacity-90">Badges Behaald</div>
        </div>
      </div>

      {/* Weekly Goal Progress */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📅 Weekdoel Voortgang</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Deze week: {userStats.weeklyProgress} van {userStats.weeklyGoal} reflecties</span>
          <span className="text-sm font-medium text-blue-600">{Math.round(getProgressPercentage())}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {userStats.weeklyProgress >= userStats.weeklyGoal 
            ? '🎉 Weekdoel behaald! Geweldig gedaan!' 
            : `Nog ${userStats.weeklyGoal - userStats.weeklyProgress} reflecties te gaan deze week.`
          }
        </p>
      </div>

      {/* Earned Badges */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🏅 Behaalde Badges</h3>
        {earnedBadges.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge(badge.id)}
                className="bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-300 rounded-xl p-4 text-center cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <div className="font-semibold text-gray-800 text-sm">{badge.name}</div>
                <div className="text-xs text-gray-600 mt-1">{badge.description}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🎯</div>
            <p>Nog geen badges behaald. Begin met reflecteren om je eerste badge te verdienen!</p>
          </div>
        )}
      </div>

      {/* Available Badges */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🎯 Te Behalen Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {availableBadges.map((badge) => (
            <div
              key={badge.id}
              className="bg-gray-100 border-2 border-gray-200 rounded-xl p-4 text-center opacity-60"
            >
              <div className="text-4xl mb-2 grayscale">{badge.icon}</div>
              <div className="font-semibold text-gray-600 text-sm">{badge.name}</div>
              <div className="text-xs text-gray-500 mt-1">{badge.requirement}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Reflection Calendar */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📅 Reflectie Kalender</h3>
        <div className="grid grid-cols-7 gap-2 text-center">
          {/* Days of week */}
          {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((day) => (
            <div key={day} className="font-semibold text-gray-600 py-2">{day}</div>
          ))}
          
          {/* Calendar days (simplified example) */}
          {Array.from({ length: 28 }, (_, i) => {
            const hasReflection = Math.random() > 0.6 // Simulate reflection data
            return (
              <div
                key={i}
                className={`aspect-square rounded-lg flex items-center justify-center text-sm ${
                  hasReflection
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-gray-50 text-gray-400'
                }`}
              >
                {i + 1}
                {hasReflection && <div className="absolute w-2 h-2 bg-green-500 rounded-full mt-4"></div>}
              </div>
            )
          })}
        </div>
        <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Reflectie voltooid</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
            <span className="text-gray-600">Geen reflectie</span>
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 text-center">
        <div className="text-2xl mb-2">💪</div>
        <h3 className="text-xl font-semibold mb-2">Blijf Groeien!</h3>
        <p className="opacity-90">
          "Reflectie is de lamp van het hart. Als zij ontbreekt, blijft alles in duisternis." - Imam Al-Ghazali
        </p>
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            {(() => {
              const badge = AVAILABLE_BADGES.find(b => b.id === selectedBadge)
              return badge ? (
                <>
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-2">{badge.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-800">{badge.name}</h3>
                    <p className="text-gray-600">{badge.description}</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Behaald door:</strong> {badge.requirement}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedBadge(null)}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Sluiten
                  </button>
                </>
              ) : null
            })()}
          </div>
        </div>
      )}
    </div>
  )
}