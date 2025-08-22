
'use client';

import { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';

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
  }
];

const categories = [
  { id: 'panele', name: 'Panele ogrodzeniowe' },
  { id: 'słupki', name: 'Słupki' },
  { id: 'siatki', name: 'Siatki ogrodzeniowe' },
  { id: 'bramy', name: 'Bramy i furtki' }
];

export default function OgrodzeniaManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'panele',
    price: 0,
    image: '',
    description: ''
  });

  useEffect(() => {
    const savedProducts = localStorage.getItem('ogrodzeniaProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem('ogrodzeniaProducts', JSON.stringify(defaultProducts));
    }
  }, []);

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('ogrodzeniaProducts', JSON.stringify(updatedProducts));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.max(...products.map(p => p.id), 0) + 1;
    const product: Product = { ...newProduct, id };
    const updatedProducts = [...products, product];
    saveProducts(updatedProducts);
    setNewProduct({ name: '', category: 'panele', price: 0, image: '', description: '' });
    setShowAddForm(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const updatedProducts = products.map(p =>
      p.id === editingProduct.id ? editingProduct : p
    );
    saveProducts(updatedProducts);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Czy na pewno chcesz usunąć ten produkt?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      saveProducts(updatedProducts);
    }
  };

  const generateImageUrl = (productName: string, seq: string) => {
    const query = `${productName} steel fence panel galvanized construction, professional product photography with clean background highlighting fence details and quality craftsmanship`;
    return `https://readdy.ai/api/search-image?query=${encodeURIComponent(query)}&width=400&height=300&seq=${seq}&orientation=landscape`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Zarządzanie Ogrodzeniami</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition duration-300 whitespace-nowrap"
        >
          Dodaj produkt
        </button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Dodaj nowy produkt</h3>
          <form onSubmit={handleAddProduct} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa produktu</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategoria</label>
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pr-8"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cena (zł)</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <ImageUploader
                currentImage={newProduct.image}
                onImageChange={(imageUrl) => setNewProduct({ ...newProduct, image: imageUrl })}
                productName={newProduct.name}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Opis</label>
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={2}
                required
              ></textarea>
            </div>
            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 whitespace-nowrap"
              >
                Dodaj produkt
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewProduct({ name: '', category: 'panele', price: 0, image: '', description: '' });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300 whitespace-nowrap"
              >
                Anuluj
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Product Form */}
      {editingProduct && (
        <div className="mb-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Edytuj produkt</h3>
          <form onSubmit={handleUpdateProduct} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa produktu</label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategoria</label>
              <select
                value={editingProduct.category}
                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pr-8"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cena (zł)</label>
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <ImageUploader
                currentImage={editingProduct.image}
                onImageChange={(imageUrl) => setEditingProduct({ ...editingProduct, image: imageUrl })}
                productName={editingProduct.name}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Opis</label>
              <textarea
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={2}
                required
              ></textarea>
            </div>
            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 whitespace-nowrap"
              >
                Zapisz zmiany
              </button>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300 whitespace-nowrap"
              >
                Anuluj
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="grid gap-4">
        {products.map(product => (
          <div key={product.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg mr-4"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{product.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-orange-600 font-semibold">{product.price} zł</span>
                <span className="text-gray-500">{categories.find(c => c.id === product.category)?.name}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditProduct(product)}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition duration-300 whitespace-nowrap"
              >
                Edytuj
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition duration-300 whitespace-nowrap"
              >
                Usuń
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Brak produktów. Dodaj pierwszy produkt używając przycisku powyżej.
        </div>
      )}
    </div>
  );
}
