import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const CreateQuizz = () => {
  const authToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate("/");
    }
  }, [authToken]);

  const [quizzTitle, setQuizzTitle] = useState("");
  const [quizzDesc, setQuizzDesc] = useState("");
  const [quizzImg, setQuizzImg] = useState(null);
  const [awardPoints, setAwardPoints] = useState(0);

  const [question, setQuestion] = useState("");
  const [isCodingQuestion, setIsCodingQuestion] = useState(false);
  const [answer, setAnswer] = useState("");
  const [inputTestCase1, setInputTestCase1] = useState("");
  const [inputTestCase2, setInputTestCase2] = useState("");
  const [outputTestCase1, setOutputTestCase1] = useState("");
  const [outputTestCase2, setOutputTestCase2] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("title", quizzTitle);
    formData.append("desc", quizzDesc);
    formData.append("awardPoints", awardPoints);
    if (quizzImg) formData.append("image", quizzImg);

    const questionData = {
      question,
      isCodingQuestion,
      inputTestCase1,
      outputTestCase1,
      inputTestCase2,
      outputTestCase2,
      answer,
    };

    formData.append("questions", JSON.stringify([questionData]));

    try {
      const response = await axios.post(`${API_URL}/api/quizzes/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("Quizz Created:", response.data);
      setSuccess(true);

      // Reset form
      setQuizzTitle("");
      setQuizzDesc("");
      setAwardPoints(0);
      setQuizzImg(null);
      setQuestion("");
      setIsCodingQuestion(false);
      setAnswer("");
      setInputTestCase1("");
      setInputTestCase2("");
      setOutputTestCase1("");
      setOutputTestCase2("");
    } catch (err) {
      setError("Failed to create quizz. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="w-full max-w-2xl mx-auto card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold mb-6">Create Quizz</h2>

            {error && <p className="text-red-500">{error}</p>}
            {success && (
              <p className="text-green-500">Quizz created successfully!</p>
            )}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Quizz Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Quizz Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Quizz Name"
                  className="input input-bordered w-full"
                  value={quizzTitle}
                  onChange={(e) => setQuizzTitle(e.target.value)}
                  required
                />
              </div>

              {/* Quizz Description */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Quizz Description</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Quizz Description"
                  className="input input-bordered w-full"
                  value={quizzDesc}
                  onChange={(e) => setQuizzDesc(e.target.value)}
                  required
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Points to Award</span>
                </label>
                <input
                  type="number"
                  value={awardPoints}
                  onChange={(e) => setAwardPoints(e.target.value)}
                  required
                  className="input input-bordered w-full"
                />
              </div>

              {/* Quizz Image Upload */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Quizz Image</span>
                </label>
                <br />
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered"
                  onChange={(e) => setQuizzImg(e.target.files[0])}
                />
              </div>

              <hr className="my-6" />

              {/* Question Section */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Question</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Question"
                  className="input input-bordered w-full"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
              </div>

              {/* Toggle for Coding Question */}
              <div className="form-control mt-4 flex flex-row gap-3 items-center">
                <label className="label">
                  <span className="label-text">Is this a coding question?</span>
                </label>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={isCodingQuestion}
                  onChange={(e) => setIsCodingQuestion(e.target.checked)}
                />
              </div>

              {/* Answer */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Answer</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Answer"
                  className="input input-bordered w-full"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                />
              </div>

              {/* Test Cases */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Input Test Case 1</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={inputTestCase1}
                    onChange={(e) => setInputTestCase1(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Output Test Case 1</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={outputTestCase1}
                    onChange={(e) => setOutputTestCase1(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Input Test Case 2</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={inputTestCase2}
                    onChange={(e) => setInputTestCase2(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Output Test Case 2</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={outputTestCase2}
                    onChange={(e) => setOutputTestCase2(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6 flex justify-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Quizz"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateQuizz;
