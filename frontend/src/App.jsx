import React from "react";

const questions = [
  { id: 1, text: "What is React?" },
  { id: 2, text: "What is JSX?" },
  { id: 3, text: "What are React Hooks?" },
  { id: 4, text: "What is Tailwind CSS?" },
  { id: 5, text: "What is DaisyUI?" },
  { id: 6, text: "What is useEffect used for?" },
];

const App = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <nav className="bg-primary text-white p-4 shadow-lg flex justify-center">
        <h1 className="text-2xl font-bold">BirendraITClub Quizz</h1>
      </nav>
      
      {/* Grid of Cards */}
      <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {questions.map((question) => (
          <div
            key={question.id}
            className="bg-white p-6 rounded-lg shadow-md hover:-translate-y-2 transition-transform duration-300"
          >
            <h2 className="text-lg font-semibold">{question.text}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;