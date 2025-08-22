'use client';

import { useState } from 'react';

export default function PasswordManager() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    const storedPassword = localStorage.getItem('adminPassword') || '731009696';
    
    if (currentPassword !== storedPassword) {
      setMessage('Nieprawidłowe bieżące hasło');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setMessage('Nowe hasła nie są identyczne');
      return;
    }
    
    if (newPassword.length < 6) {
      setMessage('Nowe hasło musi mieć co najmniej 6 znaków');
      return;
    }
    
    localStorage.setItem('adminPassword', newPassword);
    setMessage('Hasło zostało pomyślnie zmienione');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Zmiana hasła administratora</h2>
        <p className="text-gray-600">Zmień hasło dostępu do panelu administracyjnego</p>
      </div>

      <div className="max-w-md">
        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Bieżące hasło *
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Nowe hasło *
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              minLength={6}
              required
            />
            <p className="text-sm text-gray-500 mt-1">Hasło musi mieć co najmniej 6 znaków</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Potwierdź nowe hasło *
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              minLength={6}
              required
            />
          </div>

          {message && (
            <div className={`p-4 rounded-md ${message.includes('pomyślnie') 
              ? 'bg-green-50 text-green-700' 
              : 'bg-red-50 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-300 font-medium whitespace-nowrap"
          >
            Zmień hasło
          </button>
        </form>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
        <div className="flex items-start">
          <i className="ri-information-line text-yellow-600 mr-2 mt-1 w-5 h-5 flex items-center justify-center"></i>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Ważne informacje</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Hasło jest przechowywane lokalnie w przeglądarce</li>
              <li>• Zapisz nowe hasło w bezpiecznym miejscu</li>
              <li>• Po zmianie hasła zostaniesz automatycznie wylogowany przy następnym zamknięciu przeglądarki</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}