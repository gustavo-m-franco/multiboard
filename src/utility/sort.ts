import { Player } from '../screens/players/players-types';

type SortPlayersFunction = (players: Players) => Player[];

type CompareFunction = (player1: unknown, player2: unknown) => number;

export const sortPlayersMaxScoreWins: SortPlayersFunction = players => {
  const compare: CompareFunction = (player1, player2) => {
    const playerA = player1 as Player;
    const playerB = player2 as Player;
    if (playerA.score > playerB.score) {
      return -1;
    } else if (playerA.score < playerB.score) {
      return 1;
    }
    if (playerA.finished && playerB.finished) {
      const p1Finished = new Date(playerA.finished);
      const p2Finished = new Date(playerB.finished);
      if (p1Finished < p2Finished) {
        return -1;
      } else if (p1Finished > p2Finished) {
        return 1;
      }
    }
    return 0;
  };
  const sortedPlayers = Object.values(players)
    .slice()
    .sort(compare) as Player[];
  return sortedPlayers;
};

export const sortPlayersMaxScoreLoses: SortPlayersFunction = players => {
  const compareFinished: CompareFunction = (player1, player2) => {
    const playerA = player1 as Player;
    const playerB = player2 as Player;
    if (playerA.finished && playerB.finished) {
      const p1Finished = new Date(playerA.finished);
      const p2Finished = new Date(playerB.finished);
      if (p1Finished > p2Finished) {
        return -1;
      } else if (p1Finished < p2Finished) {
        return 1;
      }
    }
    return 0;
  };

  const compareUnfinished: CompareFunction = (player1, player2) => {
    const playerA = player1 as Player;
    const playerB = player2 as Player;
    if (playerA.score > playerB.score) {
      return 1;
    } else if (playerA.score < playerB.score) {
      return -1;
    }
    return 0;
  };

  const playersArray = Object.values(players);

  const unfinishedPlayers = playersArray
    .slice()
    .filter(player => !(player as Player).finished);
  const sortedUnfinished = unfinishedPlayers.sort(compareUnfinished);

  const finishedPlayers = playersArray
    .slice()
    .filter(player => Boolean((player as Player).finished));
  const sortedFinished = finishedPlayers.sort(compareFinished);

  return [...sortedUnfinished, ...sortedFinished] as Player[];
};
