# Dish Dive

**Dive into Flavor & Cook with Confidence**

Dish Dive is a web application that empowers food enthusiasts to discover, explore, and cook a variety of delicious meals from around the world. Whether you're looking for new recipes, want to explore dishes by category, or are searching for inspiration, Dish Dive provides a seamless and interactive experience.

## Features

- **Recipe Discovery:** Browse a wide selection of meals, primarily using data from [TheMealDB API](https://www.themealdb.com).
- **Search Functionality:** Quickly search for dishes by name using the search bar.
- **Browse by Category:** Explore meals organized by categories for easy discovery.
- **Detailed Recipe View:** View comprehensive recipe details, including:
  - Ingredients with precise measurements
  - Step-by-step cooking instructions (parsed for clarity)
  - Category and tags
  - High-quality meal images
  - Embedded video tutorials (when available)
- **Responsive Design:** Clean, modern, and mobile-friendly interface.
- **Developer Credits & Social Links:** Easily connect with the developer on GitHub, LinkedIn, and Twitter.

## Tech Stack

- **Frontend:** React (with Next.js App Router)
- **API:** [TheMealDB](https://www.themealdb.com) for meal and recipe data
- **Styling:** Tailwind CSS, custom CSS
- **Icons:** React Icons (Lucide, Font Awesome)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/surajit20107/Dish-Dive.git
   cd Dish-Dive
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Open in your browser:**
   ```
   http://localhost:3000
   ```

## Project Structure

- `app/` — Main Next.js App Directory (routes for home, search, category, recipe details)
- `components/` — Shared UI components (Header, Footer)
- `public/` — Static assets
- `next.config.mjs` — Next.js configuration

## How It Works

- **Home Page:** By default, displays Indian meals and all available meal categories.
- **Category Page:** Click on a category to view all meals under that category.
- **Recipe Detail Page:** Click on any meal to see its full recipe (ingredients, instructions, video).
- **Search:** Enter a dish name in the search bar to find specific recipes.

### Example Usage

- **Search:** Type "Chicken" and press Enter to see chicken-based recipes.
- **Browse:** Click on a category like "Dessert" to view dessert recipes.
- **Recipe Details:** Click any dish for complete preparation details and a YouTube tutorial if available.

## Credits

- Data provided by [TheMealDB](https://www.themealdb.com)
- Made with ❤️ by [Surajit Jana](https://github.com/surajit20107)

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Dish Dive – Delicious meals for every occasion. Discover quick recipes, cooking tips, and tasty ideas to make home cooking fun and effortless!**
