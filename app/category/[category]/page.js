"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import MealCard from "@/components/MealCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { ArrowLeft, UtensilsCrossed } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryName = decodeURIComponent(params.category);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
      );
      setMeals(res.data.meals || []);
      setLoading(false);
    };
    fetchMeals();
  }, [categoryName]);

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

      {/* Page heading */}
      <div className="flex items-center gap-3 mb-8">
        <UtensilsCrossed className="w-7 h-7 text-orange-500" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{categoryName}</h1>
          {!loading && (
            <p className="text-sm text-gray-500 mt-0.5">
              {meals.length} {meals.length === 1 ? "recipe" : "recipes"} found
            </p>
          )}
        </div>
      </div>

      {/* Meal grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
        </div>
      ) : meals.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <p className="text-lg font-semibold">No meals found in this category.</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 text-orange-500 hover:underline font-medium"
          >
            Back to Home
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}
