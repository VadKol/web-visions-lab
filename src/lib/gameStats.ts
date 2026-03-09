export interface GameStats {
  gamesPlayed: number;
  bestScore: number;
  totalScore: number;
  bestTime?: number;
  totalTime?: number;
  wins?: number;
  losses?: number;
  lastPlayed?: string;
}

export interface AllGameStats {
  typing: GameStats;
  snake: GameStats;
  memory: GameStats;
  tetris: GameStats;
  clickspeed: GameStats;
}

const STORAGE_KEY = "minigames-stats";

const defaultStats: GameStats = {
  gamesPlayed: 0,
  bestScore: 0,
  totalScore: 0,
};

export const getGameStats = (gameId: string): GameStats => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const all = JSON.parse(stored) as AllGameStats;
      return all[gameId as keyof AllGameStats] || { ...defaultStats };
    }
  } catch {}
  return { ...defaultStats };
};

export const getAllStats = (): Partial<AllGameStats> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {};
};

export const updateGameStats = (gameId: string, update: Partial<GameStats>): GameStats => {
  const all = getAllStats();
  const current = all[gameId as keyof AllGameStats] || { ...defaultStats };
  
  const updated: GameStats = {
    ...current,
    ...update,
    gamesPlayed: (current.gamesPlayed || 0) + (update.gamesPlayed || 0),
    totalScore: (current.totalScore || 0) + (update.totalScore || 0),
    totalTime: (current.totalTime || 0) + (update.totalTime || 0),
    bestScore: Math.max(current.bestScore || 0, update.bestScore || 0),
    bestTime: update.bestTime !== undefined 
      ? (current.bestTime ? Math.min(current.bestTime, update.bestTime) : update.bestTime)
      : current.bestTime,
    wins: (current.wins || 0) + (update.wins || 0),
    losses: (current.losses || 0) + (update.losses || 0),
    lastPlayed: new Date().toISOString(),
  };

  const newAll = { ...all, [gameId]: updated };
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAll));
  } catch {}

  return updated;
};

export const formatTime = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

export const formatDate = (iso: string): string => {
  const date = new Date(iso);
  return date.toLocaleDateString();
};