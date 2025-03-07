import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const navigate = useNavigate();

  const authToken = localStorage.getItem("accessToken");

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const { accessToken, refreshToken, user } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setUser(user);
      setPoints(user.points);
      navigate("/");
    } catch (error) {
      console.error("Login Failed: ", error.message);
    }
  };

  const register = async (formData) => {
    try {
      await axios.post(`${API_URL}/auth/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("User Successfully Registered.");
      navigate("/login");
    } catch (error) {
      console.error(
        "Registration Failed: ",
        error.response?.data || error.message
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/");
  };

  const refreshToken = async () => {
    try {
      const token = localStorage.getItem("refreshToken");
      const response = await axios.post(`${API_URL}auth/token`, {
        token,
      });

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error) {
      console.error("Failed to refresh token: ", error.response.data);
      logout();
    }
  };

  const authAxios = axios.create();

  authAxios.interceptors.request.use(
    async (config) => {
      let token = localStorage.getItem("accessToken");

      if (!token) {
        token = await refreshToken();
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const isAuthenticated = () => {
    if (localStorage.getItem("accessToken")) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const access = localStorage.getItem("accessToken");
        if (access) {
          const response = await authAxios.get(`${API_URL}/auth/profile`);
          console.log(response.data.user);
          setUser(response.data.user);
          setPoints(response.data.user.points);
        }
      } catch (error) {
        console.error("Error fetching user: ", error.response.data);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updatePoints = (newPoints) => {
    setPoints(newPoints);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        authAxios,
        isAuthenticated,
        points,
        updatePoints,
        authToken,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
