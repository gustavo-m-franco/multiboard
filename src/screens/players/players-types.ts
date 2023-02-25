export enum PlayerStatus {
  PLAYING = 'PLAYING',
  WON = 'WON',
  LOST = 'LOST',
  ENDED = 'ENDED',
}

export interface Player {
  name: string;
  score: number;
  status: PlayerStatus;
  created?: number;
  updated?: number;
  finished?: number;
  elapsedTime?: number;
}

export type Players = Record<string, Player>;

export interface PlayersState {
  selectedPlayerName?: string;
  edited: boolean;
  players: Players;
}

export interface UpdatePlayerScore {
  name: string;
  delta: number;
}

export interface UpdatePlayerStatus {
  name: string;
  status: PlayerStatus;
  elapsedTime?: number;
}
