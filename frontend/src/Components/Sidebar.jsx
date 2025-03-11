// Sidebar.jsx
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaQuestionCircle } from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
  return (
    <>
      <aside className="w-64 min-h-screen bg-gray-100 dark:bg-gray-900 p-4 shadow-md">
        <Link to={"/"} className="btn btn-ghost text-xl">
          Birendra IT Club
        </Link>

        <h2 className="text-xl p-4 font-bold text-gray-800 dark:text-white">
          Admin Panel
        </h2>
        <nav>
          <ul className="space-y-4 p-4">
            <li>
              <Link
                to="/admin"
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                <FaTachometerAlt />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                <FaUsers />
                <span>User</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/questions"
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                <FaQuestionCircle />
                <span>Questions</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
