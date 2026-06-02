"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MealCard from "@/components/MealCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Search, Shuffle, ChefHat } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Chicken");
  const [featuredMeal, setFeaturedMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mealsLoading, setMealsLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch all meal categories
  const fetchCategories = async () => {
    const res = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    return res.data.categories;
  };

  // Fetch meals filtered by category
  const fetchMealsByCategory = async (cat) => {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
    );
    return res.data.meals || [];
  };

  // Fetch a single random meal for the featured section
  const fetchRandomMeal = async () => {
    const res = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    return res.data.meals[0];
  };

  // On mount: load categories, default meal grid, and featured meal in parallel
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const [cats, mealList, random] = await Promise.all([
        fetchCategories(),
        fetchMealsByCategory("Chicken"),
        fetchRandomMeal(),
      ]);
      setCategories(cats);
      setMeals(mealList);
      setFeaturedMeal(random);
      setLoading(false);
    };
    init();
  }, []);

  // Switch active category and reload the meal grid
  const handleCategoryChange = async (cat) => {
    setSelectedCategory(cat);
    setMealsLoading(true);
    const mealList = await fetchMealsByCategory(cat);
    setMeals(mealList);
    setMealsLoading(false);
  };

  // Pick a new random featured meal
  const handleSurpriseMe = async () => {
    setFeaturedMeal(null);
    const random = await fetchRandomMeal();
    setFeaturedMeal(random);
  };

  // Navigate to search results
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search/${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="hero-gradient text-white py-16 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <ChefHat className="w-9 h-9 text-orange-400" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            DishDive
          </h1>
        </div>
        <p className="text-base md:text-lg text-slate-300 mb-8 max-w-lg mx-auto">
          Explore thousands of recipes from every corner of the world. Find
          your next favourite meal in seconds.
        </p>

        <form
          onSubmit={handleSearch}
          className="flex max-w-md mx-auto shadow-xl"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a recipe..."
            className="flex-1 px-5 py-3 rounded-l-full text-gray-800 text-base outline-none bg-white"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-r-full font-semibold transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* ── Featured Meal ──────────────────────────── */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Featured Recipe
            </h2>
            <button
              onClick={handleSurpriseMe}
              className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              Surprise me
            </button>
          </div>

          {!featuredMeal ? (
            <div className="w-full h-64 rounded-2xl bg-gray-200 animate-pulse" />
          ) : (
            <div
              className="relative rounded-2xl overflow-hidden cursor-pointer shadow-lg group"
              onClick={() => router.push(`/${featuredMeal.idMeal}`)}
            >
              <img
                src={featuredMeal.strMealThumb}
                alt={featuredMeal.strMeal}
                className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="featured-overlay absolute inset-0 flex items-end p-6">
                <div>
                  <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block">
                    {featuredMeal.strCategory}
                  </span>
                  <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight">
                    {featuredMeal.strMeal}
                  </h3>
                  <p className="text-orange-200 text-sm mt-1">
                    {featuredMeal.strArea} Cuisine &nbsp;·&nbsp; Tap to view full recipe
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── Category Filter ────────────────────────── */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Browse by Category
          </h2>
          <div className="category-scroll flex gap-3 overflow-x-auto pb-2">
            {loading
              ? Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 w-24 h-9 rounded-full bg-gray-200 animate-pulse"
                    />
                  ))
              : categories.map((cat) => (
                  <button
                    key={cat.idCategory}
                    onClick={() => handleCategoryChange(cat.strCategory)}
                    className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.strCategory
                        ? "bg-orange-500 text-white shadow-md"
                        : "bg-white text-gray-600 border border-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
                    }`}
                  >
                    {cat.strCategory}
                  </button>
                ))}
          </div>
        </section>

        {/* ── Meal Grid ──────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {selectedCategory} Recipes
          </h2>

          {mealsLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <LoadingSkeleton key={i} />
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {meals.slice(0, 16).map((meal) => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
