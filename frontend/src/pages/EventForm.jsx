import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const EventForm = ({ onSubmit, initialData }) => {
  const [recipe, setRecipe] = useState(
    initialData || {
      name: "",
      cuisine: "",
      ingredients: "",
      instructions: "",
      cookingTime: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedRecipe = {
      ...recipe,
      ingredients: recipe.ingredients.split(",").map((ing) => ing.trim()),
    };
    onSubmit(formattedRecipe);
    setRecipe({
      name: "",
      cuisine: "",
      ingredients: "",
      instructions: "",
      cookingTime: "",
    });
  };

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isVisible={isSidebarVisible} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {initialData ? "Edit Recipe" : "Create Event"}
              </h2>
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-medium text-gray-600">
                Title
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter event title"
                  value={recipe.name}
                  onChange={handleChange}
                  className="border rounded-md p-3 mt-1 focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="instructions" className="text-sm font-medium text-gray-600">
                Description
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  placeholder="Enter Event Description"
                  value={recipe.instructions}
                  onChange={handleChange}
                  className="border rounded-md p-3 mt-1 focus:outline-none focus:ring focus:ring-green-300"
                  rows="4"
                ></textarea>
              </div>
              <div className="flex flex-col">
                <label htmlFor="cuisine" className="text-sm font-medium text-gray-600">
                  Date
                </label>
                <input
                  type="date"
                  id="cuisine"
                  name="cuisine"
                  placeholder="Enter cuisine type"
                  value={recipe.cuisine}
                  onChange={handleChange}
                  className="border rounded-md p-3 mt-1 focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="ingredients" className="text-sm font-medium text-gray-600">
                Location
                </label>
                <input
                  type="text"
                  id="ingredients"
                  name="ingredients"
                  placeholder="Enter Location"
                  value={recipe.ingredients}
                  onChange={handleChange}
                  className="border rounded-md p-3 mt-1 focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="cookingTime" className="text-sm font-medium text-gray-600">
                Max attendees
                </label>
                <input
                  type="text"
                  id="cookingTime"
                  name="cookingTime"
                  placeholder="Enter max attendees"
                  value={recipe.cookingTime}
                  onChange={handleChange}
                  className="border rounded-md p-3 mt-1 focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="cookingTime" className="text-sm font-medium text-gray-600">
                Image URL
                </label>
                <input
                  type="text"
                  id="cookingTime"
                  name="cookingTime"
                  placeholder="Enter image url"
                  value={recipe.cookingTime}
                  onChange={handleChange}
                  className="border rounded-md p-3 mt-1 focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-all"
              >
                {initialData ? "Update Recipe" : "Create Event"}
              </button>
            </form>
          </div>
        </main>
      </div>
      <Footer />
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded-full lg:hidden shadow-md"
      >
        Toggle Sidebar
      </button>
    </div>
  );
};

export default EventForm;
