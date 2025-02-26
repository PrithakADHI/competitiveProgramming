import React from "react";
import { useAuth } from "../Contexts/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="navbar bg-base-100 top-0 z-[100] sticky">
      <a className="btn btn-ghost text-xl rounded-lg p-4">Birendra IT Club</a>
    </div>
  );
};

export default Navbar;
