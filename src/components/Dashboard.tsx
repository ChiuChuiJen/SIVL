import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { translations } from '../i18n/translations';
import { TEAMS } from '../data/teams';
import { Trophy, Calendar, Activity, ListOrdered, Sun } from 'lucide-react';
import { calculateStandings } from '../utils/standings';

export default function Dashboard() {
  const { currentTime, matches, language } = useSimulation();
  const t = translations[language];
  const [standingsType, setStandingsType] = useState<'Regular' | 'Summer'>('Regular');

  // Get matches for today
  const todayStart = new Date(currentTime);
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(currentTime);
  todayEnd.setHours(23, 59, 59, 999);

  const todayMatches = matches.filter(m => m.date >= todayStart && m.date <= todayEnd);
  
  // Get recent results (last 5 finished matches)
  const recentResults = [...matches]
    .filter(m => m.status === 'finished')
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  const getTeamName = (id: string) => {
    if (id.startsWith('TBD_')) return language === 'zh' ? '待定' : 'TBD';
    const team = TEAMS.find(t => t.id === id);
    return language === 'zh' ? team?.name : team?.enName;
  };

  const envoStandings = calculateStandings(matches, 'EnVO+', standingsType);
  const netStandings = calculateStandings(matches, 'NET', standingsType);
  const summerStandings = calculateStandings(matches, 'Mixed', 'Summer');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Today's Matches */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden lg:col-span-3 flex flex-col">
        <div className="px-4 py-4 border-b border-slate-200 bg-slate-50 flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-slate-800">{t.home.todayMatches}</h2>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          {todayMatches.length === 0 ? (
            <p className="text-slate-500 text-center py-4">No matches scheduled for today.</p>
          ) : (
            <div className="space-y-3">
              {todayMatches.map(match => (
                <div key={match.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
                  <div className="flex-1 text-right font-medium text-slate-800 text-sm truncate">
                    {getTeamName(match.homeTeamId)}
                  </div>
                  <div className="px-2 flex flex-col items-center shrink-0">
                    <span className="text-[10px] font-semibold text-slate-400 mb-1">
                      {match.date.toLocaleTimeString(language === 'zh' ? 'zh-TW' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {match.status === 'playing' ? (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded-full animate-pulse">
                        LIVE
                      </span>
                    ) : match.status === 'finished' ? (
                      <span className="font-bold text-base text-indigo-700">{match.homeSets} - {match.awaySets}</span>
                    ) : (
                      <span className="text-xs font-medium text-slate-400">VS</span>
                    )}
                  </div>
                  <div className="flex-1 text-left font-medium text-slate-800 text-sm truncate">
                    {getTeamName(match.awayTeamId)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Standings */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden lg:col-span-6 flex flex-col">
        <div className="px-4 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ListOrdered className="h-5 w-5 text-amber-600" />
            <h2 className="text-lg font-semibold text-slate-800">{t.home.standings}</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors flex items-center">
              <Trophy className="h-4 w-4 mr-1" />
              {language === 'zh' ? '個人獎項' : 'Awards'}
            </button>
            <div className="flex space-x-2 border-l border-slate-200 pl-4">
              <button 
                onClick={() => setStandingsType('Regular')}
                className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${standingsType === 'Regular' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                {language === 'zh' ? '例行賽' : 'Regular Season'}
              </button>
              <button 
                onClick={() => setStandingsType('Summer')}
                className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${standingsType === 'Summer' ? 'bg-amber-100 text-amber-700' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                <div className="flex items-center space-x-1">
                  <Sun className="h-3 w-3" />
                  <span>{language === 'zh' ? '夏日季賽' : 'Summer Season'}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {standingsType === 'Regular' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 h-full">
              <div className="p-4">
                <h3 className="font-bold text-indigo-700 mb-3 flex items-center text-sm">
                  <Trophy className="h-4 w-4 mr-2" /> EnVO+
                </h3>
                <div className="space-y-2">
                  {envoStandings.map((team, idx) => (
                    <div key={team.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center truncate pr-2">
                        <span className="w-5 font-bold text-slate-400 shrink-0">{idx + 1}.</span>
                        <span className="font-medium text-slate-800 truncate">{language === 'zh' ? team.name : team.enName}</span>
                      </div>
                      <div className="flex space-x-2 text-slate-500 shrink-0">
                        <span title="Played" className="w-4 text-right">{team.played}P</span>
                        <span title="Wins" className="text-emerald-600 font-medium w-4 text-right">{team.wins}W</span>
                        <span title="Losses" className="text-rose-600 font-medium w-4 text-right">{team.losses}L</span>
                        <span title="Points" className="font-bold text-slate-900 w-5 text-right">{team.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-emerald-700 mb-3 flex items-center text-sm">
                  <Trophy className="h-4 w-4 mr-2" /> NET
                </h3>
                <div className="space-y-2">
                  {netStandings.map((team, idx) => (
                    <div key={team.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center truncate pr-2">
                        <span className="w-5 font-bold text-slate-400 shrink-0">{idx + 1}.</span>
                        <span className="font-medium text-slate-800 truncate">{language === 'zh' ? team.name : team.enName}</span>
                      </div>
                      <div className="flex space-x-2 text-slate-500 shrink-0">
                        <span title="Played" className="w-4 text-right">{team.played}P</span>
                        <span title="Wins" className="text-emerald-600 font-medium w-4 text-right">{team.wins}W</span>
                        <span title="Losses" className="text-rose-600 font-medium w-4 text-right">{team.losses}L</span>
                        <span title="Points" className="font-bold text-slate-900 w-5 text-right">{team.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <h3 className="font-bold text-amber-600 mb-3 flex items-center justify-center text-sm">
                <Sun className="h-4 w-4 mr-2" /> {language === 'zh' ? '全聯盟戰績 (前 6 名晉級)' : 'Overall Standings (Top 6 Advance)'}
              </h3>
              <div className="max-w-2xl mx-auto space-y-2">
                {summerStandings.map((team, idx) => (
                  <div key={team.id} className={`flex items-center justify-between text-xs p-2 rounded-lg ${idx < 6 ? 'bg-amber-50 border border-amber-100' : ''}`}>
                    <div className="flex items-center truncate pr-2">
                      <span className={`w-6 font-bold shrink-0 ${idx < 6 ? 'text-amber-600' : 'text-slate-400'}`}>{idx + 1}.</span>
                      <span className="font-medium text-slate-800 truncate">{language === 'zh' ? team.name : team.enName}</span>
                      <span className="ml-1 text-[10px] text-slate-400 shrink-0">({team.branch})</span>
                    </div>
                    <div className="flex space-x-3 text-slate-500 shrink-0">
                      <span title="Played" className="w-4 text-right">{team.played}P</span>
                      <span title="Wins" className="text-emerald-600 font-medium w-4 text-right">{team.wins}W</span>
                      <span title="Losses" className="text-rose-600 font-medium w-4 text-right">{team.losses}L</span>
                      <span title="Points" className="font-bold text-slate-900 w-5 text-right">{team.points}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        {/* Recent Results */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col flex-1 max-h-[50vh] lg:max-h-none">
          <div className="px-4 py-4 border-b border-slate-200 bg-slate-50 flex items-center space-x-2 shrink-0">
            <Activity className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-slate-800">{t.home.recentResults}</h2>
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            {recentResults.length === 0 ? (
              <p className="text-slate-500 text-center py-4">No recent results.</p>
            ) : (
              <div className="space-y-3">
                {recentResults.map(match => (
                  <div key={match.id} className="flex flex-col p-3 rounded-lg border border-slate-100 bg-slate-50">
                    {match.name && (
                      <div className="text-[10px] font-bold text-indigo-600 mb-1 text-center truncate">{match.name}</div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className={`flex-1 text-right text-sm truncate ${match.homeSets > match.awaySets ? 'text-slate-900 font-bold' : 'text-slate-500 font-medium'}`}>
                        {getTeamName(match.homeTeamId)}
                      </div>
                      <div className="px-2 flex flex-col items-center shrink-0">
                        <span className="font-bold text-base text-slate-800">{match.homeSets} - {match.awaySets}</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">
                          {match.date.toLocaleDateString(language === 'zh' ? 'zh-TW' : 'en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className={`flex-1 text-left text-sm truncate ${match.awaySets > match.homeSets ? 'text-slate-900 font-bold' : 'text-slate-500 font-medium'}`}>
                        {getTeamName(match.awayTeamId)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Individual Awards */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col flex-1 max-h-[50vh] lg:max-h-none">
          <div className="px-4 py-4 border-b border-slate-200 bg-slate-50 flex items-center space-x-2 shrink-0">
            <Trophy className="h-5 w-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-slate-800">{language === 'zh' ? '個人獎項' : 'Individual Awards'}</h2>
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="space-y-3">
              {[
                { title: language === 'zh' ? 'MVP' : 'MVP', player: '林柏宇', team: '旭日阿波羅', value: '28.5 pts/g' },
                { title: language === 'zh' ? '最佳主攻手' : 'Best Spiker', player: '陳建宏', team: '綠葉遊俠', value: '54% atk' },
                { title: language === 'zh' ? '最佳攔中' : 'Best Blocker', player: '張志豪', team: '巨木泰坦', value: '1.2 blk/s' },
                { title: language === 'zh' ? '最佳舉球員' : 'Best Setter', player: '王大明', team: '星辰領航者', value: '11.5 ast/s' },
                { title: language === 'zh' ? '最佳自由球員' : 'Best Libero', player: '李宇軒', team: '碧波海神', value: '68% rec' },
              ].map((award, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg border border-slate-100 bg-slate-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">{award.title}</span>
                    <span className="text-sm font-bold text-slate-800">{award.player}</span>
                    <span className="text-[10px] text-slate-500">{award.team}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{award.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
