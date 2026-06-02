"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Heart, Tag, Globe, Play } from "lucide-react";

export default function RecipePage() {
  const params = useParams();
  const router = useRouter();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState({});

  // Fetch full recipe details by ID
  useEffect(() => {
    const fetchMeal = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.receipeId}`
      );
      const data = res.data.meals[0];
      setMeal(data);

      // Check if this meal is already saved as a favorite
      const saved = JSON.parse(localStorage.getItem("dishDiveFavorites") || "[]");
      setIsFavorite(saved.some((m) => m.idMeal === data.idMeal));

      setLoading(false);
    };
    fetchMeal();
  }, [params.receipeId]);

  // Toggle favorite status and persist to localStorage
  const handleFavoriteToggle = () => {
    const saved = JSON.parse(localStorage.getItem("dishDiveFavorites") || "[]");
    let updated;
    if (isFavorite) {
      updated = saved.filter((m) => m.idMeal !== meal.idMeal);
    } else {
      updated = [
        ...saved,
        { idMeal: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb },
      ];
    }
    localStorage.setItem("dishDiveFavorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  // Toggle an ingredient checkbox (cross off while cooking)
  const toggleIngredient = (key) => {
    setCheckedIngredients((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Build an array of { ingredient, measure } pairs from the meal object
  const getIngredients = (mealData) => {
    if (!mealData) return [];
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = mealData[`strIngredient${i}`];
      const measure = mealData[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        list.push({ key: `ing-${i}`, ingredient: ingredient.trim(), measure: measure?.trim() || "" });
      }
    }
    return list;
  };

  // Split instruction text into numbered steps for readability
  const getSteps = (instructions) => {
    if (!instructions) return [];
    const hasNumbers = /\d+\.\s/.test(instructions);
    if (hasNumbers) {
      const parts = instructions.split(/\s*(\d+\.)\s+/).filter(Boolean);
      const steps = [];
      for (let i = 0; i < parts.length; i += 2) {
        if (parts[i + 1]) steps.push(parts[i + 1].trim());
      }
      return steps;
    }
    return instructions.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
  };

  // ── Loading state ────────────────────────────────
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded-full w-2/3 mx-auto" />
        <div className="h-72 bg-gray-200 rounded-2xl" />
        <div className="space-y-3">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded-full w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500">
        <p className="text-xl font-semibold">Recipe not found</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 text-orange-500 hover:underline font-medium"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const ingredients = getIngredients(meal);
  const steps = getSteps(meal.strInstructions);
  const youtubeId = meal.strYoutube?.split("v=")[1];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-orange-500 mb-6 transition-colors text-sm font-medium cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Go back
      </button>

      {/* Title + Favorite */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
          {meal.strMeal}
        </h1>
        <button
          onClick={handleFavoriteToggle}
          className={`flex-shrink-0 p-2 rounded-full border-2 transition-all cursor-pointer ${
            isFavorite
              ? "bg-red-50 border-red-400 text-red-500"
              : "bg-white border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400"
          }`}
          aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500" : ""}`} />
        </button>
      </div>

      {/* Hero Image */}
      <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full object-cover max-h-96"
        />
      </div>

      {/* Meta badges */}
      <div className="flex flex-wrap gap-3 mb-8">
        {meal.strCategory && (
          <span className="flex items-center gap-1 bg-orange-100 text-orange-700 text-sm font-semibold px-4 py-1.5 rounded-full">
            <Tag className="w-3.5 h-3.5" />
            {meal.strCategory}
          </span>
        )}
        {meal.strArea && (
          <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full">
            <Globe className="w-3.5 h-3.5" />
            {meal.strArea} Cuisine
          </span>
        )}
        {meal.strTags &&
          meal.strTags.split(",").map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-600 text-sm font-medium px-4 py-1.5 rounded-full"
            >
              {tag.trim()}
            </span>
          ))}
      </div>

      {/* Ingredients – with interactive checkboxes */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          {ingredients.map(({ key, ingredient, measure }) => (
            <label
              key={key}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={!!checkedIngredients[key]}
                onChange={() => toggleIngredient(key)}
                className="w-4 h-4 accent-orange-500 cursor-pointer"
              />
              <span
                className={`text-sm flex-1 transition-colors ${
                  checkedIngredients[key]
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
              >
                <span className="font-semibold">{ingredient}</span>
                {measure && (
                  <span className="text-gray-500 font-normal"> – {measure}</span>
                )}
              </span>
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2 ml-1">
          Tick ingredients as you go!
        </p>
      </section>

      {/* Instructions – numbered steps */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* YouTube Tutorial */}
      {youtubeId && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Play className="w-5 h-5 text-red-500" />
            Video Tutorial
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-md aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={`${meal.strMeal} tutorial`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}
    </div>
  );
}
