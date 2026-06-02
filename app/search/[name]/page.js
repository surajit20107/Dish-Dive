"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import MealCard from "@/components/MealCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { ArrowLeft, SearchX } from "lucide-react";

export default function SearchPage() {
  const params = useParams();
  const router = useRouter();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = decodeURIComponent(params.name);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
      );
      // API returns null when there are no matches
      setMeals(res.data.meals || []);
      setLoading(false);
    };
    fetchResults();
  }, [query]);

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Search results for{" "}
          <span className="text-orange-500">&ldquo;{query}&rdquo;</span>
        </h1>
        {!loading && (
          <p className="text-sm text-gray-500 mt-1">
            {meals.length} {meals.length === 1 ? "result" : "results"} found
          </p>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
        </div>
      ) : meals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <SearchX className="w-14 h-14 mb-4 text-gray-300" />
          <p className="text-xl font-semibold text-gray-600">No recipes found</p>
          <p className="text-sm mt-1">
            Try a different search term like &ldquo;pasta&rdquo; or &ldquo;chicken&rdquo;.
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
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}
