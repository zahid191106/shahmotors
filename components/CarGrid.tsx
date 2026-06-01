"use client";
import { useSearchParams, useRouter } from "next/navigation";
import CarCard from "@/components/CarCard";
import { useMemo } from "react";

const CARS_PER_PAGE = 9;

export default function CarGrid({ allCars }: { allCars: any[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const filteredCars = useMemo(() => {
    const make = searchParams.get("make") || undefined;
    const fuelType = searchParams.get("fuelType") || undefined;
    const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : undefined;
    const minYear = searchParams.get("minYear") ? parseFloat(searchParams.get("minYear")!) : undefined;
    const maxYear = searchParams.get("maxYear") ? parseFloat(searchParams.get("maxYear")!) : undefined;
    const minMileage = searchParams.get("minMileage") ? parseFloat(searchParams.get("minMileage")!) : undefined;
    const maxMileage = searchParams.get("maxMileage") ? parseFloat(searchParams.get("maxMileage")!) : undefined;
    const model = searchParams.get("model") || undefined;
    const gearbox = searchParams.get("gearbox") || undefined;
    const bodyType = searchParams.get("bodyType") || undefined;
    return allCars.filter((car: any) => {
      let match = true;
      if (make) match = match && car.make?.trim().toLowerCase() === make.trim().toLowerCase();
      if (model) match = match && car.model?.trim().toLowerCase() === model.trim().toLowerCase();
      if (fuelType) match = match && car.fuelType === fuelType;
      if (minPrice) match = match && car.price >= minPrice;
      if (maxPrice) match = match && car.price <= maxPrice;
      if (gearbox) match = match && car.gearbox === gearbox;
      if (bodyType) match = match && car.bodyType === bodyType;
      if (minYear) match = match && car.year >= minYear;
      if (maxYear) match = match && car.year <= maxYear;
      if (minMileage) match = match && car.mileage >= minMileage;
      if (maxMileage) match = match && car.mileage <= maxMileage;
      return match;
    });
  }, [allCars, searchParams]);

  const totalPages = Math.ceil(filteredCars.length / CARS_PER_PAGE);
  const paginatedCars = filteredCars.slice((page - 1) * CARS_PER_PAGE, page * CARS_PER_PAGE);

  const hasActiveFilters = Array.from(searchParams.entries()).some(([k, v]) => {
    return k !== "page" && v !== undefined && v !== "";
  });

  const resetFilters = () => {
    router.push(`/cars`);
  };

  const contactDealer = () => {
    const make = searchParams.get("make") || "";
    const model = searchParams.get("model") || "";
    const subject = encodeURIComponent(`Looking for ${make} ${model}`.trim());
    router.push(`/contact?subject=${subject}`);
  };

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (newPage === 1) {
      params.delete("page");
    } else {
      params.set("page", String(newPage));
    }
    router.push(`/cars?${params.toString()}`);
  };

  return (
    <>
      {paginatedCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
          {paginatedCars.map((car: any) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center space-y-6">
          <div className="w-64 h-64 rounded-full bg-red-50 flex items-center justify-center">
            <img src="images/pic1.png" alt="No cars found" className="w-full h-full" />
          </div>

          <div className="text-center max-w-xl">
            <h3 className="text-2xl md:text-3xl font-black text-gray-800">No cars found</h3>
            <p className="mt-3 text-sm md:text-base text-slate-600">We couldn't find any cars that match your criteria. Try resetting filters or contact us and we'll help find your specific car.</p>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              onClick={resetFilters}
              className={`cursor-pointer px-4 py-2 rounded-md border ${hasActiveFilters ? 'bg-red-600 text-white border-red-600' : 'bg-white text-red-600 border-red-600 opacity-60 cursor-not-allowed'}`}
              disabled={!hasActiveFilters}
            >
              Reset filters
            </button>

            <button
              onClick={contactDealer}
              className="cursor-pointer px-4 py-2 rounded-md bg-white text-red-600 border border-red-600 hover:bg-red-50"
            >
              Contact dealer
            </button>
          </div>
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex flex-col justify-center items-center gap-4 mt-8">
          <div className="w-full flex justify-end items-center gap-2">
            <button
              className={`px-3 py-1 rounded border border-red-600 text-red-600 disabled:opacity-50 hover:bg-red-500 hover:text-white transition ${page <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded border border-red-600 cursor-pointer transition ${page === i + 1 ? "bg-red-600 text-white" : "bg-white text-red-600 hover:bg-red-50"}`}
                onClick={() => goToPage(i + 1)}
                disabled={page === i + 1}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={`px-3 py-1 rounded border border-red-600 text-red-600 disabled:opacity-50 hover:bg-red-500 hover:text-white transition ${page >= totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => goToPage(page + 1)}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
          {/* Pagination Indicators */}
          <div className="flex justify-center items-center space-x-2 mt-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <div
                key={i}
                className={
                  page === i + 1
                    ? "w-8 h-2.5 bg-red-600 rounded-full transition-all"
                    : "w-2.5 h-2.5 bg-gray-300 rounded-full transition-all"
                }
              ></div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
