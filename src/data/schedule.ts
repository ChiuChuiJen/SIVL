import { TEAMS } from './teams';

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  branch: 'EnVO+' | 'NET' | 'Mixed';
  type: 'Regular' | 'Playoff' | 'Summer' | 'SummerPlayoff';
  name?: string;
  date: Date; // Scheduled start time
  status: 'scheduled' | 'playing' | 'finished';
  homeScore: number;
  awayScore: number;
  homeSets: number;
  awaySets: number;
  setScores: { home: number; away: number }[];
  logs: string[];
}

const REGULAR_SCHEDULE_TEMPLATE = [
  {
    Tue: [['A', 'B'], ['C', 'D'], ['E', 'F']],
    Wed: [['G', 'H'], ['A', 'I']],
    Fri: [['B', 'C'], ['D', 'E'], ['F', 'G']],
    Sat: [['H', 'I'], ['A', 'C'], ['B', 'D']],
    Sun: [['E', 'G'], ['F', 'H'], ['D', 'I']]
  },
  {
    Tue: [['A', 'D'], ['B', 'E'], ['C', 'F']],
    Wed: [['G', 'I'], ['H', 'A']],
    Fri: [['B', 'F'], ['C', 'G'], ['D', 'H']],
    Sat: [['E', 'I'], ['A', 'E'], ['B', 'G']],
    Sun: [['C', 'H'], ['D', 'F'], ['I', 'B']]
  },
  {
    Tue: [['A', 'F'], ['B', 'H'], ['C', 'I']],
    Wed: [['D', 'G'], ['E', 'A']],
    Fri: [['B', 'I'], ['C', 'D'], ['F', 'H']],
    Sat: [['G', 'A'], ['E', 'C'], ['D', 'B']],
    Sun: [['H', 'I'], ['F', 'E'], ['G', 'B']]
  },
  {
    Tue: [['A', 'H'], ['B', 'I'], ['C', 'E']],
    Wed: [['D', 'F'], ['G', 'C']],
    Fri: [['A', 'G'], ['B', 'D'], ['E', 'H']],
    Sat: [['F', 'I'], ['C', 'A'], ['D', 'G']],
    Sun: [['B', 'E'], ['F', 'C'], ['H', 'D']]
  },
  {
    Tue: [['A', 'I'], ['B', 'C'], ['D', 'E']],
    Wed: [['F', 'G'], ['H', 'B']],
    Fri: [['A', 'E'], ['C', 'G'], ['D', 'H']],
    Sat: [['F', 'B'], ['I', 'D'], ['A', 'F']],
    Sun: [['G', 'H'], ['E', 'C'], ['I', 'G']]
  },
  {
    Tue: [['A', 'C'], ['B', 'D'], ['E', 'H']],
    Wed: [['F', 'I'], ['G', 'A']],
    Fri: [['C', 'H'], ['D', 'F'], ['B', 'G']],
    Sat: [['E', 'I'], ['A', 'D'], ['F', 'C']],
    Sun: [['G', 'E'], ['H', 'B'], ['I', 'A']]
  },
  {
    Tue: [['A', 'G'], ['B', 'F'], ['C', 'D']],
    Wed: [['E', 'I'], ['H', 'A']],
    Fri: [['C', 'F'], ['D', 'I'], ['G', 'B']],
    Sat: [['E', 'A'], ['F', 'H'], ['I', 'C']],
    Sun: [['D', 'G'], ['B', 'E'], ['H', 'I']]
  },
  {
    Tue: [['A', 'E'], ['B', 'G'], ['C', 'H']],
    Wed: [['D', 'I'], ['F', 'A']],
    Fri: [['B', 'H'], ['C', 'E'], ['D', 'G']],
    Sat: [['F', 'B'], ['I', 'H'], ['A', 'D']],
    Sun: [['E', 'F'], ['C', 'G'], ['I', 'B']]
  },
  {
    Tue: [['A', 'B'], ['C', 'F'], ['D', 'H']],
    Wed: [['E', 'G'], ['I', 'A']],
    Fri: [['B', 'D'], ['C', 'I'], ['F', 'H']],
    Sat: [['G', 'C'], ['E', 'B'], ['A', 'H']],
    Sun: [['D', 'F'], ['G', 'I'], ['E', 'A']]
  },
  {
    Tue: [['A', 'C'], ['B', 'E'], ['F', 'I']],
    Wed: [['D', 'G'], ['H', 'A']],
    Fri: [['C', 'D'], ['E', 'F'], ['G', 'H']],
    Sat: [['I', 'B'], ['A', 'F'], ['C', 'G']],
    Sun: [['D', 'E'], ['H', 'I']]
  },
  {
    Tue: [['A', 'D'], ['B', 'F'], ['C', 'H']],
    Wed: [['E', 'I'], ['G', 'A']],
    Fri: [['B', 'C'], ['D', 'F'], ['H', 'G']],
    Sat: [['I', 'C'], ['A', 'E'], ['B', 'G']],
    Sun: [['F', 'H'], ['D', 'I']]
  },
  {
    Tue: [['A', 'F'], ['B', 'H'], ['C', 'I']],
    Wed: [['D', 'E'], ['G', 'B']],
    Fri: [['A', 'G'], ['C', 'D'], ['F', 'I']],
    Sat: [['E', 'H'], ['B', 'I'], ['A', 'C']],
    Sun: [['G', 'D'], ['F', 'E']]
  },
  {
    Tue: [['A', 'H'], ['B', 'C'], ['D', 'G']],
    Wed: [['E', 'I'], ['F', 'A']],
    Fri: [['B', 'G'], ['C', 'F'], ['H', 'D']],
    Sat: [['I', 'A'], ['E', 'C'], ['F', 'B']],
    Sun: [['G', 'H'], ['D', 'E']]
  },
  {
    Tue: [['A', 'I'], ['B', 'D'], ['C', 'E']],
    Wed: [['F', 'H'], ['G', 'A']],
    Fri: [['B', 'F'], ['D', 'I'], ['C', 'H']],
    Sat: [['E', 'G'], ['A', 'B'], ['F', 'C']],
    Sun: [['H', 'I'], ['D', 'G']]
  },
  {
    Tue: [['A', 'E'], ['B', 'G'], ['C', 'I']],
    Wed: [['D', 'H'], ['F', 'A']],
    Fri: [['B', 'H'], ['C', 'D'], ['E', 'I']],
    Sat: [['F', 'G'], ['A', 'D'], ['B', 'C']],
    Sun: [['H', 'E'], ['I', 'F']]
  },
  {
    Tue: [['A', 'G'], ['B', 'E'], ['C', 'H']],
    Wed: [['D', 'I'], ['F', 'B']],
    Fri: [['A', 'C'], ['D', 'E'], ['G', 'I']],
    Sat: [['H', 'F'], ['A', 'B'], ['C', 'G']],
    Sun: [['D', 'H'], ['E', 'F']]
  },
  {
    Tue: [['A', 'B'], ['C', 'D'], ['E', 'F']],
    Wed: [['G', 'H'], ['I', 'A']],
    Fri: [['B', 'C'], ['D', 'E'], ['F', 'G']],
    Sat: [['H', 'I'], ['A', 'D'], ['C', 'E']],
    Sun: [['F', 'H'], ['G', 'B']]
  }
];

const getFirstTuesday = (date: Date) => {
  const d = new Date(date);
  d.setDate(d.getDate() + ((2 - d.getDay() + 7) % 7));
  if (d.getTime() < date.getTime()) {
    d.setDate(d.getDate() + 7);
  }
  return d;
};

const getNextFriday = (date: Date) => {
  const d = new Date(date);
  d.setDate(d.getDate() + ((5 - d.getDay() + 7) % 7));
  return d;
};

const generateRegularSeason = (teams: string[], startDate: Date, branch: 'EnVO+' | 'NET'): Match[] => {
  const matches: Match[] = [];
  let currentWeekStart = getFirstTuesday(startDate);
  
  const teamMap: Record<string, string> = {
    'A': teams[0], 'B': teams[1], 'C': teams[2],
    'D': teams[3], 'E': teams[4], 'F': teams[5],
    'G': teams[6], 'H': teams[7], 'I': teams[8]
  };

  const dayOffsets: Record<string, number> = {
    'Tue': 0, 'Wed': 1, 'Fri': 3, 'Sat': 4, 'Sun': 5
  };

  const getHours = (day: string, index: number, total: number) => {
    if (day === 'Tue' || day === 'Fri') {
      return total === 3 ? [16, 18, 20][index] : [18, 20][index];
    }
    if (day === 'Wed') {
      return [18, 20][index];
    }
    if (day === 'Sat' || day === 'Sun') {
      return total === 3 ? [14, 16, 18][index] : [14, 16][index];
    }
    return 18;
  };

  REGULAR_SCHEDULE_TEMPLATE.forEach((week) => {
    Object.entries(week).forEach(([day, dayMatches]) => {
      const offset = dayOffsets[day];
      const matchDate = new Date(currentWeekStart);
      matchDate.setDate(matchDate.getDate() + offset);
      
      dayMatches.forEach((matchPair, index) => {
        const home = teamMap[matchPair[0]];
        const away = teamMap[matchPair[1]];
        
        const specificDate = new Date(matchDate);
        specificDate.setHours(getHours(day, index, dayMatches.length), 0, 0, 0);

        matches.push({
          id: '',
          homeTeamId: home,
          awayTeamId: away,
          branch,
          type: 'Regular',
          date: specificDate,
          status: 'scheduled',
          homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: []
        });
      });
    });
    currentWeekStart.setDate(currentWeekStart.getDate() + 7); // Next week
  });

  return matches;
};

const generateSummerSeason = (envoTeams: string[], netTeams: string[], startDate: Date): Match[] => {
  const matches: Match[] = [];
  let currentDate = getNextFriday(startDate);
  const n = envoTeams.length; // 9
  
  for (let round = 0; round < n; round++) {
    let matchIndex = 0;
    for (let i = 0; i < n; i++) {
      const home = envoTeams[i];
      const away = netTeams[(i + round) % n];
      
      const matchDate = new Date(currentDate);
      // Spread 9 matches across the weekend: 2 Fri, 4 Sat, 3 Sun
      const daysOffset = [0, 0, 1, 1, 1, 1, 2, 2, 2];
      const hours = [18, 20, 14, 16, 18, 20, 14, 16, 18];
      
      matchDate.setDate(matchDate.getDate() + daysOffset[matchIndex]);
      matchDate.setHours(hours[matchIndex], 0, 0, 0);

      matches.push({
        id: '',
        homeTeamId: round % 2 === 0 ? home : away,
        awayTeamId: round % 2 === 0 ? away : home,
        branch: 'Mixed',
        type: 'Summer',
        date: matchDate,
        status: 'scheduled',
        homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: []
      });
      matchIndex++;
    }
    currentDate.setDate(currentDate.getDate() + 7);
  }
  return matches;
};

const generatePlayoffs = (): Match[] => {
  const matches: Match[] = [];
  
  // May Playoffs
  // May 9: SF
  const may9 = new Date('2026-05-09T14:00:00Z');
  matches.push({ id: '', homeTeamId: 'TBD_ENVO_1', awayTeamId: 'TBD_ENVO_4', branch: 'EnVO+', type: 'Playoff', name: 'EnVO+ Semi-Final 1', date: new Date(may9.setHours(14)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });
  matches.push({ id: '', homeTeamId: 'TBD_ENVO_2', awayTeamId: 'TBD_ENVO_3', branch: 'EnVO+', type: 'Playoff', name: 'EnVO+ Semi-Final 2', date: new Date(may9.setHours(16)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });
  matches.push({ id: '', homeTeamId: 'TBD_NET_1', awayTeamId: 'TBD_NET_4', branch: 'NET', type: 'Playoff', name: 'NET Semi-Final 1', date: new Date(may9.setHours(18)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });
  matches.push({ id: '', homeTeamId: 'TBD_NET_2', awayTeamId: 'TBD_NET_3', branch: 'NET', type: 'Playoff', name: 'NET Semi-Final 2', date: new Date(may9.setHours(20)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });

  // May 16: Finals
  const may16 = new Date('2026-05-16T14:00:00Z');
  matches.push({ id: '', homeTeamId: 'TBD_ENVO_F1', awayTeamId: 'TBD_ENVO_F2', branch: 'EnVO+', type: 'Playoff', name: 'EnVO+ Final', date: new Date(may16.setHours(16)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });
  matches.push({ id: '', homeTeamId: 'TBD_NET_F1', awayTeamId: 'TBD_NET_F2', branch: 'NET', type: 'Playoff', name: 'NET Final', date: new Date(may16.setHours(19)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });

  // May 23: SIVL Championship
  const may23 = new Date('2026-05-23T18:00:00Z');
  matches.push({ id: '', homeTeamId: 'TBD_CHAMP_ENVO', awayTeamId: 'TBD_CHAMP_NET', branch: 'Mixed', type: 'Playoff', name: 'SIVL Championship', date: may23, status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });

  // October Summer Playoffs
  // Oct 3: QF
  const oct3 = new Date('2026-10-03T14:00:00Z');
  matches.push({ id: '', homeTeamId: 'TBD_SUM_3', awayTeamId: 'TBD_SUM_6', branch: 'Mixed', type: 'SummerPlayoff', name: 'Summer Quarter-Final 1', date: new Date(oct3.setHours(14)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });
  matches.push({ id: '', homeTeamId: 'TBD_SUM_4', awayTeamId: 'TBD_SUM_5', branch: 'Mixed', type: 'SummerPlayoff', name: 'Summer Quarter-Final 2', date: new Date(oct3.setHours(18)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });

  // Oct 10: SF
  const oct10 = new Date('2026-10-10T14:00:00Z');
  matches.push({ id: '', homeTeamId: 'TBD_SUM_1', awayTeamId: 'TBD_SUM_QF1', branch: 'Mixed', type: 'SummerPlayoff', name: 'Summer Semi-Final 1', date: new Date(oct10.setHours(14)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });
  matches.push({ id: '', homeTeamId: 'TBD_SUM_2', awayTeamId: 'TBD_SUM_QF2', branch: 'Mixed', type: 'SummerPlayoff', name: 'Summer Semi-Final 2', date: new Date(oct10.setHours(18)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });

  // Oct 17: Final
  const oct17 = new Date('2026-10-17T18:00:00Z');
  matches.push({ id: '', homeTeamId: 'TBD_SUM_F1', awayTeamId: 'TBD_SUM_F2', branch: 'Mixed', type: 'SummerPlayoff', name: 'Summer Championship', date: oct17, status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });

  return matches;
};

export const generateSchedule = (): Match[] => {
  const envoTeams = TEAMS.filter(t => t.branch === 'EnVO+').map(t => t.id);
  const netTeams = TEAMS.filter(t => t.branch === 'NET').map(t => t.id);

  const regStartDate = new Date('2026-01-01T00:00:00Z');
  const envoMatches = generateRegularSeason(envoTeams, regStartDate, 'EnVO+');
  const netMatches = generateRegularSeason(netTeams, regStartDate, 'NET');

  const sumStartDate = new Date('2026-08-01T00:00:00Z');
  const summerMatches = generateSummerSeason(
    envoTeams, 
    netTeams, 
    sumStartDate
  );

  const playoffMatches = generatePlayoffs();

  const allMatches = [...envoMatches, ...netMatches, ...summerMatches, ...playoffMatches]
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Re-assign IDs to be sequential by date
  return allMatches.map((m, index) => ({ ...m, id: `M${(index + 1).toString().padStart(3, '0')}` }));
};

export const INITIAL_SCHEDULE = generateSchedule();
