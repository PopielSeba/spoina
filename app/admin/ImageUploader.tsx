'use client';

import { useState, useRef } from 'react';

interface ImageUploaderProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
  productName: string;
}

export default function ImageUploader({ currentImage, onImageChange, productName }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Sprawdź typ pliku
    if (!file.type.startsWith('image/')) {
      alert('Proszę wybrać plik obrazu');
      return;
    }

    // Sprawdź rozmiar pliku (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Plik jest za duży. Maksymalny rozmiar to 5MB');
      return;
    }

    setIsUploading(true);

    // Konwertuj plik do base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      onImageChange(base64String);
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert('Błąd podczas wczytywania pliku');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const generateImageUrl = () => {
    const query = `${productName} professional product photography with clean background highlighting product details and quality craftsmanship`;
    const seq = `auto-${Date.now()}`;
    return `https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28query%29%7D&width=400&height=300&seq=${seq}&orientation=landscape`;
  };

  const handleAutoGenerate = () => {
    const imageUrl = generateImageUrl();
    onImageChange(imageUrl);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Zdjęcie produktu</label>
      
      {/* Podgląd aktualnego zdjęcia */}
      {currentImage && (
        <div className="mb-3">
          <img 
            src={currentImage} 
            alt="Podgląd" 
            className="w-32 h-24 object-cover rounded-lg border border-gray-300"
          />
        </div>
      )}

      {/* Opcje dodawania zdjęcia */}
      <div className="space-y-3">
        {/* Upload pliku */}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="ri-upload-2-line mr-2 w-4 h-4 flex items-center justify-center"></i>
            {isUploading ? 'Wgrywanie...' : 'Wgraj plik ze komputera'}
          </button>
        </div>

        {/* URL zdjęcia */}
        <div className="flex gap-2">
          <input
            type="url"
            value={currentImage.startsWith('data:') ? '' : currentImage}
            onChange={(e) => onImageChange(e.target.value)}
            placeholder="https://... lub wgraj plik powyżej"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
          />
          <button
            type="button"
            onClick={handleAutoGenerate}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 text-sm whitespace-nowrap"
          >
            Auto
          </button>
        </div>
      </div>

      {/* Informacje pomocnicze */}
      <div className="mt-2 text-xs text-gray-500">
        <p>• Obsługiwane formaty: JPG, PNG, GIF, WebP</p>
        <p>• Maksymalny rozmiar: 5MB</p>
        <p>• Zalecane wymiary: 400x300px</p>
      </div>
    </div>
  );
}