import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useAuthStore } from '../store/authUser';

const EventForm = () => {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxAttendees: "",
    imageUrl: "",
  });

  const { createEvent, isCreatingEvent } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEvent(event);
    setEvent({
      title: "",
      description: "",
      date: "",
      location: "",
      maxAttendees: "",
      imageUrl: "",
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
              <h2 className="text-2xl font-bold text-gray-800">Create Event</h2>
              <div className="flex flex-col">
                <label htmlFor="title" className="text-sm font-medium text-gray-600">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter event title"
                  value={event.title}
                  onChange={handleChange}
                  className="border rounded-md p-3 mt-1 focus:outline-none focus:ring focus:ring-green-300"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="description" className="text-sm font-medium text-gray-600">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter event description"
                  value={event.description}
                  onChange={handleChange}
                  className="border rounded-md p-3 mt-1 focus:outline-none focus:ring focus:ring-green-300"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="flex flex-col">
                <label htmlFor="date" className="text-sm font-medium text-gray-600">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={event.date}
                  onChange={handleChange}
                  className="border rounded-md p-3 mt-1 focus:outline-none focus:ring focus:ring-green-300"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="location" className="text-sm font-medium text-gray-600">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter event location"
                  value={event.location}
                  onChange={handleChange}
                  className="border rounded-md p-3 mt-1 focus:outline-none focus:ring focus:ring-green-300"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="maxAttendees" className="text-sm font-medium text-gray-600">
                  Max Attendees
                </label>
                <input
                  type="number"
                  id="maxAttendees"
                  name="maxAttendees"
                  placeholder="Enter max attendees"
                  value={event.maxAttendees}
                  onChange={handleChange}
                  className="border rounded-md p-3 mt-1 focus:outline-none focus:ring focus:ring-green-300"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="imageUrl" className="text-sm font-medium text-gray-600">
                  Image URL
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="Enter image URL"
                  value={event.imageUrl}
                  onChange={handleChange}
                  className="border rounded-md p-3 mt-1 focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-all"
                disabled={isCreatingEvent}
              >
                {isCreatingEvent ? "Creating Event..." : "Create Event"}
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
