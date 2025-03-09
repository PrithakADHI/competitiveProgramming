import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useAuth } from "../Contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
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
        const { data } = await axios.get(`${API_URL}/admin/users`);
        if (data.success) {
          const sortedUsers = data.data.sort((a, b) => b.points - a.points);
          setUsers(sortedUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [API_URL]);

  return (
    <>
      <Navbar />
      <div className="container w-[80%] mx-auto">
        {/* Chart */}
        <div className="my-6">
          <h2 className="text-xl font-semibold text-center mb-4 dark:text-gray-200">
            User Points Overview
          </h2>
          <ResponsiveContainer width="70%" className={"mx-auto"} height={300}>
            <BarChart data={users}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="username" tick={{ fill: "#ccc" }} />
              <YAxis tick={{ fill: "#ccc" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#222",
                  color: "#fff",
                  border: "1px solid #444",
                }}
              />
              <Bar dataKey="points" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border dark:border-gray-600">
            <thead className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
              <tr>
                <th className="py-3 px-4">Profile</th>
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Points</th>
              </tr>
            </thead>
            <tbody className="dark:bg-gray-800 dark:text-gray-300">
              {users.length > 0 ? (
                users.map(({ id, profilePicture, username, email, points }) => (
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
                    <td className="py-3 px-4 text-sm font-light">{points}</td>
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
    </>
  );
};

export default Admin;
