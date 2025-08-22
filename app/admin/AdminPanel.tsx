
'use client';

import { useState } from 'react';
import Link from 'next/link';
import OgrodzeniaManager from './OgrodzeniaManager';
import PrzyczepyManager from './PrzyczepyManager';
import PasswordManager from './PasswordManager';

interface AdminPanelProps {
  onLogout: () => void;
}

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState('ogrodzenia');

  const tabs = [
    { id: 'ogrodzenia', name: 'Ogrodzenia', icon: 'ri-shield-line' },
    { id: 'przyczepy', name: 'Przyczepy', icon: 'ri-truck-line' },
    { id: 'password', name: 'Zmiana hasła', icon: 'ri-lock-line' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl text-orange-600 mr-8" style={{fontFamily: 'Pacifico, cursive'}}>
                Spoina 4 Siatki
              </Link>
              <span className="text-lg font-semibold text-gray-700">Panel Administracyjny</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                Zobacz stronę
              </Link>
              <button
                onClick={onLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 text-sm font-medium whitespace-nowrap"
              >
                Wyloguj
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <i className={`${tab.icon} mr-2 w-4 h-4 flex items-center justify-center`}></i>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'ogrodzenia' && <OgrodzeniaManager />}
          {activeTab === 'przyczepy' && <PrzyczepyManager />}
          {activeTab === 'password' && <PasswordManager />}
        </div>
      </div>
    </div>
  );
}
