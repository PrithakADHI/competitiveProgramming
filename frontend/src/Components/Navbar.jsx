import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const Navbar = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, points } = useAuth();
  const isLoggedIn = isAuthenticated();

  return (
    <nav className="navbar bg-base-100 sticky top-0 z-[100] flex justify-between items-center p-4 shadow-md">
      {/* Logo */}
      <button
        onClick={() => navigate("/")}
        className="btn btn-ghost text-xl rounded-lg"
      >
        Birendra IT Club
      </button>

      {/* Points & Profile Section */}
      <div className="flex items-center">
        {isLoggedIn && user && (
          <div className="text-lg font-semibold mr-4">Points: {points}</div>
        )}

        {/* User Profile & Dropdown */}
        <div>
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    isLoggedIn && user
                      ? `${API_URL}${user.profilePicture}`
                      : `${API_URL}/uploads/default.png`
                  }
                  alt="Profile"
                />
              </div>
            </button>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {isLoggedIn && user ? (
                <>
                  <li>
                    <button
                      onClick={() => navigate("/profile")}
                      className="text-[1rem]"
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button onClick={logout} className="text-[1rem]">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button
                      onClick={() => navigate("/login")}
                      className="text-[1rem]"
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/register")}
                      className="text-[1rem]"
                    >
                      Register
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
