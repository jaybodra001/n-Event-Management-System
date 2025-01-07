import React, { useState, useEffect } from "react";

const EditEventModal = ({ event, onClose, onSave }) => {
  const [updatedEvent, setUpdatedEvent] = useState({});

  useEffect(() => {
    if (event) {
      setUpdatedEvent({ ...event });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(event._id, updatedEvent); 
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Edit Event</h3>
        <div>
          <label className="block text-gray-600 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={updatedEvent.title || ""}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Description</label>
          <textarea
            name="description"
            value={updatedEvent.description || ""}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={updatedEvent.location || ""}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Max Attendees</label>
          <input
            type="number"
            name="maxAttendees"
            value={updatedEvent.maxAttendees || ""}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-lg"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEventModal;
