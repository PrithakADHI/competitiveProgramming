import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Card from "../Components/Card";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const QuizzPage = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const getQuizzes = async () => {
      const response = await axios.get(`${API_URL}/api/quizzes/`);
      console.log(response.data);
      setQuizzes(response.data.data);
    };

    getQuizzes();
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold my-8 text-center">Questions</h1>
      <div className="container mx-auto flex justify-center items-center gapy-y-2 gap-x-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {quizzes.map((quizz) => (
            <div key={quizz.id}>
              <Card url={quizz.image} title={quizz.title} desc={quizz.desc} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuizzPage;
