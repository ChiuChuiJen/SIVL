import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { translations } from '../i18n/translations';
import { TEAMS } from '../data/teams';
import { COUNTIES, STATES } from '../data/league';
import { Match } from '../data/schedule';
import { Calendar, ChevronLeft, ChevronRight, MapPin, Users, Clock, X, Trophy } from 'lucide-react';

export default function Schedule() {
  const { matches, language, currentTime } = useSimulation();
  const t = translations[language];
  const [currentWeek, setCurrentWeek] = useState(new Date(currentTime));
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const getTeam = (id: string) => TEAMS.find(t => t.id === id);
  
  const getTeamName = (id: string) => {
    if (id.startsWith('TBD_')) return language === 'zh' ? '待定' : 'TBD';
    const team = getTeam(id);
    return language === 'zh' ? team?.name : team?.enName;
  };

  const getLocation = (teamId: string) => {
    if (teamId.startsWith('TBD_')) return language === 'zh' ? '待定' : 'TBD';
    const team = getTeam(teamId);
    if (!team) return '';
    const county = COUNTIES.find(c => c.id === team.countyId);
    const state = STATES.find(s => s.id === county?.stateId);
    return language === 'zh' 
      ? `${state?.name} ${county?.name}體育館` 
      : `${county?.enName} Stadium, ${state?.enName}`;
  };

  // Group matches by date
  const groupedMatches = matches.reduce((acc, match) => {
    const dateStr = match.date.toISOString().split('T')[0];
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(match);
    return acc;
  }, {} as Record<string, typeof matches>);

  // Get dates for the current week
  const weekStart = new Date(currentWeek);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Sunday
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const nextWeek = () => {
    const next = new Date(currentWeek);
    next.setDate(next.getDate() + 7);
    setCurrentWeek(next);
  };

  const prevWeek = () => {
    const prev = new Date(currentWeek);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeek(prev);
  };

  // Generate random attendance based on match ID to keep it consistent
  const getAttendance = (matchId: string) => {
    const hash = matchId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 3000 + (hash % 5000); // 3000 to 8000
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-slate-800">{t.nav.schedule}</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={prevWeek} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
            <ChevronLeft className="h-5 w-5 text-slate-600" />
          </button>
          <span className="font-medium text-slate-700">
            {weekStart.toLocaleDateString(language === 'zh' ? 'zh-TW' : 'en-US', { month: 'short', day: 'numeric' })} - 
            {weekDates[6].toLocaleDateString(language === 'zh' ? 'zh-TW' : 'en-US', { month: 'short', day: 'numeric' })}
          </span>
          <button onClick={nextWeek} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
            <ChevronRight className="h-5 w-5 text-slate-600" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-8">
          {weekDates.map(date => {
            const dateStr = date.toISOString().split('T')[0];
            const dayMatches = groupedMatches[dateStr] || [];
            
            if (dayMatches.length === 0) return null;

            return (
              <div key={dateStr} className="space-y-4">
                <h3 className="text-md font-bold text-slate-800 border-b border-slate-200 pb-2">
                  {date.toLocaleDateString(language === 'zh' ? 'zh-TW' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dayMatches.map(match => (
                    <div 
                      key={match.id} 
                      onClick={() => setSelectedMatch(match)}
                      className="flex flex-col p-4 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer hover:shadow-sm"
                    >
                      {match.name && (
                        <div className="text-xs font-bold text-indigo-600 mb-2 text-center">{match.name}</div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-indigo-600 mb-1">{match.branch}</span>
                          <span className="text-sm text-slate-500">
                            {match.date.toLocaleTimeString(language === 'zh' ? 'zh-TW' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="flex-1 flex justify-center items-center space-x-4">
                          <span className={`font-medium text-right w-1/3 ${match.status === 'finished' && match.homeSets > match.awaySets ? 'text-slate-900 font-bold' : 'text-slate-700'}`}>
                            {getTeamName(match.homeTeamId)}
                          </span>
                          
                          <div className="flex flex-col items-center justify-center w-16">
                            {match.status === 'playing' ? (
                              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full animate-pulse">LIVE</span>
                            ) : match.status === 'finished' ? (
                              <span className="font-bold text-lg text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md">
                                {match.homeSets} - {match.awaySets}
                              </span>
                            ) : (
                              <span className="text-sm font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-md">VS</span>
                            )}
                          </div>
                          
                          <span className={`font-medium text-left w-1/3 ${match.status === 'finished' && match.awaySets > match.homeSets ? 'text-slate-900 font-bold' : 'text-slate-700'}`}>
                            {getTeamName(match.awayTeamId)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {weekDates.every(date => !(groupedMatches[date.toISOString().split('T')[0]]?.length > 0)) && (
            <div className="text-center py-12 text-slate-500">
              {language === 'zh' ? '本週無賽事安排。' : 'No matches scheduled for this week.'}
            </div>
          )}
        </div>
      </div>

      {/* Match Details Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-indigo-600" />
                <h3 className="font-bold text-slate-800">
                  {language === 'zh' ? '賽事資訊' : 'Match Details'} {selectedMatch.id ? `- ${selectedMatch.id}` : ''}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedMatch(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            
            <div className="p-8">
              {/* Scoreboard */}
              <div className="flex justify-between items-center mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100 relative">
                {selectedMatch.name && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {selectedMatch.name}
                  </div>
                )}
                <div className="text-center flex-1">
                  <p className="text-sm text-slate-500 font-medium mb-2">{language === 'zh' ? '主場' : 'Home'}</p>
                  <h4 className={`text-2xl font-bold ${selectedMatch.status === 'finished' && selectedMatch.homeSets > selectedMatch.awaySets ? 'text-indigo-700' : 'text-slate-800'}`}>
                    {getTeamName(selectedMatch.homeTeamId)}
                  </h4>
                </div>
                
                <div className="px-8 text-center">
                  <div className="text-sm font-bold text-indigo-600 mb-2 bg-indigo-50 px-3 py-1 rounded-full inline-block">
                    {selectedMatch.branch}
                  </div>
                  {selectedMatch.status === 'finished' ? (
                    <div className="text-4xl font-black text-slate-900 tracking-wider">
                      {selectedMatch.homeSets} - {selectedMatch.awaySets}
                    </div>
                  ) : selectedMatch.status === 'playing' ? (
                    <div className="text-2xl font-black text-red-600 animate-pulse">LIVE</div>
                  ) : (
                    <div className="text-3xl font-black text-slate-300">VS</div>
                  )}
                </div>
                
                <div className="text-center flex-1">
                  <p className="text-sm text-slate-500 font-medium mb-2">{language === 'zh' ? '客場' : 'Away'}</p>
                  <h4 className={`text-2xl font-bold ${selectedMatch.status === 'finished' && selectedMatch.awaySets > selectedMatch.homeSets ? 'text-indigo-700' : 'text-slate-800'}`}>
                    {getTeamName(selectedMatch.awayTeamId)}
                  </h4>
                </div>
              </div>

              {/* Set Scores if finished */}
              {selectedMatch.status === 'finished' && selectedMatch.setScores.length > 0 && (
                <div className="mb-8 flex justify-center space-x-4">
                  {selectedMatch.setScores.map((score, idx) => (
                    <div key={idx} className="flex flex-col items-center bg-slate-50 border border-slate-200 rounded-lg p-2 min-w-[60px]">
                      <span className="text-xs text-slate-400 font-medium mb-1">Set {idx + 1}</span>
                      <span className={`font-bold ${score.home > score.away ? 'text-indigo-600' : 'text-slate-600'}`}>{score.home}</span>
                      <span className="text-slate-300 my-0.5">-</span>
                      <span className={`font-bold ${score.away > score.home ? 'text-indigo-600' : 'text-slate-600'}`}>{score.away}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Match Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                  <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500 font-medium">{language === 'zh' ? '開賽時間' : 'Start Time'}</p>
                    <p className="font-semibold text-slate-800">
                      {selectedMatch.date.toLocaleString(language === 'zh' ? 'zh-TW' : 'en-US', {
                        month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <MapPin className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500 font-medium">{language === 'zh' ? '比賽地點' : 'Location'}</p>
                    <p className="font-semibold text-slate-800">{getLocation(selectedMatch.homeTeamId)}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-amber-50/50 rounded-lg border border-amber-100 sm:col-span-2">
                  <Users className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500 font-medium">{language === 'zh' ? '進場人數' : 'Attendance'}</p>
                    <p className="font-semibold text-slate-800">
                      {selectedMatch.status === 'scheduled' 
                        ? (language === 'zh' ? '尚未統計' : 'TBD') 
                        : `${getAttendance(selectedMatch.id).toLocaleString()} ${language === 'zh' ? '人' : ''}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
