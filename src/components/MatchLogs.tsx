import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { translations } from '../i18n/translations';
import { Activity, Terminal } from 'lucide-react';

export default function MatchLogs() {
  const { logs, language } = useSimulation();
  const t = translations[language];

  return (
    <div className="bg-slate-900 rounded-xl shadow-xl border border-slate-800 overflow-hidden min-h-[600px] flex flex-col">
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Terminal className="h-5 w-5 text-emerald-400" />
          <h2 className="text-lg font-mono font-bold text-slate-200">{t.nav.logs}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-mono text-emerald-500">SYSTEM ACTIVE</span>
        </div>
      </div>
      
      <div className="p-6 flex-1 overflow-y-auto font-mono text-sm space-y-2">
        {logs.length === 0 ? (
          <div className="text-slate-600 italic">
            {language === 'zh' ? '等待賽事開始...' : 'Waiting for matches to start...'}
          </div>
        ) : (
          logs.map((log, index) => {
            // Highlight scores
            const highlightedLog = log.replace(/(\d+ - \d+)/, '<span class="text-yellow-400 font-bold">$1</span>');
            return (
              <div 
                key={index} 
                className="text-emerald-400/90 border-l-2 border-emerald-500/30 pl-3 py-1 hover:bg-slate-800/50 transition-colors"
                dangerouslySetInnerHTML={{ __html: highlightedLog }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
