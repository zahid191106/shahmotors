// components/FilterSidebar.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const makes = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState({
    make: searchParams.get('make') || '',
    fuelType: searchParams.get('fuelType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  });

  // Update local state when URL changes (e.g., back button)
  useEffect(() => {
    setFilters({
      make: searchParams.get('make') || '',
      fuelType: searchParams.get('fuelType') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
    });
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.make) params.set('make', filters.make);
    if (filters.fuelType) params.set('fuelType', filters.fuelType);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    router.push(`/cars?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/cars');
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Filter Cars</h2>
      <form onSubmit={applyFilters} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Make</label>
          <select
            name="make"
            value={filters.make}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">All</option>
            {makes.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fuel Type</label>
          <select
            name="fuelType"
            value={filters.fuelType}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">All</option>
            {fuelTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Min Price ($)</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="e.g., 10000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Max Price ($)</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="e.g., 50000"
          />
        </div>

        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Apply Filters
          </button>
          <button type="button" onClick={clearFilters} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}