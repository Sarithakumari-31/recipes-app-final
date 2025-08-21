import React, { useState, useEffect } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch cuisines for dropdown
  const fetchCuisines = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/cuisines");
      const data = await res.json();
      setCuisines(data);
    } catch (err) {
      console.error("Error fetching cuisines:", err);
    }
  };

  // Fetch recipes (with filters)
  const fetchRecipes = async () => {
    try {
      let url = "http://127.0.0.1:8000/api/recipes/search?";
      if (selectedCuisine) url += `cuisine=${selectedCuisine}&`;
      if (searchTerm) url += `title=${searchTerm}&`;

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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🍴 Recipes</h1>

      {/* Filters Section */}
      <div className="flex items-center gap-4 mb-6">
        {/* Cuisine Dropdown */}
        <select
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">All Cuisines</option>
          {cuisines.map((cuisine, index) => (
            <option key={index} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>

        {/* Search by Title */}
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchRecipes()} // hit Enter to search
          className="border rounded-lg px-4 py-2 flex-1"
        />

        {/* Search Button */}
        <button
          onClick={fetchRecipes}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Recipes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
            <p className="text-gray-600">{recipe.cuisine}</p>
            <p className="text-yellow-600">⭐ {recipe.rating}</p>
            <p className="mt-2 text-sm">{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
