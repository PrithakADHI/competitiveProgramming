import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
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
  Cell,
} from "recharts";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const { user, authToken } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const getColor = (id) => {
    const colors = [
      "#8D0801",
      "#D6FFF6",
      "#231651",
      "#4DCCBD",
      "#2374AB",
      "#FF8484",
      "#001427",
      "#F4D58D",
      "#BF0603",
    ];

    const chosenNumber = id % colors.length;
    return colors[chosenNumber];
  };

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
    <>
      <div className="flex h-screen">
        {/* Sidebar (Fixed Width) */}
        <Sidebar />
        {/* Main Content (Takes Remaining Space) */}
        <div className="flex-1 p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold text-center mb-4 dark:text-gray-200">
            User Points Overview
          </h2>

          {/* Chart */}
          <ResponsiveContainer className={"mx-auto"} height={300}>
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
              <Bar dataKey="points" fill="#4CAF50">
                {users.map((entry, index) => (
                  <Cell key={entry.id} fill={getColor(entry.id)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Users Table */}
          <div className="overflow-x-auto mt-6">
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
                  users.map(
                    ({ id, profilePicture, username, email, points }) => (
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
                        <td className="py-3 px-4 text-sm font-light">
                          {username}
                        </td>
                        <td className="py-3 px-4 text-sm font-light">
                          {email}
                        </td>
                        <td className="py-3 px-4 text-sm font-light">
                          {points}
                        </td>
                      </tr>
                    )
                  )
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
    </>
  );
};

export default Admin;
