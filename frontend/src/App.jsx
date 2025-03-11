import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";

import QuizzPage from "./QuizzPage/QuizzPage";
import CreateQuizz from "./CreateQuizz/CreateQuizz";
import Login from "./Login/Login";
import Register from "./Login/Register";
import AdminLogin from "./Login/AdminLogin";
import Admin from "./Admin/Admin";
import User from "./Admin/User";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<QuizzPage />} />
          <Route path="/create" element={<CreateQuizz />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />}></Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/users" element={<User />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
