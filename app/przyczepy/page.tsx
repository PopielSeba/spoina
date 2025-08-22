
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Trailer {
  id: number;
  name: string;
  capacity: string;
  dimensions: string;
  price: number;
  image: string;
  description: string;
  features: string[];
}

const defaultTrailers = [
  {
    id: 1,
    name: "Przyczepa bagażowa mała",
    capacity: "500 kg",
    dimensions: "2.0m x 1.3m",
    price: 50,
    image: "https://readdy.ai/api/search-image?query=small%20utility%20trailer%20for%20rent%2C%20500kg%20capacity%2C%202%20meters%20long%20by%201.3%20meters%20wide%2C%20galvanized%20steel%20construction%20with%20mesh%20sides%2C%20professional%20rental%20equipment%20display&width=400&height=300&seq=trailer1&orientation=landscape",
    description: "Idealna do małych przewozów, zakupów i transportu bagaży",
    features: ["Hamulec najazdowy", "Pokrywa plandekowa", "Oświetlenie LED"]
  },
  {
    id: 2,
    name: "Przyczepa bagażowa średnia",
    capacity: "750 kg",
    dimensions: "2.5m x 1.5m",
    price: 70,
    image: "https://readdy.ai/api/search-image?query=medium%20cargo%20trailer%20for%20rental%2C%20750kg%20capacity%2C%202.5%20meters%20by%201.5%20meters%2C%20heavy%20duty%20construction%20with%20removable%20sides%2C%20professional%20trailer%20rental%20business&width=400&height=300&seq=trailer2&orientation=landscape",
    description: "Uniwersalna przyczepa do przewozu mebli i większych przedmiotów",
    features: ["Hamulec najazdowy", "Zdejmowane burty", "Mocowania ładunku", "Oświetlenie LED"]
  },
  {
    id: 3,
    name: "Przyczepa bagażowa duża",
    capacity: "1000 kg",
    dimensions: "3.0m x 1.8m",
    price: 90,
    image: "https://readdy.ai/api/search-image?query=large%20cargo%20trailer%20for%20heavy%20duty%20rental%2C%201000kg%20capacity%2C%203%20meters%20by%201.8%20meters%2C%20professional%20grade%20construction%20with%20reinforced%20frame%20and%20dual%20axles&width=400&height=300&seq=trailer3&orientation=landscape",
    description: "Duża przyczepa do przewozu ciężkich ładunków i przeprowadzek",
    features: ["Podwójna oś", "Hamulec najazdowy", "Wzmocniona konstrukcja", "System mocowań"]
  },
  {
    id: 4,
    name: "Przyczepa samochodowa",
    capacity: "1500 kg",
    dimensions: "4.0m x 2.0m",
    price: 120,
    image: "https://readdy.ai/api/search-image?query=car%20carrier%20trailer%20for%20vehicle%20transport%2C%201500kg%20capacity%2C%204%20meters%20long%20hydraulic%20loading%20ramp%2C%20professional%20automotive%20transport%20equipment&width=400&height=300&seq=trailer4&orientation=landscape",
    description: "Specjalna przyczepa do transportu samochodów i motocykli",
    features: ["Najazd hydrauliczny", "Pasy do mocowania", "Podwójna oś", "Wzmocniona platforma"]
  },
  {
    id: 5,
    name: "Przyczepa do quad/motocykla",
    capacity: "600 kg",
    dimensions: "2.2m x 1.4m",
    price: 60,
    image: "https://readdy.ai/api/search-image?query=motorcycle%20quad%20trailer%20rental%2C%20600kg%20capacity%20specialized%20for%20ATV%20and%20motorcycle%20transport%2C%202.2m%20by%201.4m%20with%20loading%20ramp%20and%20tie%20down%20points&width=400&height=300&seq=trailer5&orientation=landscape",
    description: "Kompaktowa przyczepa do transportu quadów i motocykli",
    features: ["Najazd składany", "Uchwyty mocujące", "Antypoślizgowa podłoga"]
  },
  {
    id: 6,
    name: "Przyczepa budowlana",
    capacity: "1200 kg",
    dimensions: "2.8m x 1.6m",
    price: 80,
    image: "https://readdy.ai/api/search-image?query=construction%20trailer%20for%20building%20materials%2C%201200kg%20capacity%2C%20reinforced%20steel%20construction%20with%20high%20sides%20for%20sand%20gravel%20and%20construction%20debris&width=400&height=300&seq=trailer6&orientation=landscape",
    description: "Wytrzymała przyczepa do materiałów budowlanych i gruzu",
    features: ["Wzmocnione burty", "Odporna na korozję", "Łatwe rozładowanie"]
  }
];

const priceRanges = [
  { id: 'all', name: 'Wszystkie' },
  { id: '0-60', name: 'do 60 zł/dzień' },
  { id: '61-90', name: '61-90 zł/dzień' },
  { id: '91+', name: 'powyżej 90 zł/dzień' }
];

const capacityRanges = [
  { id: 'all', name: 'Wszystkie' },
  { id: '0-600', name: 'do 600 kg' },
  { id: '601-1000', name: '601-1000 kg' },
  { id: '1001+', name: 'powyżej 1000 kg' }
];

export default function Przyczepy() {
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedCapacityRange, setSelectedCapacityRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const savedTrailers = localStorage.getItem('przyczepyProducts');
    if (savedTrailers) {
      setTrailers(JSON.parse(savedTrailers));
    } else {
      setTrailers(defaultTrailers);
      localStorage.setItem('przyczepyProducts', JSON.stringify(defaultTrailers));
    }
  }, []);

  const filteredTrailers = trailers
    .filter(trailer => {
      if (selectedPriceRange !== 'all') {
        const [min, max] = selectedPriceRange === '91+'
          ? [91, Infinity]
          : selectedPriceRange.split('-').map(Number);

        if (trailer.price < min || (max !== undefined && trailer.price > max)) {
          return false;
        }
      }

      if (selectedCapacityRange !== 'all') {
        const capacity = parseInt(trailer.capacity);
        const [min, max] = selectedCapacityRange === '1001+'
          ? [1001, Infinity]
          : selectedCapacityRange.split('-').map(Number);

        if (capacity < min || (max !== undefined && capacity > max)) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'capacity':
          return parseInt(b.capacity) - parseInt(a.capacity);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

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
                <Link href="/przyczepy" className="text-gray-900 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap">
                  Wypożyczalnia przyczep
                </Link>
                <Link href="/kontakt" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
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
          <h1 className="text-4xl font-bold text-white mb-4">Wypożyczalnia Przyczep</h1>
          <p className="text-xl text-orange-100">Szeroki wybór przyczep w konkurencyjnych cenach</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtry</h3>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Cena za dzień</h4>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <label key={range.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        value={range.id}
                        checked={selectedPriceRange === range.id}
                        onChange={(e) => setSelectedPriceRange(e.target.value)}
                        className="mr-2 text-orange-600"
                      />
                      <span className="text-sm text-gray-600">{range.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Capacity Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Ładowność</h4>
                <div className="space-y-2">
                  {capacityRanges.map(range => (
                    <label key={range.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="capacityRange"
                        value={range.id}
                        checked={selectedCapacityRange === range.id}
                        onChange={(e) => setSelectedCapacityRange(e.target.value)}
                        className="mr-2 text-orange-600"
                      />
                      <span className="text-sm text-gray-600">{range.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Sortowanie</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm pr-8"
                >
                  <option value="name">Nazwa A-Z</option>
                  <option value="price-low">Cena rosnąco</option>
                  <option value="price-high">Cena malejąco</option>
                  <option value="capacity">Ładowność</option>
                </select>
              </div>

              {/* Rental Info */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Warunki wynajmu</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Min. okres: 1 dzień</li>
                  <li>• Kaucja: 200-500 zł</li>
                  <li>• Dowód osobisty wymagany</li>
                  <li>• Prawo jazdy kat. B</li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Rezerwacje</h4>
                <div className="flex items-center text-sm text-orange-600 mb-1">
                  <i className="ri-phone-line mr-1 w-4 h-4 flex items-center justify-center"></i>
                  731 00 96 96
                </div>
                <div className="text-sm text-gray-600">
                  ul. Wrocławska 35, Nadolice Wlk.
                </div>
              </div>
            </div>
          </div>

          {/* Trailers Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Dostępne przyczepy ({filteredTrailers.length})
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredTrailers.map(trailer => (
                <div key={trailer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                  <img
                    src={trailer.image}
                    alt={trailer.name}
                    className="w-full h-48 object-cover object-top"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{trailer.name}</h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">{trailer.price} zł</div>
                        <div className="text-sm text-gray-500">/dzień</div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{trailer.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Ładowność:</span>
                        <div className="text-lg font-semibold text-gray-900">{trailer.capacity}</div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Wymiary:</span>
                        <div className="text-lg font-semibold text-gray-900">{trailer.dimensions}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm font-medium text-gray-700 mb-2 block">Wyposażenie:</span>
                      <div className="flex flex-wrap gap-1">
                        {trailer.features.map((feature, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition duration-300 text-sm font-medium whitespace-nowrap">
                        Zarezerwuj
                      </button>
                      <Link
                        href="/kontakt"
                        className="flex items-center justify-center p-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition duration-300"
                      >
                        <i className="ri-phone-line w-5 h-5 flex items-center justify-center"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTrailers.length === 0 && (
              <div className="text-center py-16">
                <i className="ri-truck-line text-6xl text-gray-300 mb-4 w-16 h-16 flex items-center justify-center mx-auto"></i>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Brak dostępnych przyczep</h3>
                <p className="text-gray-500">Spróbuj zmienić filtry wyszukiwania</p>
              </div>
            )}

            {/* Info Section */}
            <div className="mt-12 bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'Pacifico, cursive'}}>Spoina 4 Siatki</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Wymagane dokumenty</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <i className="ri-checkbox-circle-line text-orange-600 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      Dowód osobisty lub paszport
                    </li>
                    <li className="flex items-center">
                      <i className="ri-checkbox-circle-line text-orange-600 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      Prawo jazdy kategorii B
                    </li>
                    <li className="flex items-center">
                      <i className="ri-checkbox-circle-line text-orange-600 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      Kaucja zwrotna (200-500 zł)
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Cennik</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>1 dzień: cena podstawowa</li>
                    <li>2-7 dni: -10% rabat</li>
                    <li>Powyżej 7 dni: -20% rabat</li>
                    <li>Dostawa/odbiór: +30 zł</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-start">
                  <i className="ri-information-line text-yellow-600 mr-2 mt-1 w-5 h-5 flex items-center justify-center"></i>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Ważne informacje</h5>
                    <p className="text-sm text-gray-700">
                      Rezerwacja jest obowiązkowa. Przyczepa musi zostać zwrócona w stanie czystym.
                      Za uszkodzenia pobieramy opłaty zgodnie z cennikiem napraw.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-[\'Pacifico\'] text-2xl text-orange-600 mb-4" style={{fontFamily: 'Pacifico, cursive'}}>Spoina 4 Siatki</h3>
              <p className="text-gray-300">
                Profesjonalne ogrodzenia i usługi spawalnicze. Wysoka jakość w przystępnych cenach.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Oferta</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/ogrodzenia" className="hover:text-orange-400">Ogrodzenia panelowe</Link></li>
                <li><Link href="/ogrodzenia" className="hover:text-orange-400">Siatki ogrodzeniowe</Link></li>
                <li><Link href="/przyczepy" className="hover:text-orange-400">Wypożyczalnia przyczep</Link></li>
                <li><Link href="/kontakt" className="hover:text-orange-400">Usługi spawalnicze</Link></li>
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
