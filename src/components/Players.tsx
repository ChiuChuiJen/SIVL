import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { translations } from '../i18n/translations';
import { TEAMS } from '../data/teams';
import { Users, Search, Filter } from 'lucide-react';

export default function Players() {
  const { language } = useSimulation();
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');

  const allPlayers = TEAMS.flatMap(team => team.players.map(p => ({ ...p, teamId: team.id })));
  
  const filteredPlayers = allPlayers.filter(p => {
    const matchesSearch = p.name.includes(searchTerm) || p.enName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam === 'all' || p.teamId === selectedTeam;
    return matchesSearch && matchesTeam;
  });

  const getTeamName = (id: string) => {
    const team = TEAMS.find(t => t.id === id);
    return language === 'zh' ? team?.name : team?.enName;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-slate-800">{t.nav.players}</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={language === 'zh' ? '搜尋選手...' : 'Search players...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="pl-9 pr-8 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white w-full sm:w-48"
            >
              <option value="all">{language === 'zh' ? '所有隊伍' : 'All Teams'}</option>
              {TEAMS.map(team => (
                <option key={team.id} value={team.id}>
                  {language === 'zh' ? team.name : team.enName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                {language === 'zh' ? '背號' : 'No.'}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                {language === 'zh' ? '姓名' : 'Name'}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                {language === 'zh' ? '隊伍' : 'Team'}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                {language === 'zh' ? '位置' : 'Position'}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                {language === 'zh' ? '狀態' : 'Status'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredPlayers.slice(0, 100).map((player) => (
              <tr key={player.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  #{player.number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs mr-3">
                      {player.name.charAt(0)}
                    </div>
                    <div className="text-sm font-medium text-slate-900">
                      {language === 'zh' ? player.name : player.enName}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {getTeamName(player.teamId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${player.position === 'L' ? 'bg-yellow-100 text-yellow-800' : 
                      player.position === 'S' ? 'bg-blue-100 text-blue-800' : 
                      player.position === 'MB' ? 'bg-green-100 text-green-800' : 
                      'bg-purple-100 text-purple-800'}`}>
                    {player.position}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
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
        {filteredPlayers.length > 100 && (
          <div className="px-6 py-4 border-t border-slate-200 text-center text-sm text-slate-500 bg-slate-50">
            {language === 'zh' ? `顯示前 100 名選手 (共 ${filteredPlayers.length} 名)` : `Showing first 100 players (out of ${filteredPlayers.length})`}
          </div>
        )}
        {filteredPlayers.length === 0 && (
          <div className="px-6 py-12 text-center text-slate-500">
            {language === 'zh' ? '找不到符合條件的選手' : 'No players found matching your criteria.'}
          </div>
        )}
      </div>
    </div>
  );
}
