import {
  initialState,
  playersActions,
  playersReducer,
  PlayerStatus,
} from './players-reducer';

const idContainer = { id: 'id-test-1' };

jest.mock('react-native-uuid', () => ({
  v4: jest.fn(() => idContainer.id),
}));

describe('players-reducer', () => {
  let dateNowSpy: jest.SpyInstance;

  beforeAll(() => {
    // Lock Time
    dateNowSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => 1487076708000);
  });

  afterAll(() => {
    // Unlock Time
    dateNowSpy.mockRestore();
  });
  it('should add player', () => {
    const playerName = 'player1';
    const newState = playersReducer(
      initialState,
      playersActions.addPlayer(playerName),
    );
    expect(newState).toEqual({
      ...initialState,
      edited: true,
      players: {
        'id-test-1': {
          id: 'id-test-1',
          name: playerName.toUpperCase(),
          score: 0,
          status: PlayerStatus.PLAYING,
          created: 1487076708000,
        },
      },
    });
  });
});
