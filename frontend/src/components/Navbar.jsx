import React from "react";
import { useAuthStore } from "../store/authUser";

const Navbar = () => {
  const { user } = useAuthStore();
  return (
    <header className="bg-red-600 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">{"<"}EMS{"/>"}</h1>
      <nav className="space-x-4">
        <a className="text-white hover:bg-red-800 p-2 hover:rounded-md"> Welcome, {user.name}</a>
      </nav>
    </header>
  );
};

export default Navbar;
