import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const Sidebar = ({ isVisible }) => {
  const { logout } = useAuthStore();
  return (
    <aside
      className={`bg-red-200 text-black w-64 p-4 space-y-4 ${
        isVisible ? "block" : "hidden"
      } lg:block`}
    >
      <NavLink
        to="/"
        className="block p-2 rounded hover:bg-red-600 hover:text-white transition"
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/form"
        className="block p-2 rounded hover:bg-red-600 hover:text-white transition"
      >
        Create Event
      </NavLink>
      <NavLink
        to="/view"
        className="block p-2 rounded hover:bg-red-600 hover:text-white transition"
      >
        View Events
      </NavLink>
      
      <a
        className="block p-2 rounded cursor-pointer hover:bg-red-600 hover:text-white transition"
        onClick={logout}
      >
        Logout
      </a>
    </aside>
  );
};

export default Sidebar;
