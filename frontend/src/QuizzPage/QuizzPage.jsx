import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "../Components/Navbar";
import Card from "../Components/Card";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL;

const QuizzPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizz, setCurrentQuizz] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const { authToken, updatePoints, user } = useAuth();

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  useEffect(() => {
    const getQuizzes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/quizzes/`);
        setQuizzes(response.data.data);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    getQuizzes();
  }, []);

  const openModal = async (quizz) => {
    try {
      const response = await axios.get(`${API_URL}/api/quizzes/${quizz.id}`);
      setCurrentQuizz(response.data.data);
      setIsModalOpen(true);
      document.body.classList.add("overflow-hidden");
    } catch (error) {
      console.error("Failed to fetch quiz details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentQuizz(null);
    setAnswer("");
    document.body.classList.remove("overflow-hidden");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answer === "") {
      toast.error("Can't submit empty answer.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/check/${currentQuizz.id}`,
        { answer },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (!response.data.success) {
        toast.error("Something went wrong while submitting the answer.");
        return;
      }

      if (response.data.alreadyComplete) {
        toast.error("You have already submitted an answer!");
        return;
      }

      if (response.data.correctAnswer) {
        updatePoints(response.data.points);
        toast.success("Correct Answer!");
        // Update quizzes state with attempted quiz
        setQuizzes((prevQuizzes) =>
          prevQuizzes.map((quizz) =>
            quizz.id === currentQuizz.id
              ? {
                  ...quizz,
                  attempts: [
                    ...quizz.attempts,
                    {
                      userId: user.id,
                      correctAnswer: response.data.correctAnswer,
                    },
                  ],
                }
              : quizz
          )
        );
      } else {
        toast.error("Incorrect Answer.");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      toast.error("Submission failed.");
    }
    closeModal();
  };

  const handleClickOutside = useCallback(
    (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, handleClickOutside]);

  return (
    <>
      <div
        className={`relative transition-all duration-300 ${
          isModalOpen ? "blur-sm" : ""
        }`}
      >
        <Navbar />
        <h1 className="text-3xl font-bold my-8 text-center">Questions</h1>
        <div className="container mx-auto flex justify-center items-center gap-y-2 gap-x-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              <div className="text-center w-full">Loading...</div>
            ) : (
              quizzes.map((quizz) => {
                const hasAttempted = quizz.attempts.some(
                  (attempt) => attempt.userId === user?.id
                );

                return (
                  <div
                    key={quizz.id}
                    onClick={() => !hasAttempted && openModal(quizz)} // Prevent modal from opening if the user has attempted
                    className={`cursor-pointer ${
                      hasAttempted ? "pointer-events-none opacity-50" : ""
                    }`} // Disable interaction and lower opacity
                  >
                    <Card
                      url={quizz.image}
                      title={quizz.title}
                      desc={quizz.desc}
                      done={hasAttempted}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {isModalOpen && currentQuizz && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div
            ref={modalRef}
            className="p-6 rounded-lg shadow-lg w-96 bg-base-200"
          >
            <h2 className="text-xl font-bold mb-4">{currentQuizz.title}</h2>
            <p className="mb-4">{currentQuizz.questions[0].question}</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Your answer..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-secondary rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default QuizzPage;
