import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemedErrorBoundary from './components/Common/ErrorBoundary';
import Navbar from './components/Common/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Settings from './pages/Settings';
import Login from './components/Auth/Login';
import PrivacyPolicy from './components/Privacy/PrivacyPolicy';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ThemedErrorBoundary>
          <Router>
            <div className="app-container">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                </Routes>
              </main>
            </div>
          </Router>
        </ThemedErrorBoundary>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
