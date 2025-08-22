
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Kontakt() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'ogrodzenia',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Walidacja
    if (formData.message.length > 500) {
      setSubmitMessage('Wiadomość nie może przekraczać 500 znaków');
      setIsSubmitting(false);
      return;
    }

    try {
      // Symulacja wysyłania formularza
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitMessage('Dziękujemy! Wiadomość została wysłana. Odpowiemy w ciągu 24 godzin.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'ogrodzenia',
        message: ''
      });
    } catch (error) {
      setSubmitMessage('Wystąpił błąd. Spróbuj ponownie lub zadzwoń bezpośrednio.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                  Strona główna
                </Link>
                <Link href="/ogrodzenia" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap">
                  Ogrodzenia
                </Link>
                <Link href="/przyczepy" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap">
                  Wypożyczalnia przyczep
                </Link>
                <Link href="/kontakt" className="text-gray-900 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                  Kontakt
                </Link>
              </div>
            </div>
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-gray-900 focus:outline-none">
                <i className="ri-menu-line text-xl w-6 h-6 flex items-center justify-center"></i>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Page Header */}
      <div className="bg-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Kontakt</h1>
          <p className="text-xl text-orange-100">Skontaktuj się z nami - jesteśmy do Twojej dyspozycji</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Napisz do nas</h2>

            <form id="kontakt-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Imię i nazwisko *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Temat zapytania
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pr-8"
                >
                  <option value="ogrodzenia">Ogrodzenia</option>
                  <option value="przyczepy">Wypożyczalnia przyczep</option>
                  <option value="spawanie">Usługi spawalnicze</option>
                  <option value="inne">Inne</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Wiadomość *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  maxLength={500}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Opisz swoje potrzeby..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                ></textarea>
                <div className="text-sm text-gray-500 mt-1">
                  {formData.message.length}/500 znaków
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || formData.message.length > 500}
                className="w-full bg-orange-600 text-white py-3 px-6 rounded-md hover:bg-orange-700 disabled:bg-gray-400 transition duration-300 font-medium whitespace-nowrap"
              >
                {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
              </button>

              {submitMessage && (
                <div className={`p-4 rounded-md ${submitMessage.includes('Dziękujemy') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dane kontaktowe</h2>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-phone-line text-orange-600 text-xl w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Telefon</h3>
                    <p className="text-gray-600">731 00 96 96</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-map-pin-line text-orange-600 text-xl w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Adres</h3>
                    <p className="text-gray-600">ul. Wrocławska 35<br />Nadolice Wielkie</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-time-line text-orange-600 text-xl w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Godziny pracy</h3>
                    <p className="text-gray-600">
                      Pon-Pt: 8:00 - 17:00<br />
                      Sobota: 8:00 - 14:00<br />
                      Niedziela: Zamknięte
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Jak do nas dojechać</h2>

              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://maps.google.com/maps?q=ul.+Wrocławska+35,+Nadolice+Wielkie&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>

            {/* Services Info */}
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nasze usługi</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <i className="ri-checkbox-circle-line text-orange-600 mr-2 w-4 h-4 flex items-center justify-center"></i>
                  Sprzedaż ogrodzeń panelowych
                </li>
                <li className="flex items-center">
                  <i className="ri-checkbox-circle-line text-orange-600 mr-2 w-4 h-4 flex items-center justify-center"></i>
                  Montaż ogrodzeń
                </li>
                <li className="flex items-center">
                  <i className="ri-checkbox-circle-line text-orange-600 mr-2 w-4 h-4 flex items-center justify-center"></i>
                  Usługi spawalnicze
                </li>
                <li className="flex items-center">
                  <i className="ri-checkbox-circle-line text-orange-600 mr-2 w-4 h-4 flex items-center justify-center"></i>
                  Wypożyczalnia przyczep
                </li>
                <li className="flex items-center">
                  <i className="ri-checkbox-circle-line text-orange-600 mr-2 w-4 h-4 flex items-center justify-center"></i>
                  Doradztwo techniczne
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl text-orange-600 mb-4" style={{fontFamily: 'Pacifico, cursive'}}>
                Spoina 4 Siatki
              </h3>
              <p className="text-gray-300">
                Profesjonalne ogrodzenia i usługi spawalnicze. Wysoka jakość w przystępnych cenach.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Oferta</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/ogrodzenia" className="hover:text-orange-400">
                    Ogrodzenia panelowe
                  </Link>
                </li>
                <li>
                  <Link href="/ogrodzenia" className="hover:text-orange-400">
                    Siatki ogrodzeniowe
                  </Link>
                </li>
                <li>
                  <Link href="/przyczepy" className="hover:text-orange-400">
                    Wypożyczalnia przyczep
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="hover:text-orange-400">
                    Usługi spawalnicze
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <i className="ri-phone-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                  731 00 96 96
                </li>
                <li className="flex items-center">
                  <i className="ri-map-pin-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                  ul. Wrocławska 35, Nadolice Wlk.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Godziny pracy</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Pon-Pt: 8:00 - 17:00</li>
                <li>Sobota: 8:00 - 14:00</li>
                <li>Niedziela: Zamknięte</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Spoina 4 Siatki. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
