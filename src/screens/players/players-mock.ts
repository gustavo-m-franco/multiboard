import { Players, PlayerStatus } from './players-types';

export const playersStub: Players = {
  '3c92ce94-1663-46b4-a418-49d5a89e9ae5': {
    id: '3c92ce94-1663-46b4-a418-49d5a89e9ae5',
    created: Date.now(),
    name: 'FRANCO',
    score: 45,
    status: PlayerStatus.PLAYING,
    updated: undefined,
    finished: undefined,
    elapsedTime: undefined,
  },
  'ae555f4e-0a35-4f56-a793-75229431e009': {
    id: 'ae555f4e-0a35-4f56-a793-75229431e009',
    name: 'SANCHO',
    score: 47,
    status: PlayerStatus.PLAYING,
    created: Date.now(),
    updated: undefined,
    finished: undefined,
    elapsedTime: undefined,
  },
  '7e59287b-f1fa-48a2-9f51-2693427792a4': {
    id: '7e59287b-f1fa-48a2-9f51-2693427792a4',
    name: 'PANZA',
    score: 47,
    status: PlayerStatus.PLAYING,
    created: Date.now(),
    updated: undefined,
    finished: undefined,
    elapsedTime: undefined,
  },
  '020ce3a0-5822-477b-bb39-02196447e77e': {
    id: '020ce3a0-5822-477b-bb39-02196447e77e',
    name: 'SANTOS',
    score: 50,
    status: PlayerStatus.PLAYING,
    created: Date.now(),
    updated: undefined,
    finished: undefined,
    elapsedTime: undefined,
  },
};
