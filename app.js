import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Settings from './pages/Settings';
import Navbar from './components/Common/Navbar';
import PrivacyPolicy from './components/Privacy/PrivacyPolicy';
import DataUsage from './components/Privacy/DataUsage';
import './styles/global.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path="/explore" component={Explore} />
                <Route path="/settings" component={Settings} />
                <Route path="/privacy" component={PrivacyPolicy} />
                <Route path="/data-usage" component={DataUsage} />
              </Switch>
            </main>
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
