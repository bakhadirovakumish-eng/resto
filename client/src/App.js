import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from './components/Menu';
import Orders from './components/Orders';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('menu');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentView('menu');
  };

  if (loading) return <div className="loading">Loading...</div>;

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>☕ Café Management System</h1>
        <nav>
          <button 
            className={currentView === 'menu' ? 'active' : ''}
            onClick={() => setCurrentView('menu')}
          >
            📱 Menu
          </button>
          <button 
            className={currentView === 'orders' ? 'active' : ''}
            onClick={() => setCurrentView('orders')}
          >
            📦 Orders
          </button>
          {(user.role === 'admin' || user.role === 'manager') && (
            <button 
              className={currentView === 'dashboard' ? 'active' : ''}
              onClick={() => setCurrentView('dashboard')}
            >
              📊 Dashboard
            </button>
          )}
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <main className="main-content">
        {currentView === 'menu' && <Menu user={user} />}
        {currentView === 'orders' && <Orders user={user} />}
        {currentView === 'dashboard' && <Dashboard user={user} />}
      </main>
    </div>
  );
}

export default App;
