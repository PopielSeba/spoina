'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminPanel from './AdminPanel';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedLogin = localStorage.getItem('adminLoggedIn');
    if (savedLogin === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem('adminPassword') || '731009696';
    
    if (password === storedPassword) {
      setIsLoggedIn(true);
      localStorage.setItem('adminLoggedIn', 'true');
      setError('');
    } else {
      setError('Nieprawidłowe hasło');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    setPassword('');
  };

  if (isLoggedIn) {
    return <AdminPanel onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl text-orange-600" style={{fontFamily: 'Pacifico, cursive'}}>
                Spoina 4 Siatki
              </Link>
            </div>
            <div>
              <Link href="/" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                Powrót na stronę
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center py-20">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Panel Administracyjny</h1>
            <p className="text-gray-600">Wprowadź hasło aby uzyskać dostęp</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Hasło
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Wprowadź hasło"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-300 font-medium whitespace-nowrap"
            >
              Zaloguj się
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}