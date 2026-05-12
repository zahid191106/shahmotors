'use client';

import React, { useState, useEffect } from 'react';
import { Filter, X, Search, ChevronDown, Droplets, Gauge, Settings2 } from 'lucide-react';

import { useRouter, useSearchParams } from 'next/navigation';

interface FilterSidebarProps {
  dynamicMakes: string[];
  dynamicModels: string[];
}

// const makes = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
// const models = ['Corolla', 'Civic', 'Mustang', '3 Series', 'C-Class', 'A4'];
const gearboxes = ['Automatic', 'Manual'];

export default function FilterSidebar({ dynamicMakes, dynamicModels }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    make: searchParams.get('make') || '',
    fuelType: searchParams.get('fuelType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minYear: searchParams.get('minYear') || '',
    maxYear: searchParams.get('maxYear') || '',
    minMileage: searchParams.get('minMileage') || '',
    maxMileage: searchParams.get('maxMileage') || '',
    model: searchParams.get('model') || '',
    gearbox: searchParams.get('gearbox') || '',
  });

  useEffect(() => {
    setFilters({
      make: searchParams.get('make') || '',
      fuelType: searchParams.get('fuelType') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      minYear: searchParams.get('minYear') || '',
      maxYear: searchParams.get('maxYear') || '',
      minMileage: searchParams.get('minMileage') || '',
      maxMileage: searchParams.get('maxMileage') || '',
      model: searchParams.get('model') || '',
      gearbox: searchParams.get('gearbox') || '',
    });
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.make) params.set('make', filters.make.trim());
    if (filters.fuelType) params.set('fuelType', filters.fuelType);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.minYear) params.set('minYear', filters.minYear);
    if (filters.maxYear) params.set('maxYear', filters.maxYear);
    if (filters.minMileage) params.set('minMileage', filters.minMileage);
    if (filters.maxMileage) params.set('maxMileage', filters.maxMileage);
    if (filters.model) params.set('model', filters.model.trim());
    if (filters.gearbox) params.set('gearbox', filters.gearbox);
    router.push(`/cars?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/cars');
  };

  return (
    <div className="w-full bg-white rounded-xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 sticky top-24">
      <form onSubmit={applyFilters} className="space-y-6">
        {}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 text-start">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Vehicle Model</label>
            <div className="relative group">
              <select name="model" value={filters.model} onChange={handleChange} 
               className="w-full appearance-none bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl p-4 font-bold text-gray-800 transition-all outline-none cursor-pointer"
              >
                <option value="">All Models</option>
                {dynamicModels.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4 group-focus-within:text-red-600 transition-colors" />
            </div>
          </div>

          <div className="space-y-2 text-start">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Manufacturer</label>
            <div className="relative group">
              <select name="make" value={filters.make} onChange={handleChange} 
                className="w-full appearance-none bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl p-4 font-bold text-gray-800 transition-all outline-none cursor-pointer"
              >
                <option value="">All Brands</option>
                {dynamicMakes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4 group-focus-within:text-red-600 transition-colors" />
            </div>
          </div>
        </div>

        {}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2  text-start">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Gearbox</label>
              <div className="relative group">
                <select
                  name="gearbox"
                  value={filters.gearbox}
                  onChange={handleChange}
                  className="w-full appearance-none bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl p-4 font-bold text-xs text-gray-800 transition-all outline-none cursor-pointer"
                >
                  <option value="">Any</option>
                  {gearboxes.map(gearbox => (
                    <option key={gearbox} value={gearbox}>{gearbox}</option>
                  ))}
                </select>
                <Settings2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 w-3.5 h-3.5" />
              </div>
            </div>
            <div className="space-y-2 text-start">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Fuel</label>
              <div className="relative group">
                <select
                  name="fuelType"
                  value={filters.fuelType}
                  onChange={handleChange}
                  className="w-full appearance-none bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl p-4 font-bold text-sm text-gray-800 transition-all outline-none cursor-pointer"
                >
                  <option value="">Any</option>
                  {fuelTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <Droplets className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <div className="text-start border-t border-gray-50 space-y-4">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Mileage</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="number"
                  name="minMileage"
                  value={filters.minMileage}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl p-4 pl-8 font-bold text-gray-800 placeholder:text-gray-300 transition-all outline-none"
                  placeholder="Min KM"
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="maxMileage"
                  value={filters.maxMileage}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl p-4 pl-8 font-bold text-gray-800 placeholder:text-gray-300 transition-all outline-none"
                  placeholder="Max KM"
                />
              </div>
            </div>
          </div>
        </div>

        {}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className="text-start pt-4 border-t border-gray-50 space-y-4">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Price Range ($)</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 font-bold">$</span>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl p-4 pl-8 font-bold text-gray-800 placeholder:text-gray-300 transition-all outline-none"
                  placeholder="Min"
                />
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 font-bold">$</span>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl p-4 pl-8 font-bold text-gray-800 placeholder:text-gray-300 transition-all outline-none"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          <div className="text-start pt-4 border-t border-gray-50 space-y-4">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Year Range</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="number"
                  name="minYear"
                  value={filters.minYear}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl p-4 pl-8 font-bold text-gray-800 placeholder:text-gray-300 transition-all outline-none"
                  placeholder="Min"
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="maxYear"
                  value={filters.maxYear}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white rounded-2xl p-4 pl-8 font-bold text-gray-800 placeholder:text-gray-300 transition-all outline-none"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

        </div>

        {}
        <div className="pt-6 flex sm:flex-row flex-col items-center gap-4">
          <button 
            type="submit" 
            className="group w-full bg-gray-900 hover:bg-red-600 text-white py-5 rounded-2xl cursor-pointer font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-gray-200 hover:shadow-red-200 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
            Apply Filters
          </button>
          <button 
            type="button"
            onClick={clearFilters}
            className="w-full sm:w-auto text-sm font-black uppercase tracking-[0.2em] py-4 px-5 rounded-2xl cursor-pointer border border-gray-400 hover:border-red-600 text-gray-400 hover:text-red-600 transition-colors flex items-center justify-center gap-1 group"
          >
            <X size={14} className="transition-transform group-hover:rotate-90" />
            Reset
          </button>          
        </div>
      </form>
    </div>
  );
}