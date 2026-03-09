import { COUNTIES } from './league';

export interface Player {
  id: string;
  name: string;
  enName: string;
  number: number;
  position: 'OH' | 'OP' | 'MB' | 'S' | 'L';
  isStarter: boolean;
}

export interface Team {
  id: string;
  name: string;
  enName: string;
  branch: 'EnVO+' | 'NET';
  countyId: string;
  coach: string;
  enCoach: string;
  players: Player[];
}

const FIRST_NAMES_ZH = ['宇', '辰', '翔', '軒', '傑', '凱', '皓', '哲', '瑋', '柏', '宏', '霖', '翰', '彥', '廷', '睿', '恩', '浩', '鈞', '銘', '安', '平', '志', '明', '建', '國', '文', '武', '信', '義', '忠', '孝', '仁', '愛', '和', '平', '大', '中', '小', '天', '地', '玄', '黃', '宇', '宙', '洪', '荒', '日', '月', '盈', '昃', '辰', '宿', '列', '張', '寒', '來', '暑', '往', '秋', '收', '冬', '藏'];
const LAST_NAMES_ZH = ['陳', '林', '黃', '張', '李', '王', '吳', '劉', '蔡', '楊', '許', '鄭', '謝', '洪', '郭', '邱', '曾', '廖', '賴', '徐', '歐陽', '司徒', '諸葛', '上官'];
const FIRST_NAMES_EN = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua'];
const LAST_NAMES_EN = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];

const generatePlayers = (teamId: string): Player[] => {
  const players: Player[] = [];
  const positions: ('OH' | 'OP' | 'MB' | 'S' | 'L')[] = ['OH', 'OH', 'OP', 'MB', 'MB', 'S', 'L', 'OH', 'OP', 'MB', 'S', 'L', 'OH', 'MB'];
  
  // 6 starters, 6-8 bench. Total 12-14. Let's do 14.
  for (let i = 0; i < 14; i++) {
    const lnZh = LAST_NAMES_ZH[Math.floor(Math.random() * LAST_NAMES_ZH.length)];
    const totalLength = Math.floor(Math.random() * 3) + 3; // 3 to 5 characters total
    const fnLength = Math.max(1, totalLength - lnZh.length); // Ensure at least 1 character for first name
    
    let fnZh = '';
    for (let j = 0; j < fnLength; j++) {
      fnZh += FIRST_NAMES_ZH[Math.floor(Math.random() * FIRST_NAMES_ZH.length)];
    }
    const fnEn = FIRST_NAMES_EN[Math.floor(Math.random() * FIRST_NAMES_EN.length)];
    const lnEn = LAST_NAMES_EN[Math.floor(Math.random() * LAST_NAMES_EN.length)];
    
    players.push({
      id: `${teamId}-P${i + 1}`,
      name: `${lnZh}${fnZh}`,
      enName: `${fnEn} ${lnEn}`,
      number: i + 1,
      position: positions[i],
      isStarter: i < 7, // 6 starters + 1 Libero
    });
  }
  return players;
};

export const TEAMS: Team[] = [
  // EnVO+ League (9 teams)
  { id: 'T01', name: '旭日阿波羅', enName: 'Dawn Apollos', branch: 'EnVO+', countyId: 'C1', coach: '林教練', enCoach: 'Coach Lin', players: generatePlayers('T01') },
  { id: 'T02', name: '碧波海神', enName: 'Azure Poseidons', branch: 'EnVO+', countyId: 'C4', coach: '陳教練', enCoach: 'Coach Chen', players: generatePlayers('T02') },
  { id: 'T03', name: '綠葉遊俠', enName: 'Green Rangers', branch: 'EnVO+', countyId: 'C7', coach: '黃教練', enCoach: 'Coach Huang', players: generatePlayers('T03') },
  { id: 'T04', name: '炎陽火鳥', enName: 'Sun Firebirds', branch: 'EnVO+', countyId: 'C10', coach: '張教練', enCoach: 'Coach Zhang', players: generatePlayers('T04') },
  { id: 'T05', name: '星辰領航者', enName: 'Star Navigators', branch: 'EnVO+', countyId: 'C13', coach: '李教練', enCoach: 'Coach Lee', players: generatePlayers('T05') },
  { id: 'T06', name: '晨風飛鷹', enName: 'Wind Eagles', branch: 'EnVO+', countyId: 'C2', coach: '王教練', enCoach: 'Coach Wang', players: generatePlayers('T06') },
  { id: 'T07', name: '潮汐衝浪者', enName: 'Tide Surfers', branch: 'EnVO+', countyId: 'C5', coach: '吳教練', enCoach: 'Coach Wu', players: generatePlayers('T07') },
  { id: 'T08', name: '巨木泰坦', enName: 'Timber Titans', branch: 'EnVO+', countyId: 'C8', coach: '劉教練', enCoach: 'Coach Liu', players: generatePlayers('T08') },
  { id: 'T09', name: '旱砂蠍子', enName: 'Sand Scorpions', branch: 'EnVO+', countyId: 'C11', coach: '蔡教練', enCoach: 'Coach Tsai', players: generatePlayers('T09') },
  
  // NET League (9 teams)
  { id: 'T10', name: '曉光閃電', enName: 'Light Lightnings', branch: 'NET', countyId: 'C3', coach: '楊教練', enCoach: 'Coach Yang', players: generatePlayers('T10') },
  { id: 'T11', name: '珊瑚破浪', enName: 'Coral Breakers', branch: 'NET', countyId: 'C6', coach: '許教練', enCoach: 'Coach Hsu', players: generatePlayers('T11') },
  { id: 'T12', name: '幽林幻影', enName: 'Forest Phantoms', branch: 'NET', countyId: 'C9', coach: '鄭教練', enCoach: 'Coach Cheng', players: generatePlayers('T12') },
  { id: 'T13', name: '烽火戰狼', enName: 'Beacon Wolves', branch: 'NET', countyId: 'C12', coach: '謝教練', enCoach: 'Coach Hsieh', players: generatePlayers('T13') },
  { id: 'T14', name: '銀月騎士', enName: 'Silver Knights', branch: 'NET', countyId: 'C14', coach: '洪教練', enCoach: 'Coach Hung', players: generatePlayers('T14') },
  { id: 'T15', name: '幽夜暗影', enName: 'Night Shadows', branch: 'NET', countyId: 'C15', coach: '郭教練', enCoach: 'Coach Kuo', players: generatePlayers('T15') },
  { id: 'T16', name: '首都星芒', enName: 'Capital Starlights', branch: 'NET', countyId: 'C1', coach: '邱教練', enCoach: 'Coach Chiu', players: generatePlayers('T16') },
  { id: 'T17', name: '藍海海嘯', enName: 'Blue Tsunamis', branch: 'NET', countyId: 'C4', coach: '曾教練', enCoach: 'Coach Tseng', players: generatePlayers('T17') },
  { id: 'T18', name: '東方飛龍', enName: 'Eastern Dragons', branch: 'NET', countyId: 'C7', coach: '廖教練', enCoach: 'Coach Liao', players: generatePlayers('T18') },
];
