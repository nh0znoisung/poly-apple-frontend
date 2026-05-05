import { useEffect, useState } from 'react';
import { useGameContext, SCREENS } from './context/GameContext.jsx';
import { useAuth } from './hooks/useAuth.js';

import BgCanvas from './components/ui/BgCanvas.jsx';
import Navbar from './components/ui/Navbar.jsx';
import SettingsGear from './components/ui/SettingsGear.jsx';
import TutorialOverlay from './components/ui/TutorialOverlay.jsx';
import LoginPage from './components/auth/LoginPage.jsx';
import LobbyPage from './components/lobby/LobbyPage.jsx';
import GameScreen from './components/game/GameScreen.jsx';
import SummaryScreen from './components/SummaryScreen.jsx';

import './styles/global.css';
import './styles/auth.css';
import './styles/lobby.css';
import './styles/game.css';

export default function App() {
  const { screen, setScreen, SCREENS: S } = useGameContext();
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  // Auto-close login screen once the user is authenticated
  useEffect(() => {
    if (user && showLogin) setShowLogin(false);
  }, [user, showLogin]);

  return (
    <>
      <BgCanvas />

      {/* Screens — login takes over the whole view like a route */}
      {showLogin ? (
        <LoginPage onClose={() => setShowLogin(false)} />
      ) : (
        <>
          <Navbar onSignInClick={() => setShowLogin(true)} />
          <SettingsGear onRulesClick={() => setShowTutorial(true)} />
          <LobbyPage />
          <GameScreen />
          <SummaryScreen />
        </>
      )}

      <TutorialOverlay open={showTutorial} onClose={() => setShowTutorial(false)} />
    </>
  );
}
