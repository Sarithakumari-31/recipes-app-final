import React, { useEffect, useState } from "react";

const API_BASE = "https://recipes-app-final-1.onrender.com";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch cuisines
  const fetchCuisines = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/cuisines`);
      const data = await res.json();
      setCuisines(["All", ...data]); // add "All" at top
    } catch (err) {
      console.error("Error fetching cuisines:", err);
    }
  };

  // Fetch recipes
  const fetchRecipes = async () => {
    try {
      let url = `${API_BASE}/api/recipes?page=1&limit=50`;

      if (selectedCuisine && selectedCuisine !== "All") {
        url = `${API_BASE}/api/recipes/search?cuisine=${selectedCuisine}`;
      }

      if (searchQuery) {
        url = `${API_BASE}/api/recipes/search?title=${searchQuery}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };

  useEffect(() => {
    fetchCuisines();
    fetchRecipes();
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [selectedCuisine]);

  const handleSearch = () => {
    fetchRecipes();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🍲 Recipes App</h1>

      {/* Cuisine Dropdown */}
      <select
        value={selectedCuisine}
        onChange={(e) => setSelectedCuisine(e.target.value)}
        className="border p-2 rounded mb-4"
      >
        {cuisines.map((c, idx) => (
          <option key={idx} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Recipes List */}
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} className="mb-2 border-b pb-2">
            <h2 className="font-semibold">{recipe.title}</h2>
            <p className="text-sm">{recipe.cuisine} • ⭐ {recipe.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
