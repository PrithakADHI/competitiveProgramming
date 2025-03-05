import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const Navbar = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="navbar bg-base-100 top-0 z-[100] sticky flex justify-between p-4">
      <a
        onClick={() => navigate("/")}
        className="btn btn-ghost text-xl rounded-lg"
      >
        Birendra IT Club
      </a>

      <div className="ml-auto">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                src={
                  isAuthenticated() && user
                    ? `${API_URL}${user.profilePicture}`
                    : `${API_URL}/uploads/default.png`
                }
                alt=""
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {isAuthenticated() ? (
              <>
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <a onClick={logout}>Logout</a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a onClick={() => navigate("/login")}>Login</a>
                </li>
                <li>
                  <a onClick={() => navigate("/register")}>Register</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
