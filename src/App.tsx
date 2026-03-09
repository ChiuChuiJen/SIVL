import React, { useState } from 'react';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
import { translations } from './i18n/translations';
import { Play, Pause, FastForward, SkipForward, Globe, Clock, Calendar, Users, Trophy, Activity, Info } from 'lucide-react';

import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';
import Teams from './components/Teams';
import Players from './components/Players';
import LeagueInfo from './components/LeagueInfo';
import MatchLogs from './components/MatchLogs';

const MainLayout = () => {
  const { currentTime, isPlaying, speed, language, togglePlay, setSpeed, nextDay, jump30Mins, toggleLanguage } = useSimulation();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState('home');

  const formatTime = (date: Date) => {
    return date.toLocaleString(language === 'zh' ? 'zh-TW' : 'en-US', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', weekday: 'short'
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Dashboard />;
      case 'schedule': return <Schedule />;
      case 'teams': return <Teams />;
      case 'players': return <Players />;
      case 'league': return <LeagueInfo />;
      case 'logs': return <MatchLogs />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-indigo-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-tight">{t.leagueName}</h1>
                <span className="text-[10px] text-indigo-300 font-mono">v1.1.0</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 bg-indigo-800 px-4 py-2 rounded-lg">
                <Clock className="h-5 w-5 text-indigo-300" />
                <span className="font-mono text-sm font-medium">{formatTime(currentTime)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button onClick={togglePlay} className="p-2 bg-indigo-700 hover:bg-indigo-600 rounded-full transition-colors" title={isPlaying ? t.sim.pause : t.sim.play}>
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
                <button onClick={jump30Mins} className="p-2 bg-indigo-700 hover:bg-indigo-600 rounded-full transition-colors" title={t.sim.jump30m}>
                  <FastForward className="h-5 w-5" />
                </button>
                <button onClick={nextDay} className="p-2 bg-indigo-700 hover:bg-indigo-600 rounded-full transition-colors" title={t.sim.nextDay}>
                  <SkipForward className="h-5 w-5" />
                </button>
                
                <select 
                  value={speed} 
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="bg-indigo-700 text-white text-sm rounded-md px-2 py-1.5 border-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={1}>1x</option>
                  <option value={2}>2x</option>
                  <option value={4}>4x</option>
                  <option value={10}>10x</option>
                  <option value={60}>60x</option>
                </select>
              </div>

              <button onClick={toggleLanguage} className="flex items-center space-x-1 hover:text-indigo-200 transition-colors">
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium">{language === 'zh' ? 'EN' : '中文'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'home', icon: Activity, label: t.nav.home },
              { id: 'schedule', icon: Calendar, label: t.nav.schedule },
              { id: 'teams', icon: Trophy, label: t.nav.teams },
              { id: 'players', icon: Users, label: t.nav.players },
              { id: 'league', icon: Info, label: t.nav.league },
              { id: 'logs', icon: Activity, label: t.nav.logs },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <SimulationProvider>
      <MainLayout />
    </SimulationProvider>
  );
}
