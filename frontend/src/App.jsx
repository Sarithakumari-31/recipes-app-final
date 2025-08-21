import { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

function App() {
  const [cuisines, setCuisines] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch cuisines from backend
  const fetchCuisines = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/cuisines`);
      const data = await res.json();
      setCuisines(data);
    } catch (err) {
      console.error("Error fetching cuisines:", err);
    }
  };

  // Fetch recipes (all or filtered)
  const fetchRecipes = async (cuisine = "", search = "") => {
    try {
      let url = `${API_BASE_URL}/api/recipes?page=1&limit=20`;
      if (cuisine || search) {
        url = `${API_BASE_URL}/api/recipes/search?`;
        if (cuisine) url += `cuisine=${cuisine}&`;
        if (search) url += `title=${search}`;
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

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🍲 Recipes</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        {/* Cuisine Dropdown */}
        <select
          value={selectedCuisine}
          onChange={(e) => {
            setSelectedCuisine(e.target.value);
            fetchRecipes(e.target.value, searchQuery);
          }}
          className="border p-2 rounded"
        >
          <option value="">All Cuisines</option>
          {cuisines.map((cuisine, i) => (
            <option key={i} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={() => fetchRecipes(selectedCuisine, searchQuery)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Recipes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recipes.length > 0 ? (
          recipes.map((r) => (
            <div key={r.id} className="border p-4 rounded shadow">
              <h2 className="font-bold text-lg">{r.title}</h2>
              <p className="text-sm text-gray-600">{r.cuisine}</p>
              <p className="mt-2">{r.description}</p>
              <p className="mt-2 text-sm">⭐ {r.rating} | ⏱ {r.total_time} mins</p>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
