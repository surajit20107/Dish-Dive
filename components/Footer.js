import Link from "next/link";
import { ChefHat } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <ChefHat className="w-6 h-6 text-orange-400" />
              <span className="text-xl font-bold">DishDive</span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs">
              Discover thousands of recipes from around the world. Cook with
              confidence, eat with joy.
            </p>
          </div>

          {/* Quick links */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-3 text-slate-200">Explore</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-orange-400 transition-colors">
                  Saved Recipes
                </Link>
              </li>
              <li>
                <Link href="/search/chicken" className="hover:text-orange-400 transition-colors">
                  Search Meals
                </Link>
              </li>
            </ul>
          </div>

          {/* Social – update these with your own links */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-3 text-slate-200">Connect</h3>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-slate-400 hover:text-orange-400 transition-colors"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-slate-400 hover:text-orange-400 transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="text-slate-400 hover:text-orange-400 transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
            <p className="text-slate-500 text-xs mt-3">
              Update links in components/Footer.js
            </p>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} DishDive. Powered by{" "}
          <a
            href="https://www.themealdb.com"
            target="_blank"
            rel="noreferrer"
            className="text-orange-400 hover:underline"
          >
            TheMealDB
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
