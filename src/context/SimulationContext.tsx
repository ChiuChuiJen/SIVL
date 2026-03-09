import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Match, INITIAL_SCHEDULE } from '../data/schedule';
import { TEAMS } from '../data/teams';
import { Language } from '../i18n/translations';
import { calculateStandings } from '../utils/standings';

interface SimulationState {
  currentTime: Date;
  isPlaying: boolean;
  speed: number;
  matches: Match[];
  language: Language;
  logs: string[];
  togglePlay: () => void;
  setSpeed: (speed: number) => void;
  nextDay: () => void;
  jump30Mins: () => void;
  toggleLanguage: () => void;
}

const SimulationContext = createContext<SimulationState | undefined>(undefined);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  const [currentTime, setCurrentTime] = useState(new Date('2026-01-01T00:00:00'));
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [matches, setMatches] = useState<Match[]>(INITIAL_SCHEDULE);
  const [language, setLanguage] = useState<Language>('zh');
  const [logs, setLogs] = useState<string[]>([]);

  const toggleLanguage = () => setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  const togglePlay = () => setIsPlaying(prev => !prev);
  const nextDay = () => {
    setCurrentTime(prev => {
      const next = new Date(prev);
      next.setDate(next.getDate() + 1);
      next.setHours(0, 0, 0, 0);
      return next;
    });
  };

  const jump30Mins = useCallback(() => {
    setCurrentTime(prev => {
      const next = new Date(prev.getTime() + 30 * 60000);
      return next;
    });
  }, []);

  // Simulation loop
  useEffect(() => {
    if (!isPlaying) return;
    
    // speed 1x = 1 second per tick (30 mins)
    // speed 2x = 0.5 seconds per tick
    const intervalTime = 1000 / speed;
    
    const timer = setInterval(() => {
      jump30Mins();
    }, intervalTime);
    
    return () => clearInterval(timer);
  }, [isPlaying, speed, jump30Mins]);

  // Match simulation logic
  useEffect(() => {
    setMatches(prevMatches => {
      let changed = false;
      const newMatches = [...prevMatches];

      const currentYear = currentTime.getFullYear();
      const currentYearMatches = newMatches.filter(m => m.date.getFullYear() === currentYear);

      // Resolve Regular Playoffs on May 5
      if (currentTime >= new Date(`${currentYear}-05-05T00:00:00Z`)) {
        const envoStandings = calculateStandings(currentYearMatches, 'EnVO+', 'Regular');
        const netStandings = calculateStandings(currentYearMatches, 'NET', 'Regular');
        
        newMatches.forEach(m => {
          if (m.homeTeamId === `TBD_ENVO_1_${currentYear}`) { m.homeTeamId = envoStandings[0].id; changed = true; }
          if (m.awayTeamId === `TBD_ENVO_4_${currentYear}`) { m.awayTeamId = envoStandings[3].id; changed = true; }
          if (m.homeTeamId === `TBD_ENVO_2_${currentYear}`) { m.homeTeamId = envoStandings[1].id; changed = true; }
          if (m.awayTeamId === `TBD_ENVO_3_${currentYear}`) { m.awayTeamId = envoStandings[2].id; changed = true; }
          
          if (m.homeTeamId === `TBD_NET_1_${currentYear}`) { m.homeTeamId = netStandings[0].id; changed = true; }
          if (m.awayTeamId === `TBD_NET_4_${currentYear}`) { m.awayTeamId = netStandings[3].id; changed = true; }
          if (m.homeTeamId === `TBD_NET_2_${currentYear}`) { m.homeTeamId = netStandings[1].id; changed = true; }
          if (m.awayTeamId === `TBD_NET_3_${currentYear}`) { m.awayTeamId = netStandings[2].id; changed = true; }
        });
      }
      
      // Resolve Regular Finals on May 10 (after SF)
      if (currentTime >= new Date(`${currentYear}-05-10T00:00:00Z`)) {
        const envoSF1 = currentYearMatches.find(m => m.name === 'EnVO+ Semi-Final 1');
        const envoSF2 = currentYearMatches.find(m => m.name === 'EnVO+ Semi-Final 2');
        const netSF1 = currentYearMatches.find(m => m.name === 'NET Semi-Final 1');
        const netSF2 = currentYearMatches.find(m => m.name === 'NET Semi-Final 2');
        
        newMatches.forEach(m => {
          if (m.name === 'EnVO+ Final' && m.date.getFullYear() === currentYear) {
            if (envoSF1?.status === 'finished' && m.homeTeamId === `TBD_ENVO_F1_${currentYear}`) { m.homeTeamId = envoSF1.homeSets > envoSF1.awaySets ? envoSF1.homeTeamId : envoSF1.awayTeamId; changed = true; }
            if (envoSF2?.status === 'finished' && m.awayTeamId === `TBD_ENVO_F2_${currentYear}`) { m.awayTeamId = envoSF2.homeSets > envoSF2.awaySets ? envoSF2.homeTeamId : envoSF2.awayTeamId; changed = true; }
          }
          if (m.name === 'NET Final' && m.date.getFullYear() === currentYear) {
            if (netSF1?.status === 'finished' && m.homeTeamId === `TBD_NET_F1_${currentYear}`) { m.homeTeamId = netSF1.homeSets > netSF1.awaySets ? netSF1.homeTeamId : netSF1.awayTeamId; changed = true; }
            if (netSF2?.status === 'finished' && m.awayTeamId === `TBD_NET_F2_${currentYear}`) { m.awayTeamId = netSF2.homeSets > netSF2.awaySets ? netSF2.homeTeamId : netSF2.awayTeamId; changed = true; }
          }
        });
      }

      // Resolve SIVL Championship on May 17
      if (currentTime >= new Date(`${currentYear}-05-17T00:00:00Z`)) {
        const envoFinal = currentYearMatches.find(m => m.name === 'EnVO+ Final');
        const netFinal = currentYearMatches.find(m => m.name === 'NET Final');
        newMatches.forEach(m => {
          if (m.name === 'SIVL Championship' && m.date.getFullYear() === currentYear) {
            if (envoFinal?.status === 'finished' && m.homeTeamId === `TBD_CHAMP_ENVO_${currentYear}`) { m.homeTeamId = envoFinal.homeSets > envoFinal.awaySets ? envoFinal.homeTeamId : envoFinal.awayTeamId; changed = true; }
            if (netFinal?.status === 'finished' && m.awayTeamId === `TBD_CHAMP_NET_${currentYear}`) { m.awayTeamId = netFinal.homeSets > netFinal.awaySets ? netFinal.homeTeamId : netFinal.awayTeamId; changed = true; }
          }
        });
      }

      // Resolve Summer Playoffs on Oct 1
      if (currentTime >= new Date(`${currentYear}-10-01T00:00:00Z`)) {
        const summerStandings = calculateStandings(currentYearMatches, 'Mixed', 'Summer');
        newMatches.forEach(m => {
          if (m.homeTeamId === `TBD_SUM_3_${currentYear}`) { m.homeTeamId = summerStandings[2].id; changed = true; }
          if (m.awayTeamId === `TBD_SUM_6_${currentYear}`) { m.awayTeamId = summerStandings[5].id; changed = true; }
          if (m.homeTeamId === `TBD_SUM_4_${currentYear}`) { m.homeTeamId = summerStandings[3].id; changed = true; }
          if (m.awayTeamId === `TBD_SUM_5_${currentYear}`) { m.awayTeamId = summerStandings[4].id; changed = true; }
          if (m.homeTeamId === `TBD_SUM_1_${currentYear}`) { m.homeTeamId = summerStandings[0].id; changed = true; }
          if (m.homeTeamId === `TBD_SUM_2_${currentYear}`) { m.homeTeamId = summerStandings[1].id; changed = true; }
        });
      }

      // Resolve Summer SF on Oct 4
      if (currentTime >= new Date(`${currentYear}-10-04T00:00:00Z`)) {
        const sumQF1 = currentYearMatches.find(m => m.name === 'Summer Quarter-Final 1');
        const sumQF2 = currentYearMatches.find(m => m.name === 'Summer Quarter-Final 2');
        newMatches.forEach(m => {
          if (m.name === 'Summer Semi-Final 1' && m.date.getFullYear() === currentYear && sumQF1?.status === 'finished' && m.awayTeamId === `TBD_SUM_QF1_${currentYear}`) {
             m.awayTeamId = sumQF1.homeSets > sumQF1.awaySets ? sumQF1.homeTeamId : sumQF1.awayTeamId; changed = true;
          }
          if (m.name === 'Summer Semi-Final 2' && m.date.getFullYear() === currentYear && sumQF2?.status === 'finished' && m.awayTeamId === `TBD_SUM_QF2_${currentYear}`) {
             m.awayTeamId = sumQF2.homeSets > sumQF2.awaySets ? sumQF2.homeTeamId : sumQF2.awayTeamId; changed = true;
          }
        });
      }

      // Resolve Summer Final on Oct 11
      if (currentTime >= new Date(`${currentYear}-10-11T00:00:00Z`)) {
        const sumSF1 = currentYearMatches.find(m => m.name === 'Summer Semi-Final 1');
        const sumSF2 = currentYearMatches.find(m => m.name === 'Summer Semi-Final 2');
        newMatches.forEach(m => {
          if (m.name === 'Summer Championship' && m.date.getFullYear() === currentYear) {
            if (sumSF1?.status === 'finished' && m.homeTeamId === `TBD_SUM_F1_${currentYear}`) { m.homeTeamId = sumSF1.homeSets > sumSF1.awaySets ? sumSF1.homeTeamId : sumSF1.awayTeamId; changed = true; }
            if (sumSF2?.status === 'finished' && m.awayTeamId === `TBD_SUM_F2_${currentYear}`) { m.awayTeamId = sumSF2.homeSets > sumSF2.awaySets ? sumSF2.homeTeamId : sumSF2.awayTeamId; changed = true; }
          }
        });
      }

      const updatedMatches = newMatches.map(match => {
        // If match is scheduled and current time is past start time
        if (match.status === 'scheduled' && currentTime >= match.date && !match.homeTeamId.startsWith('TBD_') && !match.awayTeamId.startsWith('TBD_')) {
          changed = true;
          return { ...match, status: 'playing' as const };
        }
        
        // If match is playing and 2 hours have passed (4 ticks of 30 mins)
        const endTime = new Date(match.date.getTime() + 2 * 60 * 60000);
        if (match.status === 'playing' && currentTime >= endTime) {
          changed = true;
          // Simulate result
          const homeWins = Math.random() > 0.5;
          const homeSets = homeWins ? 3 : Math.floor(Math.random() * 3);
          const awaySets = homeWins ? Math.floor(Math.random() * 3) : 3;
          
          const setScores = [];
          for(let i=0; i<homeSets+awaySets; i++) {
             const isHomeSetWin = i < homeSets; // Simplified
             setScores.push({
               home: isHomeSetWin ? 25 : Math.floor(Math.random() * 23),
               away: isHomeSetWin ? Math.floor(Math.random() * 23) : 25
             });
          }

          const homeTeam = TEAMS.find(t => t.id === match.homeTeamId);
          const awayTeam = TEAMS.find(t => t.id === match.awayTeamId);
          
          const matchNameStr = match.name ? `[${match.name}] ` : '';
          
          setLogs(prev => [
            `[${currentTime.toLocaleString()}] ${matchNameStr}${homeTeam?.name} ${homeSets} - ${awaySets} ${awayTeam?.name} (${match.branch})`,
            ...prev
          ].slice(0, 100)); // Keep last 100 logs

          return { 
            ...match, 
            status: 'finished' as const,
            homeSets,
            awaySets,
            setScores
          };
        }
        
        return match;
      });
      
      return changed ? updatedMatches : prevMatches;
    });
  }, [currentTime]);

  return (
    <SimulationContext.Provider value={{
      currentTime, isPlaying, speed, matches, language, logs,
      togglePlay, setSpeed, nextDay, jump30Mins, toggleLanguage
    }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) throw new Error('useSimulation must be used within a SimulationProvider');
  return context;
};
