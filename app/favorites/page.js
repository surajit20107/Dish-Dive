"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MealCard from "@/components/MealCard";
import { Heart, ArrowLeft } from "lucide-react";

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);

  // Load saved favorites from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("dishDiveFavorites") || "[]");
    setFavorites(saved);
  }, []);

  const handleClearAll = () => {
    localStorage.removeItem("dishDiveFavorites");
    setFavorites([]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-orange-500 mb-6 transition-colors text-sm font-medium cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Go back
      </button>

      {/* Heading */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Heart className="w-7 h-7 text-red-500 fill-red-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Saved Recipes</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {favorites.length} {favorites.length === 1 ? "recipe" : "recipes"} saved
            </p>
          </div>
        </div>
        {favorites.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-red-400 hover:text-red-600 font-medium transition-colors cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Content */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <Heart className="w-14 h-14 mb-4 text-gray-200" />
          <p className="text-xl font-semibold text-gray-600">No saved recipes yet</p>
          <p className="text-sm mt-1 text-center max-w-xs">
            Open any recipe and tap the heart icon to save it here for later.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold transition-colors cursor-pointer"
          >
            Explore Recipes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}
