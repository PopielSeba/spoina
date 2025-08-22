
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

const defaultProducts = [
  {
    id: 1,
    name: "Panel ogrodzeniowy 4m x 1.5m",
    category: "panele",
    price: 120,
    image: "https://readdy.ai/api/search-image?query=modern%20steel%20mesh%20fence%20panel%204%20meters%20wide%20with%20vertical%20bars%2C%20galvanized%20finish%2C%20clean%20industrial%20design%2C%20simple%20white%20background%20highlighting%20fence%20structure%20and%20quality%20craftsmanship&width=400&height=300&seq=product1&orientation=landscape",
    description: "Standardowy panel ogrodzeniowy z siatki ocynkowanej, wymiary 4m x 1.5m"
  },
  {
    id: 2,
    name: "Panel Premium 4m x 1.8m",
    category: "panele",
    price: 180,
    image: "https://readdy.ai/api/search-image?query=premium%20welded%20wire%20mesh%20fence%20panel%20with%20decorative%20elements%2C%20modern%20design%20with%20clean%20lines%2C%20galvanized%20steel%20construction%2C%20simple%20background%20showcasing%20fence%20details%20and%20professional%20finish&width=400&height=300&seq=product2&orientation=landscape",
    description: "Panel ogrodzeniowy premium z dodatkowymi elementami dekoracyjnymi"
  },
  {
    id: 3,
    name: "Słupek 60x40mm h=2.0m",
    category: "słupki",
    price: 45,
    image: "https://readdy.ai/api/search-image?query=heavy%20duty%20steel%20fence%20post%20galvanized%20with%20mounting%20brackets%2C%20industrial%20grade%20construction%20materials%2C%20clean%20product%20photography%20with%20simple%20background%20highlighting%20post%20quality%20and%20durability&width=400&height=300&seq=product3&orientation=landscape",
    description: "Słupek ogrodzeniowy ocynkowany z mocowaniami, wysokość 2.0m"
  },
  {
    id: 4,
    name: "Siatka ogrodzeniowa 1.5m",
    category: "siatki",
    price: 25,
    image: "https://readdy.ai/api/search-image?query=galvanized%20wire%20mesh%20fencing%20roll%201.5%20meters%20high%2C%20professional%20quality%20chain%20link%20fence%20material%2C%20clean%20industrial%20setting%20with%20organized%20display%20of%20fencing%20products&width=400&height=300&seq=product4&orientation=landscape",
    description: "Siatka ogrodzeniowa ocynkowana, wysokość 1.5m, sprzedawana na metry"
  },
  {
    id: 5,
    name: "Brama dwuskrzydłowa 4m",
    category: "bramy",
    price: 850,
    image: "https://readdy.ai/api/search-image?query=double%20swing%20gate%204%20meters%20wide%20steel%20construction%20with%20mesh%20panels%2C%20galvanized%20finish%2C%20professional%20gate%20hardware%20and%20hinges%2C%20clean%20background%20showcasing%20gate%20design&width=400&height=300&seq=product5&orientation=landscape",
    description: "Brama dwuskrzydłowa z paneli, szerokość 4m, z osprzętem"
  },
  {
    id: 6,
    name: "Panel 3D 4m x 1.8m",
    category: "panele",
    price: 220,
    image: "https://readdy.ai/api/search-image?query=3D%20welded%20mesh%20fence%20panel%20with%20curved%20wire%20design%2C%20modern%20three%20dimensional%20fencing%20with%20enhanced%20security%20features%2C%20galvanized%20steel%20construction%2C%20clean%20product%20display&width=400&height=300&seq=product6&orientation=landscape",
    description: "Panel 3D o zwiększonej wytrzymałości, wymiary 4m x 1.8m"
  },
  {
    id: 7,
    name: "Słupek do paneli 3D",
    category: "słupki",
    price: 65,
    image: "https://readdy.ai/api/search-image?query=specialized%20fence%20post%20for%203D%20panels%20with%20mounting%20system%2C%20heavy%20duty%20galvanized%20steel%20construction%2C%20professional%20fencing%20hardware%2C%20clean%20industrial%20background&width=400&height=300&seq=product7&orientation=landscape",
    description: "Słupek specjalnie dostosowany do paneli 3D"
  },
  {
    id: 8,
    name: "Furtka 1m",
    category: "bramy",
    price: 320,
    image: "https://readdy.ai/api/search-image?query=single%20gate%201%20meter%20wide%20with%20mesh%20panel%20design%2C%20galvanized%20steel%20construction%20with%20professional%20hardware%20and%20lock%20system%2C%20clean%20background%20showing%20gate%20details&width=400&height=300&seq=product8&orientation=landscape",
    description: "Furtka jednoskrzydłowa z panela, szerokość 1m"
  },
  {
    id: 9,
    name: "Siatka ogrodzeniowa 2m",
    category: "siatki",
    price: 35,
    image: "https://readdy.ai/api/search-image?query=chain%20link%20fence%20mesh%202%20meters%20high%20roll%2C%20heavy%20duty%20galvanized%20wire%20mesh%20for%20security%20fencing%2C%20professional%20quality%20construction%20materials%20display&width=400&height=300&seq=product9&orientation=landscape",
    description: "Siatka ogrodzeniowa ocynkowana, wysokość 2m, sprzedawana na metry"
  }
];

const categories = [
  { id: 'all', name: 'Wszystkie' },
  { id: 'panele', name: 'Panele ogrodzeniowe' },
  { id: 'słupki', name: 'Słupki' },
  { id: 'siatki', name: 'Siatki ogrodzeniowe' },
  { id: 'bramy', name: 'Bramy i furtki' }
];

const priceRanges = [
  { id: 'all', name: 'Wszystkie ceny' },
  { id: '0-50', name: 'do 50 zł' },
  { id: '51-200', name: '51-200 zł' },
  { id: '201-500', name: '201-500 zł' },
  { id: '500+', name: 'powyżej 500 zł' }
];

export default function Ogrodzenia() {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const savedProducts = localStorage.getItem('ogrodzeniaProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(defaultProducts);
    }
  }, []);

  const filteredProducts = products
    .filter(product => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      if (selectedPriceRange !== 'all') {
        const [min, max] = selectedPriceRange === '500+'
          ? [500, Infinity]
          : selectedPriceRange.split('-').map(Number);

        if (product.price < min || product.price > max) {
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
              <Link href="/" className="text-2xl text-orange-600" style={{fontFamily: 'Pacifico, cursive'}}>Spoina 4 Siatki</Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">Strona główna</Link>
                <Link href="/ogrodzenia" className="text-gray-900 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap">Ogrodzenia</Link>
                <Link href="/przyczepy" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap">Wypożyczalnia przyczep</Link>
                <Link href="/kontakt" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">Kontakt</Link>
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
          <h1 className="text-4xl font-bold text-white mb-4">Katalog Ogrodzeń</h1>
          <p className="text-xl text-orange-100">Wysokiej jakości ogrodzenia w najlepszych cenach</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtry</h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Kategoria</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2 text-orange-600"
                      />
                      <span className="text-sm text-gray-600">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Cena</h4>
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

              {/* Sort */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Sortowanie</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm pr-8"
                >
                  <option value="name">Nazwa A-Z</option>
                  <option value="price-low">Cena rosnąco</option>
                  <option value="price-high">Cena malejąco</option>
                </select>
              </div>

              {/* Contact Info */}
              <div className="mt-8 p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Potrzebujesz pomocy?</h4>
                <p className="text-sm text-gray-600 mb-2">Skontaktuj się z nami</p>
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

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Znaleziono {filteredProducts.length} produktów
              </h2>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6" data-product-shop>
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover object-top"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-orange-600">{product.price} zł</span>
                      <span className="text-sm text-gray-500">
                        {product.category === 'siatki' ? '/mb' : '/szt'}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition duration-300 text-sm font-medium whitespace-nowrap">
                        Zamów teraz
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

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <i className="ri-search-line text-6xl text-gray-300 mb-4 w-16 h-16 flex items-center justify-center mx-auto"></i>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Brak produktów</h3>
                <p className="text-gray-500">Spróbuj zmienić filtry wyszukiwania</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl text-orange-600 mb-4" style={{fontFamily: 'Pacifico, cursive'}}>Spoina 4 Siatki</h3>
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
