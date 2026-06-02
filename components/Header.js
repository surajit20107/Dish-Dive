"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChefHat, Search, Heart, Menu, X } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search/${encodeURIComponent(search.trim())}`);
      setSearch("");
      setMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-800 text-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tight hover:text-orange-400 transition-colors"
        >
          <ChefHat className="w-6 h-6 text-orange-400" />
          DishDive
        </Link>

        {/* Desktop search */}
        <form
          onSubmit={handleSearch}
          className="hidden sm:flex items-center flex-1 max-w-sm relative"
        >
          <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-slate-700 text-white placeholder-gray-400 text-sm outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
        </form>

        {/* Desktop nav links */}
        <div className="hidden sm:flex items-center gap-4 text-sm font-medium">
          <Link
            href="/favorites"
            className="flex items-center gap-1 text-gray-300 hover:text-orange-400 transition-colors"
          >
            <Heart className="w-4 h-4" />
            Favorites
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="sm:hidden p-2 rounded-lg hover:bg-slate-700 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-slate-800 border-t border-slate-700 px-4 pb-4 space-y-3">
          <form onSubmit={handleSearch} className="flex items-center relative mt-3">
            <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipes..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-slate-700 text-white placeholder-gray-400 text-sm outline-none focus:ring-2 focus:ring-orange-400"
            />
          </form>
          <Link
            href="/favorites"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-gray-300 hover:text-orange-400 transition-colors py-1"
          >
            <Heart className="w-4 h-4" />
            Favorites
          </Link>
        </div>
      )}
    </header>
  );
}
