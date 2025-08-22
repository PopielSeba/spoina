
'use client';

import { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';

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
  }
];

export default function PrzyczepyManager() {
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [editingTrailer, setEditingTrailer] = useState<Trailer | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTrailer, setNewTrailer] = useState({
    name: '',
    capacity: '',
    dimensions: '',
    price: 0,
    image: '',
    description: '',
    features: ['']
  });

  useEffect(() => {
    const savedTrailers = localStorage.getItem('przyczepyProducts');
    if (savedTrailers) {
      setTrailers(JSON.parse(savedTrailers));
    } else {
      setTrailers(defaultTrailers);
      localStorage.setItem('przyczepyProducts', JSON.stringify(defaultTrailers));
    }
  }, []);

  const saveTrailers = (updatedTrailers: Trailer[]) => {
    setTrailers(updatedTrailers);
    localStorage.setItem('przyczepyProducts', JSON.stringify(updatedTrailers));
  };

  const handleAddTrailer = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.max(...trailers.map(t => t.id), 0) + 1;
    const trailer: Trailer = { 
      ...newTrailer, 
      id, 
      features: newTrailer.features.filter(f => f.trim() !== '')
    };
    const updatedTrailers = [...trailers, trailer];
    saveTrailers(updatedTrailers);
    setNewTrailer({ name: '', capacity: '', dimensions: '', price: 0, image: '', description: '', features: [''] });
    setShowAddForm(false);
  };

  const handleEditTrailer = (trailer: Trailer) => {
    setEditingTrailer({ ...trailer });
  };

  const handleUpdateTrailer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrailer) return;

    const updatedTrailer = {
      ...editingTrailer,
      features: editingTrailer.features.filter(f => f.trim() !== '')
    };

    const updatedTrailers = trailers.map(t => 
      t.id === updatedTrailer.id ? updatedTrailer : t
    );
    saveTrailers(updatedTrailers);
    setEditingTrailer(null);
  };

  const handleDeleteTrailer = (id: number) => {
    if (confirm('Czy na pewno chcesz usunąć tę przyczepę?')) {
      const updatedTrailers = trailers.filter(t => t.id !== id);
      saveTrailers(updatedTrailers);
    }
  };

  const generateImageUrl = (trailerName: string, seq: string) => {
    const query = `${trailerName} professional trailer rental equipment, high quality construction with professional display, clean background highlighting trailer features and durability`;
    return `https://readdy.ai/api/search-image?query=${encodeURIComponent(query)}&width=400&height=300&seq=${seq}&orientation=landscape`;
  };

  const updateFeature = (index: number, value: string, isEditing: boolean = false) => {
    if (isEditing && editingTrailer) {
      const newFeatures = [...editingTrailer.features];
      newFeatures[index] = value;
      setEditingTrailer({...editingTrailer, features: newFeatures});
    } else {
      const newFeatures = [...newTrailer.features];
      newFeatures[index] = value;
      setNewTrailer({...newTrailer, features: newFeatures});
    }
  };

  const addFeature = (isEditing: boolean = false) => {
    if (isEditing && editingTrailer) {
      setEditingTrailer({...editingTrailer, features: [...editingTrailer.features, '']});
    } else {
      setNewTrailer({...newTrailer, features: [...newTrailer.features, '']});
    }
  };

  const removeFeature = (index: number, isEditing: boolean = false) => {
    if (isEditing && editingTrailer) {
      const newFeatures = editingTrailer.features.filter((_, i) => i !== index);
      setEditingTrailer({...editingTrailer, features: newFeatures});
    } else {
      const newFeatures = newTrailer.features.filter((_, i) => i !== index);
      setNewTrailer({...newTrailer, features: newFeatures});
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Zarządzanie Przyczepami</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition duration-300 whitespace-nowrap"
        >
          Dodaj przyczepę
        </button>
      </div>

      {/* Add Trailer Form */}
      {showAddForm && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Dodaj nową przyczepę</h3>
          <form onSubmit={handleAddTrailer} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa przyczepy</label>
                <input
                  type="text"
                  value={newTrailer.name}
                  onChange={(e) => setNewTrailer({...newTrailer, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ładowność</label>
                <input
                  type="text"
                  value={newTrailer.capacity}
                  onChange={(e) => setNewTrailer({...newTrailer, capacity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="np. 500 kg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Wymiary</label>
                <input
                  type="text"
                  value={newTrailer.dimensions}
                  onChange={(e) => setNewTrailer({...newTrailer, dimensions: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="np. 2.0m x 1.3m"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cena za dzień (zł)</label>
                <input
                  type="number"
                  value={newTrailer.price}
                  onChange={(e) => setNewTrailer({...newTrailer, price: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div>
              <ImageUploader
                currentImage={newTrailer.image}
                onImageChange={(imageUrl) => setNewTrailer({...newTrailer, image: imageUrl})}
                productName={newTrailer.name}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Opis</label>
              <textarea
                value={newTrailer.description}
                onChange={(e) => setNewTrailer({...newTrailer, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={2}
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Wyposażenie</label>
              {newTrailer.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Dodaj cechę wyposażenia"
                  />
                  {newTrailer.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 whitespace-nowrap"
                    >
                      Usuń
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addFeature()}
                className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300 text-sm whitespace-nowrap"
              >
                Dodaj cechę
              </button>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 whitespace-nowrap"
              >
                Dodaj przyczepę
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewTrailer({ name: '', capacity: '', dimensions: '', price: 0, image: '', description: '', features: [''] });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300 whitespace-nowrap"
              >
                Anuluj
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Trailer Form */}
      {editingTrailer && (
        <div className="mb-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Edytuj przyczepę</h3>
          <form onSubmit={handleUpdateTrailer} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa przyczepy</label>
                <input
                  type="text"
                  value={editingTrailer.name}
                  onChange={(e) => setEditingTrailer({...editingTrailer, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ładowność</label>
                <input
                  type="text"
                  value={editingTrailer.capacity}
                  onChange={(e) => setEditingTrailer({...editingTrailer, capacity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Wymiary</label>
                <input
                  type="text"
                  value={editingTrailer.dimensions}
                  onChange={(e) => setEditingTrailer({...editingTrailer, dimensions: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cena za dzień (zł)</label>
                <input
                  type="number"
                  value={editingTrailer.price}
                  onChange={(e) => setEditingTrailer({...editingTrailer, price: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div>
              <ImageUploader
                currentImage={editingTrailer.image}
                onImageChange={(imageUrl) => setEditingTrailer({...editingTrailer, image: imageUrl})}
                productName={editingTrailer.name}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Opis</label>
              <textarea
                value={editingTrailer.description}
                onChange={(e) => setEditingTrailer({...editingTrailer, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={2}
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Wyposażenie</label>
              {editingTrailer.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value, true)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Dodaj cechę wyposażenia"
                  />
                  {editingTrailer.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index, true)}
                      className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 whitespace-nowrap"
                    >
                      Usuń
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addFeature(true)}
                className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300 text-sm whitespace-nowrap"
              >
                Dodaj cechę
              </button>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 whitespace-nowrap"
              >
                Zapisz zmiany
              </button>
              <button
                type="button"
                onClick={() => setEditingTrailer(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300 whitespace-nowrap"
              >
                Anuluj
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Trailers List */}
      <div className="grid gap-4">
        {trailers.map(trailer => (
          <div key={trailer.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
            <img 
              src={trailer.image} 
              alt={trailer.name}
              className="w-20 h-20 object-cover rounded-lg mr-4"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{trailer.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{trailer.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-orange-600 font-semibold">{trailer.price} zł/dzień</span>
                <span className="text-gray-500">Ładowność: {trailer.capacity}</span>
                <span className="text-gray-500">Wymiary: {trailer.dimensions}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Wyposażenie: {trailer.features.join(', ')}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditTrailer(trailer)}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition duration-300 whitespace-nowrap"
              >
                Edytuj
              </button>
              <button
                onClick={() => handleDeleteTrailer(trailer.id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition duration-300 whitespace-nowrap"
              >
                Usuń
              </button>
            </div>
          </div>
        ))}
      </div>

      {trailers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Brak przyczep. Dodaj pierwszą przyczepę używając przycisku powyżej.
        </div>
      )}
    </div>
  );
}
