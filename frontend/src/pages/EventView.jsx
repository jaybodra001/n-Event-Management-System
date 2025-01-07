import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authUser";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import EditEventModal from "../components/EditEventModal"; // Import the modal

const EventView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { events, fetchEvents, editEvent, deleteEvent, isFetchingEvents } =
    useAuthStore(); // Updated to fetchEvents
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    fetchEvents(); // Fetch events when the component mounts
  }, [fetchEvents]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter events based on search term
  const filteredEvents = events.filter((event) => {
    const title = event.title?.toLowerCase() || "";
    const description = event.description?.toLowerCase() || "";
    const location = event.location?.toLowerCase() || "";
    return (
      title.includes(searchTerm) ||
      description.includes(searchTerm) ||
      location.includes(searchTerm)
    );
  });

  // Handle selecting an event
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  // Handle deleting an event
  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      setSelectedEvent(null);
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  // Handle editing an event
  const handleEditEvent = async (id, updatedEventData) => {
    try {
      await editEvent(id, updatedEventData);
      setSelectedEvent(null);
      setIsModalVisible(false);
    } catch (error) {
      toast.error("Failed to update event");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isVisible={isSidebarVisible} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white p-6 rounded shadow animate-fade-in">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Events</h2>

              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search by title, description, or location..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-3 mb-6 border rounded-lg shadow-md focus:outline-none"
              />

              {/* Event List */}

              {/* {!selectedEvent && filteredEvents.length > 0 && ( */}
              <ul className="space-y-4">
                {isFetchingEvents ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      Loading tasks...
                    </td>
                  </tr>
                ) : !selectedEvent && filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <li
                      key={event._id}
                      className="p-5 border rounded-lg shadow-md hover:shadow-xl transition-all"
                    >
                      <h3 className="text-xl font-semibold text-gray-800">
                        {event.title}
                      </h3>
                      <p className="text-gray-600">
                        <strong>Description:</strong> {event.description}
                      </p>
                      <p className="text-gray-600">
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p className="text-gray-600">
                        <strong>Date:</strong>{" "}
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">
                        <strong>Max Attendees:</strong> {event.maxAttendees}
                      </p>
                      <div className="mt-4">
                        <button
                          onClick={() => handleSelectEvent(event)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                        >
                          View Details
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No event available.
                    </td>
                  </tr>
                )}
              </ul>
              {/* )} */}

              {/* No Events Found */}
              {filteredEvents.length === 0 && !selectedEvent && (
                <p className="text-gray-600">No events found.</p>
              )}

              {/* Event Detail View */}
              {selectedEvent && (
                <div className="p-6 border rounded-lg shadow-md bg-gray-50">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-gray-600">
                    <strong>Description:</strong> {selectedEvent.description}
                  </p>
                  <p className="text-gray-600">
                    <strong>Location:</strong> {selectedEvent.location}
                  </p>
                  <p className="text-gray-600">
                    <strong>Date:</strong>{" "}
                    {new Date(selectedEvent.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    <strong>Max Attendees:</strong> {selectedEvent.maxAttendees}
                  </p>
                  {selectedEvent.imageUrl && (
                    <img
                      src={selectedEvent.imageUrl}
                      alt="Event"
                      className="mt-4 rounded-lg shadow-md w-full"
                    />
                  )}
                  <div className="mt-6 flex space-x-4">
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(selectedEvent._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setIsModalVisible(true)} // Open modal on Edit button click
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Edit Event Modal */}
      {isModalVisible && (
        <EditEventModal
          event={selectedEvent}
          onClose={() => setIsModalVisible(false)} // Close modal
          onSave={handleEditEvent} // Save changes
        />
      )}

      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded-full
        lg:hidden shadow-md"
      >
        Toggle Sidebar
      </button>
    </div>
  );
};

export default EventView;
