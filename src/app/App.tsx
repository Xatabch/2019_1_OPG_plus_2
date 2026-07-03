import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { GuestRoute } from '../components/routing/ProtectedRoute';
import { HomePage } from '../pages/HomePage';
import { SignInPage } from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';
import { ProfilePage } from '../pages/ProfilePage';
import { EditProfilePage } from '../pages/EditProfilePage';
import { ScoreboardPage } from '../pages/ScoreboardPage';
import { GamePage } from '../pages/GamePage';
import { UrlPage } from '../pages/UrlPage';
import { MultiplayerPage } from '../pages/MultiplayerPage';
import { RulesPage } from '../pages/RulesPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signin"
            element={
              <GuestRoute>
                <SignInPage />
              </GuestRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <GuestRoute>
                <SignUpPage />
              </GuestRoute>
            }
          />
          <Route path="/me" element={<ProfilePage />} />
          <Route path="/editme" element={<EditProfilePage />} />
          <Route path="/leaders" element={<ScoreboardPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/url" element={<UrlPage />} />
          <Route path="/multiplayer" element={<MultiplayerPage />} />
          <Route path="/multiplayer/:roomId" element={<MultiplayerPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/notfound" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
