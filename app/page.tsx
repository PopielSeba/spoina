
'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl text-orange-600" style={{fontFamily: 'Pacifico, cursive'}}>Spoina 4 Siatki</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-900 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                  Strona główna
                </Link>
                <Link href="/ogrodzenia" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap">
                  Ogrodzenia
                </Link>
                <Link href="/przyczepy" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap">
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-50 to-gray-100 py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20steel%20fence%20installation%20construction%20site%20with%20professional%20workers%20wearing%20safety%20equipment%2C%20industrial%20background%20with%20organized%20materials%20and%20tools%2C%20bright%20daylight%2C%20clean%20and%20professional%20atmosphere&width=1200&height=600&seq=hero1&orientation=landscape')`
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Profesjonalne <span className="text-orange-600">Ogrodzenia</span> i Usługi Spawalnicze
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Oferujemy najwyższej jakości ogrodzenia panelowe, siatki ogrodzeniowe oraz profesjonalne usługi spawalnicze. Dodatkowo prowadzimy wypożyczalnię przyczep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/ogrodzenia" className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-300 text-center whitespace-nowrap">
                  Zobacz ogrodzenia
                </Link>
                <Link href="/kontakt" className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition duration-300 text-center whitespace-nowrap">
                  Skontaktuj się
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://readdy.ai/api/search-image?query=high%20quality%20steel%20mesh%20fence%20panels%20and%20welded%20wire%20fencing%20displayed%20in%20organized%20rows%20at%20industrial%20facility%2C%20clean%20modern%20installation%20with%20professional%20equipment%2C%20bright%20natural%20lighting%20showcasing%20fence%20details&width=600&height=500&seq=hero2&orientation=portrait"
                alt="Ogrodzenia panelowe"
                className="rounded-lg shadow-xl object-cover w-full h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nasze Usługi</h2>
            <p className="text-lg text-gray-600">Kompleksowa oferta ogrodzeń i usług spawalniczych</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-orange-50 transition duration-300">
              <div className="w-16 h-16 flex items-center justify-center bg-orange-100 rounded-full mx-auto mb-4">
                <i className="ri-shield-line text-2xl text-orange-600 w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ogrodzenia Panelowe</h3>
              <p className="text-gray-600 mb-4">Wysokiej jakości panele ogrodzeniowe w różnych wzorach i rozmiarach</p>
              <Link href="/ogrodzenia" className="text-orange-600 hover:text-orange-700 font-medium whitespace-nowrap">
                Zobacz więcej →
              </Link>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-orange-50 transition duration-300">
              <div className="w-16 h-16 flex items-center justify-center bg-orange-100 rounded-full mx-auto mb-4">
                <i className="ri-tools-line text-2xl text-orange-600 w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Usługi Spawalnicze</h3>
              <p className="text-gray-600 mb-4">Profesjonalne spawanie aluminium, stali i innych materiałów</p>
              <Link href="/kontakt" className="text-orange-600 hover:text-orange-700 font-medium whitespace-nowrap">
                Zapytaj o cenę →
              </Link>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-orange-50 transition duration-300">
              <div className="w-16 h-16 flex items-center justify-center bg-orange-100 rounded-full mx-auto mb-4">
                <i className="ri-truck-line text-2xl text-orange-600 w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Wypożyczalnia Przyczep</h3>
              <p className="text-gray-600 mb-4">Przyczepy w różnych rozmiarach dostępne do wynajmu</p>
              <Link href="/przyczepy" className="text-orange-600 hover:text-orange-700 font-medium whitespace-nowrap">
                Sprawdź dostępność →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popularne Ogrodzenia</h2>
            <p className="text-lg text-gray-600">Najczęściej wybierane przez naszych klientów</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <img 
                src="https://readdy.ai/api/search-image?query=modern%20steel%20mesh%20fence%20panel%204%20meters%20wide%20with%20vertical%20bars%2C%20galvanized%20finish%2C%20clean%20industrial%20design%2C%20simple%20white%20background%20highlighting%20fence%20structure%20and%20quality%20craftsmanship&width=400&height=300&seq=fence1&orientation=landscape"
                alt="Panel ogrodzeniowy 4m"
                className="w-full h-48 object-cover object-top"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Panel 4m x 1.5m</h3>
                <p className="text-gray-600 mb-4">Standardowy panel ogrodzeniowy z siatki ocynkowanej</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-600">120 zł</span>
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-300 whitespace-nowrap">
                    Zamów teraz
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <img 
                src="https://readdy.ai/api/search-image?query=premium%20welded%20wire%20mesh%20fence%20panel%20with%20decorative%20elements%2C%20modern%20design%20with%20clean%20lines%2C%20galvanized%20steel%20construction%2C%20simple%20background%20showcasing%20fence%20details%20and%20professional%20finish&width=400&height=300&seq=fence2&orientation=landscape"
                alt="Panel ogrodzeniowy premium"
                className="w-full h-48 object-cover object-top"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Panel Premium 4m</h3>
                <p className="text-gray-600 mb-4">Panel ogrodzeniowy z dodatkowymi elementami dekoracyjnymi</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-600">180 zł</span>
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-300 whitespace-nowrap">
                    Zamów teraz
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <img 
                src="https://readdy.ai/api/search-image?query=heavy%20duty%20steel%20fence%20post%20galvanized%20with%20mounting%20brackets%2C%20industrial%20grade%20construction%20materials%2C%20clean%20product%20photography%20with%20simple%20background%20highlighting%20post%20quality%20and%20durability&width=400&height=300&seq=fence3&orientation=landscape"
                alt="Słupek ogrodzeniowy"
                className="w-full h-48 object-cover object-top"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Słupek 60x40mm</h3>
                <p className="text-gray-600 mb-4">Słupek ogrodzeniowy ocynkowany z mocowaniami</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-600">45 zł</span>
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-300 whitespace-nowrap">
                    Zamów teraz
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/ogrodzenia" className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-300 whitespace-nowrap">
              Zobacz pełną ofertę
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Potrzebujesz wyceny?</h2>
          <p className="text-xl text-orange-100 mb-8">Skontaktuj się z nami - odpowiemy w ciągu 24 godzin</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center text-white">
              <i className="ri-phone-line mr-2 w-5 h-5 flex items-center justify-center"></i>
              <span className="text-lg font-semibold">731 00 96 96</span>
            </div>
            <div className="flex items-center text-white">
              <i className="ri-map-pin-line mr-2 w-5 h-5 flex items-center justify-center"></i>
              <span>ul. Wrocławska 35, Nadolice Wlk.</span>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/kontakt" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 whitespace-nowrap">
              Formularz kontaktowy
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
            <div className="mt-2">
              <Link href="/admin" className="text-gray-500 hover:text-orange-400 text-sm">
                Panel administracyjny
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
