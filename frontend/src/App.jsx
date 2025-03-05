import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";

import QuizzPage from "./QuizzPage/QuizzPage";
import CreateQuizz from "./CreateQuizz/CreateQuizz";
import Login from "./Login/Login";
import Register from "./Login/Register";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<QuizzPage />} />
          <Route path="/create" element={<CreateQuizz />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
