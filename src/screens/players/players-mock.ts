import { Players, PlayerStatus } from './players-types';

export const playersStub: Players = {
  FRANCO: {
    created: Date.now(),
    name: 'FRANCO',
    score: 45,
    status: PlayerStatus.PLAYING,
    updated: undefined,
    finished: undefined,
    elapsedTime: undefined,
  },
  SANCHO: {
    name: 'SANCHO',
    score: 47,
    status: PlayerStatus.PLAYING,
    created: Date.now(),
    updated: undefined,
    finished: undefined,
    elapsedTime: undefined,
  },
  PANZA: {
    name: 'PANZA',
    score: 47,
    status: PlayerStatus.PLAYING,
    created: Date.now(),
    updated: undefined,
    finished: undefined,
    elapsedTime: undefined,
  },
  SANTOS: {
    name: 'SANTOS',
    score: 50,
    status: PlayerStatus.PLAYING,
    created: Date.now(),
    updated: undefined,
    finished: undefined,
    elapsedTime: undefined,
  },
};
