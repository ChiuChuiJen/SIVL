import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { translations } from '../i18n/translations';
import { TEAMS, Team } from '../data/teams';
import { COUNTIES, STATES } from '../data/league';
import { Trophy, MapPin, User, X, Users, Shield } from 'lucide-react';

export default function Teams() {
  const { language } = useSimulation();
  const t = translations[language];
  const [activeBranch, setActiveBranch] = useState<'EnVO+' | 'NET'>('EnVO+');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const filteredTeams = TEAMS.filter(team => team.branch === activeBranch);

  const getCountyName = (id: string) => {
    const county = COUNTIES.find(c => c.id === id);
    return language === 'zh' ? county?.name : county?.enName;
  };

  const getStateName = (countyId: string) => {
    const county = COUNTIES.find(c => c.id === countyId);
    const state = STATES.find(s => s.id === county?.stateId);
    return language === 'zh' ? state?.name : state?.enName;
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveBranch('EnVO+')}
          className={`px-6 py-3 rounded-xl font-bold text-lg transition-colors ${
            activeBranch === 'EnVO+' 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          {t.teams.envo}
        </button>
        <button
          onClick={() => setActiveBranch('NET')}
          className={`px-6 py-3 rounded-xl font-bold text-lg transition-colors ${
            activeBranch === 'NET' 
              ? 'bg-emerald-600 text-white shadow-md' 
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          {t.teams.net}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map(team => (
          <div 
            key={team.id} 
            onClick={() => setSelectedTeam(team)}
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1"
          >
            <div className={`h-2 ${activeBranch === 'EnVO+' ? 'bg-indigo-500' : 'bg-emerald-500'}`}></div>
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-full ${activeBranch === 'EnVO+' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {language === 'zh' ? team.name : team.enName}
                  </h3>
                  <span className="text-sm font-medium text-slate-500">{team.id}</span>
                </div>
              </div>
              
              <div className="space-y-3 mt-6">
                <div className="flex items-center text-slate-600">
                  <MapPin className="h-5 w-5 mr-3 text-slate-400" />
                  <span className="text-sm">{getStateName(team.countyId)} - {getCountyName(team.countyId)}</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <User className="h-5 w-5 mr-3 text-slate-400" />
                  <span className="text-sm">{language === 'zh' ? team.coach : team.enCoach}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500">{t.teams.players}: {team.players.length}</span>
                <span className="text-sm font-semibold text-indigo-600">
                  {language === 'zh' ? '查看詳情' : 'View Details'} &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Team Details Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className={`px-6 py-4 flex justify-between items-center ${selectedTeam.branch === 'EnVO+' ? 'bg-indigo-600' : 'bg-emerald-600'} text-white`}>
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-white/80" />
                <div>
                  <h2 className="text-2xl font-bold">{language === 'zh' ? selectedTeam.name : selectedTeam.enName}</h2>
                  <p className="text-white/80 text-sm font-medium">{selectedTeam.branch} League | {selectedTeam.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTeam(null)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">{language === 'zh' ? '駐地' : 'Location'}</p>
                    <p className="font-bold text-slate-800">{getStateName(selectedTeam.countyId)} {getCountyName(selectedTeam.countyId)}</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">{language === 'zh' ? '總教練' : 'Head Coach'}</p>
                    <p className="font-bold text-slate-800">{language === 'zh' ? selectedTeam.coach : selectedTeam.enCoach}</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">{language === 'zh' ? '登錄人數' : 'Roster Size'}</p>
                    <p className="font-bold text-slate-800">{selectedTeam.players.length} {language === 'zh' ? '人' : 'Players'}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-slate-500" />
                  {language === 'zh' ? '球員名單' : 'Player Roster'}
                </h3>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{language === 'zh' ? '背號' : 'No.'}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{language === 'zh' ? '姓名' : 'Name'}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{language === 'zh' ? '位置' : 'Position'}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{language === 'zh' ? '狀態' : 'Status'}</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {selectedTeam.players.sort((a, b) => a.number - b.number).map(player => (
                        <tr key={player.id} className="hover:bg-slate-50">
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-bold text-slate-900">#{player.number}</td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-slate-800">
                            {language === 'zh' ? player.name : player.enName}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md 
                              ${player.position === 'L' ? 'bg-yellow-100 text-yellow-800' : 
                                player.position === 'S' ? 'bg-blue-100 text-blue-800' : 
                                player.position === 'MB' ? 'bg-green-100 text-green-800' : 
                                'bg-purple-100 text-purple-800'}`}>
                              {player.position}
                            </span>
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm">
                            {player.isStarter ? (
                              <span className="text-emerald-600 font-medium">{language === 'zh' ? '先發' : 'Starter'}</span>
                            ) : (
                              <span className="text-slate-400">{language === 'zh' ? '替補' : 'Bench'}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
