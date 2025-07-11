'use client'

import { useState } from 'react'

const GIBBS_PHASES = [
  {
    id: 'description',
    title: 'Beschrijving',
    icon: '📝',
    color: 'blue',
    description: 'Wat gebeurde er precies?',
    details: 'In deze fase beschrijf je objectief wat er gebeurde, zonder oordelen of interpretaties.',
    questions: [
      'Wat gebeurde er precies?',
      'Wie was erbij betrokken?',
      'Wanneer en waar vond het plaats?',
      'Welke acties ondernamen jullie?'
    ],
    example: 'Tijdens de rekenles begon Sven te roepen en papieren door de klas te gooien. Ik vroeg hem te stoppen, maar hij negeerde me. Andere kinderen werden afgeleid.'
  },
  {
    id: 'feelings',
    title: 'Gevoelens',
    icon: '💭',
    color: 'purple',
    description: 'Hoe voelde je je?',
    details: 'Erken en benoem je emoties tijdens en na de situatie. Dit is cruciaal voor zelfbewustzijn.',
    questions: [
      'Welke emoties ervaarde je?',
      'Hoe voelde je je tijdens de situatie?',
      'Wat ging er door je hoofd?',
      'Hoe voel je je er nu over?'
    ],
    example: 'Ik voelde me gefrustreerd en machteloos. Ik was bang dat ik de controle over de klas zou verliezen en schaamde me voor mijn reactie.'
  },
  {
    id: 'evaluation',
    title: 'Evaluatie',
    icon: '⚖️',
    color: 'green',
    description: 'Wat ging goed en wat niet?',
    details: 'Maak een eerlijke balans van positieve en negatieve aspecten van de situatie.',
    questions: [
      'Wat ging er goed?',
      'Wat ging er minder goed?',
      'Welke aspecten waren positief?',
      'Waar ben je tevreden over?'
    ],
    example: 'Positief: Ik bleef kalm en verhief mijn stem niet. Negatief: Ik had geen duidelijk plan en de andere kinderen raakten onrustig.'
  },
  {
    id: 'analysis',
    title: 'Analyse',
    icon: '🔍',
    color: 'orange',
    description: 'Waarom gebeurde dit?',
    details: 'Analyseer de onderliggende oorzaken en factoren die bijdroegen aan de situatie.',
    questions: [
      'Waarom gebeurde dit?',
      'Welke factoren speelden een rol?',
      'Wat was de onderliggende oorzaak?',
      'Welke theorie kan dit verklaren?'
    ],
    example: 'Sven heeft ADHD en had moeite met concentratie. De taak was misschien te moeilijk. Ik had geen duidelijke gedragsafspraken gemaakt.'
  },
  {
    id: 'conclusion',
    title: 'Conclusie',
    icon: '💡',
    color: 'teal',
    description: 'Wat leerde je hiervan?',
    details: 'Trek lessen uit de ervaring en formuleer wat je hebt geleerd over jezelf en je handelen.',
    questions: [
      'Wat heb je geleerd?',
      'Welke inzichten kreeg je?',
      'Wat zou je anders doen?',
      'Welke vaardigheden mis je?'
    ],
    example: 'Ik leerde dat preventie belangrijk is. Ik moet duidelijke afspraken maken en taken aanpassen aan individuele behoeften.'
  },
  {
    id: 'action',
    title: 'Actieplan',
    icon: '🎯',
    color: 'red',
    description: 'Wat ga je doen?',
    details: 'Formuleer concrete, haalbare acties die je gaat ondernemen om te verbeteren.',
    questions: [
      'Welke concrete stappen ga je nemen?',
      'Hoe ga je dit toepassen?',
      'Welke vaardigheden ga je ontwikkelen?',
      'Wanneer ga je dit doen?'
    ],
    example: 'Ik ga: 1) Duidelijke klasregels opstellen, 2) Taken differentiëren, 3) Een gedragsplan maken voor Sven, 4) Cursus klassenmanagement volgen.'
  }
]

export default function ReflectionGuide() {
  const [activePhase, setActivePhase] = useState<string>('description')

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          📚 Reflectie Uitleg
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Leer hoe je effectief reflecteert met Gibbs' Reflective Cycle. 
          Ontdek het verschil tussen oppervlakkig evalueren en diepgaand reflecteren.
        </p>
      </div>

      {/* Difference Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center">
            ❌ Oppervlakkig Evalueren
          </h3>
          <div className="space-y-3 text-red-700">
            <p><strong>Voorbeeld:</strong> "De les ging slecht."</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Alleen eindoordeel</li>
              <li>Geen analyse van oorzaken</li>
              <li>Geen emoties erkend</li>
              <li>Geen concrete vervolgstappen</li>
              <li>Geen leerproces</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
            ✅ Diepgaand Reflecteren
          </h3>
          <div className="space-y-3 text-green-700">
            <p><strong>Voorbeeld:</strong> "Ik voelde me gefrustreerd omdat..."</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Erkent gevoelens en gedachten</li>
              <li>Analyseert oorzaken en patronen</li>
              <li>Koppelt aan theorie</li>
              <li>Formuleert concrete acties</li>
              <li>Leidt tot groei en ontwikkeling</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Gibbs Cycle Visualization */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-blue-100">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          🔄 Gibbs' Reflective Cycle
        </h3>
        
        {/* Phase Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {GIBBS_PHASES.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`p-4 rounded-xl text-center transition-all transform hover:scale-105 ${
                activePhase === phase.id
                  ? `bg-${phase.color}-100 border-2 border-${phase.color}-300 shadow-lg`
                  : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="text-3xl mb-2">{phase.icon}</div>
              <div className="text-sm font-semibold text-gray-800">{phase.title}</div>
              <div className="text-xs text-gray-600 mt-1">{phase.description}</div>
            </button>
          ))}
        </div>

        {/* Active Phase Details */}
        {GIBBS_PHASES.map((phase) => (
          activePhase === phase.id && (
            <div key={phase.id} className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{phase.icon}</span>
                <div>
                  <h4 className="text-2xl font-bold text-gray-800">{phase.title}</h4>
                  <p className="text-gray-600">{phase.details}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3">🤔 Reflectievragen:</h5>
                  <ul className="space-y-2">
                    {phase.questions.map((question, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-gray-700">{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-800 mb-3">📝 Voorbeeld:</h5>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-700 italic">"{phase.example}"</p>
                  </div>
                </div>
              </div>
            </div>
          )
        ))}
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          💡 Tips voor Effectieve Reflectie
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">🎯 Wees Specifiek</h4>
            <p className="text-sm text-gray-700">
              Gebruik concrete voorbeelden en situaties. Vermijd vage uitspraken zoals "het ging goed".
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">💭 Erken Emoties</h4>
            <p className="text-sm text-gray-700">
              Je gevoelens zijn belangrijk. Benoem ze en onderzoek waarom je je zo voelde.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">🔗 Koppel aan Theorie</h4>
            <p className="text-sm text-gray-700">
              Verbind je ervaringen met pedagogische theorieën en onderwijskundige concepten.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">📈 Zoek Patronen</h4>
            <p className="text-sm text-gray-700">
              Herken je terugkerende situaties of gedragingen in je reflecties?
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">🎯 Maak het Haalbaar</h4>
            <p className="text-sm text-gray-700">
              Formuleer realistische en concrete actiepunten die je daadwerkelijk kunt uitvoeren.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">⏰ Reflecteer Regelmatig</h4>
            <p className="text-sm text-gray-700">
              Maak reflectie tot een gewoonte. Dagelijkse korte reflecties zijn effectiever dan lange sessies.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}