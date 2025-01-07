import React, { useState } from "react";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const eventData = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    cuisine: "Italian",
    ingredients: ["spaghetti", "eggs", "cheese", "bacon"],
    instructions:
      "Boil spaghetti. Cook bacon. Mix eggs and cheese. Combine all together.",
    cookingTime: "30 minutes",
  },
  {
    id: 2,
    name: "Chicken Curry",
    cuisine: "Indian",
    ingredients: ["chicken", "curry powder", "yogurt", "onion"],
    instructions: "Cook onions. Add chicken and spices. Simmer with yogurt.",
    cookingTime: "45 minutes",
  },
  {
    id: 3,
    name: "Sushi",
    cuisine: "Japanese",
    ingredients: ["rice", "fish", "seaweed"],
    instructions: "Cook rice. Slice fish. Roll rice and fish in seaweed.",
    cookingTime: "20 minutes",
  },
];

const EventView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventData);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = eventData.filter(
      (event) =>
        event.name.toLowerCase().includes(term) ||
        event.cuisine.toLowerCase().includes(term) ||
        event.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(term)
        )
    );

    setFilteredEvents(filtered);
  };

  // Handle selecting a Event
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  // Handle deleting a Event
  const handleDeleteEvent = (id) => {
    const updatedEvents = filteredEvents.filter((event) => event.id !== id);
    setFilteredEvents(updatedEvents);
    setSelectedEvent(null);
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
          <div className="bg-white p-6 rounded shadow animate-fade-in">
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 className="text-2xl font-bold text-gray-800">Events</h2>

              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search by ingredient or cuisine..."
                value={searchTerm}
                onChange={handleSearch}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "20px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />

              {/* Event List */}
              {!selectedEvent && (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {filteredEvents.map((event) => (
                    <li
                      key={event.id}
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        marginBottom: "10px",
                        padding: "15px",
                      }}
                    >
                      <h2>{event.name}</h2>
                      <p>
                        <strong>Date:</strong> {event.cuisine}
                      </p>
                      <p>
                        <strong>Ingredients:</strong>{" "}
                        {event.ingredients.join(", ")}
                      </p>
                      <button
                        onClick={() => handleSelectEvent(event)}
                        style={{ marginTop: "10px" }}
                      >
                        View Details
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {filteredEvents.length === 0 && !selectedEvent && (
                <p>No Events found.</p>
              )}

              {/* Event Detail View */}
              {selectedEvent && (
                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    padding: "20px",
                  }}
                >
                  <h2>{selectedEvent.name}</h2>
                  <p>
                    <strong>Cuisine:</strong> {selectedEvent.cuisine}
                  </p>
                  <p>
                    <strong>Ingredients:</strong>{" "}
                    {selectedEvent.ingredients.join(", ")}
                  </p>
                  <p>
                    <strong>Instructions:</strong> {selectedEvent.instructions}
                  </p>
                  <p>
                    <strong>Cooking Time:</strong> {selectedEvent.cookingTime}
                  </p>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    style={{ marginRight: "10px" }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
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

export default EventView;
