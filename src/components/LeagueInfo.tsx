import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { translations } from '../i18n/translations';
import { LEAGUE_INFO, STATES, COUNTIES } from '../data/league';
import { Info, Map, Building2, UserCircle, History, Trophy } from 'lucide-react';

export default function LeagueInfo() {
  const { language } = useSimulation();
  const t = translations[language];

  // Mock past seasons data
  const pastSeasons = [
    { year: '2025', champion: '旭日阿波羅', runnerUp: '碧波海神', mvp: '林柏宇 (旭日)' },
    { year: '2024', champion: '綠葉遊俠', runnerUp: '炎陽火鳥', mvp: '陳建宏 (綠葉)' },
    { year: '2023', champion: '星辰領航者', runnerUp: '晨風飛鷹', mvp: '王大明 (星辰)' },
  ];

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center space-x-2">
          <Info className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-slate-800">{t.nav.league}</h2>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shrink-0">
              <span className="text-white font-black text-3xl tracking-tighter">SIVL</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                {language === 'zh' ? LEAGUE_INFO.name : LEAGUE_INFO.enName}
              </h1>
              <p className="text-lg text-slate-600 font-medium">
                {language === 'zh' ? LEAGUE_INFO.description : LEAGUE_INFO.enDescription}
              </p>
              <div className="flex items-center text-slate-500 mt-4 pt-4 border-t border-slate-100">
                <UserCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">{language === 'zh' ? '聯盟負責人' : 'League President'}: {LEAGUE_INFO.president}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Past Seasons Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center space-x-2">
          <History className="h-5 w-5 text-amber-600" />
          <h2 className="text-lg font-semibold text-slate-800">
            {language === 'zh' ? '歷屆戰績' : 'Past Seasons'}
          </h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 text-slate-500 text-sm">
                  <th className="pb-3 font-semibold">{language === 'zh' ? '賽季' : 'Season'}</th>
                  <th className="pb-3 font-semibold">{language === 'zh' ? '總冠軍' : 'Champion'}</th>
                  <th className="pb-3 font-semibold">{language === 'zh' ? '亞軍' : 'Runner-up'}</th>
                  <th className="pb-3 font-semibold">{language === 'zh' ? 'MVP' : 'MVP'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pastSeasons.map((season) => (
                  <tr key={season.year} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-bold text-slate-800">{season.year}</td>
                    <td className="py-4 font-medium text-amber-600 flex items-center">
                      <Trophy className="h-4 w-4 mr-2" />
                      {season.champion}
                    </td>
                    <td className="py-4 text-slate-600">{season.runnerUp}</td>
                    <td className="py-4 text-slate-600">{season.mvp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Geography Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center space-x-2">
          <Map className="h-5 w-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-slate-800">
            {language === 'zh' ? '聯邦行政區劃' : 'Federal Administrative Divisions'}
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STATES.map(state => {
              const stateCounties = COUNTIES.filter(c => c.stateId === state.id);
              return (
                <div key={state.id} className="bg-slate-50 rounded-xl p-5 border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-4 border-b border-slate-200 pb-3">
                    <Building2 className="h-6 w-6 text-slate-400" />
                    <h3 className="text-xl font-bold text-slate-800">
                      {language === 'zh' ? state.name : state.enName}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {stateCounties.map(county => (
                      <li key={county.id} className="flex items-center text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-3"></div>
                        <span className="font-medium">{language === 'zh' ? county.name : county.enName}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
