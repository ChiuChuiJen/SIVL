import { Match } from '../data/schedule';
import { TEAMS } from '../data/teams';

export const calculateStandings = (matches: Match[], branch: 'EnVO+' | 'NET' | 'Mixed', type: 'Regular' | 'Summer') => {
  let branchTeams = TEAMS;
  if (branch !== 'Mixed') {
    branchTeams = TEAMS.filter(t => t.branch === branch);
  }

  const standings = branchTeams.map(team => {
    const teamMatches = matches.filter(m => 
      m.status === 'finished' && 
      m.type === type &&
      (m.homeTeamId === team.id || m.awayTeamId === team.id)
    );
    
    let wins = 0;
    let losses = 0;
    let points = 0;

    teamMatches.forEach(m => {
      const isHome = m.homeTeamId === team.id;
      const won = isHome ? m.homeSets > m.awaySets : m.awaySets > m.homeSets;
      if (won) {
        wins++;
        points += 3; // Simplified points system
      } else {
        losses++;
      }
    });

    return { ...team, wins, losses, points, played: wins + losses };
  });

  return standings.sort((a, b) => b.points - a.points || b.wins - a.wins);
};
