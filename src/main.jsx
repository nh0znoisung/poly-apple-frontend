import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';
import { GameProvider } from './context/GameContext.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SocketProvider>
        <ProfileProvider>
          <GameProvider>
            <App />
          </GameProvider>
        </ProfileProvider>
      </SocketProvider>
    </AuthProvider>
  </StrictMode>
);
