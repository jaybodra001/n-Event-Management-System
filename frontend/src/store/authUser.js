import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  events: [],
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  isCreatingEvent: false,
  isEditingEvent: false,
  isDeletingEvent: false,
  isFetchingEvents: false,  

  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed");
      set({ isSigningUp: false, user: null });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Logged in successfully");
      return true;
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response.data.message || "Login failed");
    }
  },

  logout: async () => {
		set({ isLoggingOut: true });
		try {
			await axios.post("/api/v1/auth/logout");
			set({ user: null, isLoggingOut: false });
			toast.success("Logged out successfully");
		} catch (error) {
			set({ isLoggingOut: false });
			toast.error(error.response.data.message || "Logout failed");
		}
	},

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },

  createEvent: async (eventData) => {
    set({ isCreatingEvent: true });
    try {
      const response = await axios.post("/api/v1/auth/events", eventData);
      toast.success("Event created successfully!");
      set({ isCreatingEvent: false });
      // Optionally, you can update the events list after creation
      set((state) => ({ events: [...state.events, response.data] }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create event");
      set({ isCreatingEvent: false });
    }
  },

  editEvent: async (eventId, updatedEventData) => {
    set({ isEditingEvent: true });
    try {
      const response = await axios.put(`/api/v1/auth/events/${eventId}`, updatedEventData);
      toast.success("Event updated successfully!");
      set((state) => ({
        events: state.events.map((event) =>
          event._id === eventId ? { ...event, ...updatedEventData } : event
        ),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update event");
    } finally {
      set({ isEditingEvent: false });
    }
  },
  

  deleteEvent: async (eventId) => {
    set({ isDeletingEvent: true });
    try {
      await axios.delete(`/api/v1/auth/events/${eventId}`);
      toast.success("Event deleted successfully!");
      set({ isDeletingEvent: false });
      // Remove the deleted event from the list
      set((state) => ({
        events: state.events.filter((event) => event._id !== eventId),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete event");
      set({ isDeletingEvent: false });
    }
  },

  // New fetchEvents function
  fetchEvents: async () => {
    set({ isFetchingEvents: true });
    try {
      const response = await axios.get("/api/v1/auth/events");
      set({ events: response.data, isFetchingEvents: false });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch events");
      set({ isFetchingEvents: false, events: [] });
    }
  },
}));

