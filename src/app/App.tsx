import { lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ErrorBoundary } from '../components/routing/ErrorBoundary';
import { GuestRoute } from '../components/routing/ProtectedRoute';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { HomePage } from '../pages/HomePage';
import { SignInPage } from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';
import { ProfilePage } from '../pages/ProfilePage';
import { EditProfilePage } from '../pages/EditProfilePage';
import { ScoreboardPage } from '../pages/ScoreboardPage';
import { UrlPage } from '../pages/UrlPage';
import { RulesPage } from '../pages/RulesPage';
import { NotFoundPage } from '../pages/NotFoundPage';

const GamePage = lazy(() =>
  import('../pages/GamePage').then((m) => ({ default: m.GamePage })),
);
const MultiplayerPage = lazy(() =>
  import('../pages/MultiplayerPage').then((m) => ({ default: m.MultiplayerPage })),
);

function LazyRoute({ children }: { children: ReactNode }) {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
}

export function App() {
  return (
    <ErrorBoundary>
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
            <Route
              path="/game"
              element={
                <LazyRoute>
                  <GamePage />
                </LazyRoute>
              }
            />
            <Route path="/url" element={<UrlPage />} />
            <Route
              path="/multiplayer"
              element={
                <LazyRoute>
                  <MultiplayerPage />
                </LazyRoute>
              }
            />
            <Route
              path="/multiplayer/:roomId"
              element={
                <LazyRoute>
                  <MultiplayerPage />
                </LazyRoute>
              }
            />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/notfound" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}
