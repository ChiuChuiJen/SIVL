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

const generateRoundRobin = (teams: string[]): [string, string][] => {
  const matches: [string, string][] = [];
  const n = teams.length;
  const dummy = n % 2 !== 0 ? 'BYE' : null;
  const teamsWithBye = dummy ? [...teams, dummy] : [...teams];
  const numTeams = teamsWithBye.length;

  for (let round = 0; round < numTeams - 1; round++) {
    for (let i = 0; i < numTeams / 2; i++) {
      const home = teamsWithBye[i];
      const away = teamsWithBye[numTeams - 1 - i];
      if (home !== 'BYE' && away !== 'BYE') {
        matches.push([home, away]);
      }
    }
    // Rotate
    teamsWithBye.splice(1, 0, teamsWithBye.pop()!);
  }
  return matches;
};

const generateRegularSeason = (teams: string[], startDate: Date, branch: 'EnVO+' | 'NET'): Match[] => {
  const matches: Match[] = [];
  let currentWeekStart = getFirstTuesday(startDate);
  
  const singleRR = generateRoundRobin(teams);
  const doubleRR = [...singleRR, ...singleRR.map(m => [m[1], m[0]] as [string, string])];
  
  const SLOTS = [
    { day: 0, hour: 18 }, // Tue
    { day: 0, hour: 20 },
    { day: 1, hour: 18 }, // Wed
    { day: 1, hour: 20 },
    { day: 3, hour: 18 }, // Fri
    { day: 3, hour: 20 },
    { day: 4, hour: 14 }, // Sat
    { day: 4, hour: 16 },
    { day: 4, hour: 18 },
    { day: 5, hour: 14 }, // Sun
    { day: 5, hour: 16 },
    { day: 5, hour: 18 },
  ];

  doubleRR.forEach((matchPair, index) => {
    const weekIndex = Math.floor(index / 12);
    const slotIndex = index % 12;
    const slot = SLOTS[slotIndex];
    
    const specificDate = new Date(currentWeekStart);
    specificDate.setDate(specificDate.getDate() + (weekIndex * 7) + slot.day);
    specificDate.setHours(slot.hour, 0, 0, 0);

    matches.push({
      id: '',
      homeTeamId: matchPair[0],
      awayTeamId: matchPair[1],
      branch,
      type: 'Regular',
      date: specificDate,
      status: 'scheduled',
      homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: []
    });
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

const generatePlayoffs = (year: number): Match[] => {
  const matches: Match[] = [];
  
  // May Playoffs
  // May 9: SF
  const may9 = new Date(`${year}-05-09T14:00:00Z`);
  matches.push({ id: '', homeTeamId: `TBD_ENVO_1_${year}`, awayTeamId: `TBD_ENVO_4_${year}`, branch: 'EnVO+', type: 'Playoff', name: 'EnVO+ Semi-Final 1', date: new Date(may9.setHours(14)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });
  matches.push({ id: '', homeTeamId: `TBD_ENVO_2_${year}`, awayTeamId: `TBD_ENVO_3_${year}`, branch: 'EnVO+', type: 'Playoff', name: 'EnVO+ Semi-Final 2', date: new Date(may9.setHours(16)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });
  matches.push({ id: '', homeTeamId: `TBD_NET_1_${year}`, awayTeamId: `TBD_NET_4_${year}`, branch: 'NET', type: 'Playoff', name: 'NET Semi-Final 1', date: new Date(may9.setHours(18)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });
  matches.push({ id: '', homeTeamId: `TBD_NET_2_${year}`, awayTeamId: `TBD_NET_3_${year}`, branch: 'NET', type: 'Playoff', name: 'NET Semi-Final 2', date: new Date(may9.setHours(20)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });

  // May 16: Finals
  const may16 = new Date(`${year}-05-16T14:00:00Z`);
  matches.push({ id: '', homeTeamId: `TBD_ENVO_F1_${year}`, awayTeamId: `TBD_ENVO_F2_${year}`, branch: 'EnVO+', type: 'Playoff', name: 'EnVO+ Final', date: new Date(may16.setHours(16)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });
  matches.push({ id: '', homeTeamId: `TBD_NET_F1_${year}`, awayTeamId: `TBD_NET_F2_${year}`, branch: 'NET', type: 'Playoff', name: 'NET Final', date: new Date(may16.setHours(19)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });

  // May 23: SIVL Championship
  const may23 = new Date(`${year}-05-23T18:00:00Z`);
  matches.push({ id: '', homeTeamId: `TBD_CHAMP_ENVO_${year}`, awayTeamId: `TBD_CHAMP_NET_${year}`, branch: 'Mixed', type: 'Playoff', name: 'SIVL Championship', date: may23, status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });

  // October Summer Playoffs
  // Oct 3: QF
  const oct3 = new Date(`${year}-10-03T14:00:00Z`);
  matches.push({ id: '', homeTeamId: `TBD_SUM_3_${year}`, awayTeamId: `TBD_SUM_6_${year}`, branch: 'Mixed', type: 'SummerPlayoff', name: 'Summer Quarter-Final 1', date: new Date(oct3.setHours(14)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });
  matches.push({ id: '', homeTeamId: `TBD_SUM_4_${year}`, awayTeamId: `TBD_SUM_5_${year}`, branch: 'Mixed', type: 'SummerPlayoff', name: 'Summer Quarter-Final 2', date: new Date(oct3.setHours(18)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });

  // Oct 10: SF
  const oct10 = new Date(`${year}-10-10T14:00:00Z`);
  matches.push({ id: '', homeTeamId: `TBD_SUM_1_${year}`, awayTeamId: `TBD_SUM_QF1_${year}`, branch: 'Mixed', type: 'SummerPlayoff', name: 'Summer Semi-Final 1', date: new Date(oct10.setHours(14)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });
  matches.push({ id: '', homeTeamId: `TBD_SUM_2_${year}`, awayTeamId: `TBD_SUM_QF2_${year}`, branch: 'Mixed', type: 'SummerPlayoff', name: 'Summer Semi-Final 2', date: new Date(oct10.setHours(18)), status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });

  // Oct 17: Final
  const oct17 = new Date(`${year}-10-17T18:00:00Z`);
  matches.push({ id: '', homeTeamId: `TBD_SUM_F1_${year}`, awayTeamId: `TBD_SUM_F2_${year}`, branch: 'Mixed', type: 'SummerPlayoff', name: 'Summer Championship', date: oct17, status: 'scheduled', homeScore: 0, awayScore: 0, homeSets: 0, awaySets: 0, setScores: [], logs: [] });

  return matches;
};

export const generateSchedule = (): Match[] => {
  const envoTeams = TEAMS.filter(t => t.branch === 'EnVO+').map(t => t.id);
  const netTeams = TEAMS.filter(t => t.branch === 'NET').map(t => t.id);

  const allMatches: Match[] = [];

  for (let year = 2026; year <= 2030; year++) {
    const regStartDate = new Date(`${year}-01-01T00:00:00Z`);
    const envoMatches = generateRegularSeason(envoTeams, regStartDate, 'EnVO+');
    const netMatches = generateRegularSeason(netTeams, regStartDate, 'NET');

    const sumStartDate = new Date(`${year}-08-01T00:00:00Z`);
    const summerMatches = generateSummerSeason(
      envoTeams, 
      netTeams, 
      sumStartDate
    );

    const playoffMatches = generatePlayoffs(year);

    allMatches.push(...envoMatches, ...netMatches, ...summerMatches, ...playoffMatches);
  }

  allMatches.sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Re-assign IDs to be sequential by date
  return allMatches.map((m, index) => ({ ...m, id: `M${(index + 1).toString().padStart(4, '0')}` }));
};

export const INITIAL_SCHEDULE = generateSchedule();
