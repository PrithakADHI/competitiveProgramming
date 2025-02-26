import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";

import QuizzPage from "./QuizzPage/QuizzPage";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<QuizzPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
