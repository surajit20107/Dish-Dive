"use client";
import { useRouter } from "next/navigation";

/**
 * MealCard – reusable card component for displaying a meal in a grid.
 * Accepts a `meal` object from TheMealDB filter/search API.
 */
export default function MealCard({ meal }) {
  const router = useRouter();

  return (
    <div
      className="meal-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
      onClick={() => router.push(`/${meal.idMeal}`)}
    >
      {/* Meal image with zoom-on-hover */}
      <div className="overflow-hidden aspect-square">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="meal-card-img w-full h-full object-cover"
        />
      </div>

      {/* Meal name */}
      <div className="p-3">
        <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
          {meal.strMeal}
        </p>
      </div>
    </div>
  );
}
