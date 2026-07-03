import { createContext, useContext, useReducer, useCallback } from 'react';

const SCREENS = { AUTH: 'auth', LOBBY: 'lobby', GAME: 'game', SUMMARY: 'summary' };

const initialState = {
  screen: SCREENS.LOBBY,
  roomCode: null,
  playerRole: null,      // 'creator' | 'joiner'
  myPlayerNum: null,     // 1 | 2
  myName: '',
  myAvatarIndex: 0,
  opponentName: '',
  opponentAvatarIndex: 0,
  opponentId: null,
  opponentReady: false,   // opponent is present in the room AND ready to start
  roomConfig: {
    appleDensity: 0.35,
    timePerTurn: 60,
    mode: 'balanced',
    gridSize: 10,
  },
  applePositions: [],
  sessionId: null,
  summaryData: null,
  spectating: false,
  viewingFinishedGame: false,  // when true, GAME screen is read-only review
  lobbyView: 'default',        // 'default' | 'waiting' — controls LobbyPage tab on entry
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, screen: action.screen };
    case 'SET_PLAYER_INFO':
      return { ...state, myName: action.name, myAvatarIndex: action.avatarIndex };
    case 'SET_ROOM':
      return { ...state, roomCode: action.roomCode, playerRole: action.playerRole, roomConfig: action.config ?? state.roomConfig };
    case 'SET_PLAYER_NUM':
      return { ...state, myPlayerNum: action.num };
    case 'SET_ROLE':
      return { ...state, playerRole: action.role, myPlayerNum: action.role === 'creator' ? 1 : 2 };
    case 'SET_OPPONENT':
      return { ...state, opponentName: action.name, opponentAvatarIndex: action.avatarIndex, opponentId: action.id };
    case 'SET_OPPONENT_READY':
      return { ...state, opponentReady: action.ready };
    case 'SET_CONFIG':
      return { ...state, roomConfig: { ...state.roomConfig, ...action.config } };
    case 'GAME_START':
      return { ...state, screen: SCREENS.GAME, applePositions: action.applePositions, sessionId: action.sessionId, opponentReady: false };
    case 'GAME_END':
      return { ...state, screen: SCREENS.SUMMARY, summaryData: action.summaryData, viewingFinishedGame: false };
    case 'SET_SPECTATING':
      return { ...state, spectating: true, screen: SCREENS.GAME };
    case 'VIEW_BOARD':
      return { ...state, screen: SCREENS.GAME, viewingFinishedGame: true };
    case 'BACK_TO_SUMMARY':
      return { ...state, screen: SCREENS.SUMMARY };
    case 'RETURN_TO_ROOM':
      // Head back to the waiting room, clearing all finished-match + stale opponent state.
      return {
        ...state,
        screen: SCREENS.LOBBY,
        lobbyView: 'waiting',
        viewingFinishedGame: false,
        summaryData: null,
        opponentName: '',
        opponentAvatarIndex: 0,
        opponentId: null,
        opponentReady: false,
      };
    case 'SET_LOBBY_VIEW':
      return { ...state, lobbyView: action.view };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const setScreen = useCallback((screen) => dispatch({ type: 'SET_SCREEN', screen }), []);
  const setPlayerInfo = useCallback((name, avatarIndex) => dispatch({ type: 'SET_PLAYER_INFO', name, avatarIndex }), []);
  const setRoom = useCallback((roomCode, playerRole, config) => dispatch({ type: 'SET_ROOM', roomCode, playerRole, config }), []);
  const setPlayerNum = useCallback((num) => dispatch({ type: 'SET_PLAYER_NUM', num }), []);
  const setRole = useCallback((role) => dispatch({ type: 'SET_ROLE', role }), []);
  const setOpponent = useCallback((name, avatarIndex, id) => dispatch({ type: 'SET_OPPONENT', name, avatarIndex, id }), []);
  const setOpponentReady = useCallback((ready) => dispatch({ type: 'SET_OPPONENT_READY', ready }), []);
  const setConfig = useCallback((config) => dispatch({ type: 'SET_CONFIG', config }), []);
  const startGame = useCallback((applePositions, sessionId) => dispatch({ type: 'GAME_START', applePositions, sessionId }), []);
  const endGame = useCallback((summaryData) => dispatch({ type: 'GAME_END', summaryData }), []);
  const viewBoard = useCallback(() => dispatch({ type: 'VIEW_BOARD' }), []);
  const backToSummary = useCallback(() => dispatch({ type: 'BACK_TO_SUMMARY' }), []);
  const returnToRoom = useCallback(() => dispatch({ type: 'RETURN_TO_ROOM' }), []);
  const setLobbyView = useCallback((view) => dispatch({ type: 'SET_LOBBY_VIEW', view }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <GameContext.Provider value={{
      ...state,
      SCREENS,
      setScreen,
      setPlayerInfo,
      setRoom,
      setPlayerNum,
      setRole,
      setOpponent,
      setOpponentReady,
      setConfig,
      startGame,
      endGame,
      viewBoard,
      backToSummary,
      returnToRoom,
      setLobbyView,
      reset,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}

export { SCREENS };
