import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);
  const { user, authToken } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (data.success) {
          setUsers(data.data.sort((a, b) => b.points - a.points));
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [API_URL]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Users List
        </h2>

        {/* Users Table */}
        <div className="overflow-x-auto w-full">
          <table className="table table-zebra w-full border dark:border-gray-600">
            <thead className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
              <tr>
                <th className="py-3 px-4">Profile</th>
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="dark:bg-gray-800 dark:text-gray-300">
              {users.length > 0 ? (
                users.map(({ id, profilePicture, username, email }) => (
                  <tr key={id} className="border-b dark:border-gray-600">
                    <td className="py-3 px-4">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={`${API_URL}${profilePicture}`}
                            alt={username}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-light">{username}</td>
                    <td className="py-3 px-4 text-sm font-light">{email}</td>
                    <td className="py-3 px-4 text-sm font-light">
                      <button className="btn bg-orange-700 hover:bg-orange-800">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-4 dark:text-gray-400"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
