"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [openWeeks, setOpenWeeks] = useState({}); // store which weeks are open

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then(setQuestions);
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;

      await fetch(`/api/questions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-600 text-white";
      case "medium":
        return "bg-yellow-500 text-black";
      case "hard":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  // Group questions by week
  const groupedByWeek = questions.reduce((acc, q) => {
    if (!acc[q.week]) acc[q.week] = [];
    acc[q.week].push(q);
    return acc;
  }, {});

  const toggleWeek = (week) => {
    setOpenWeeks((prev) => ({ ...prev, [week]: !prev[week] }));
  };

  return (
    <main className="p-8 bg-gray-900 min-h-screen font-sans text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-white">📘 My DSA Sheet</h1>

      {Object.keys(groupedByWeek).length === 0 && (
        <p className="text-gray-400">Loading questions...</p>
      )}

      {Object.entries(groupedByWeek).map(([week, weekQuestions]) => (
        <div
          key={week}
          className="mb-4 border border-gray-700 rounded-lg overflow-hidden bg-gray-800"
        >
          {/* Week Header */}
          <button
            onClick={() => toggleWeek(week)}
            className="w-full flex justify-between items-center px-5 py-3 bg-gray-700 text-left hover:bg-gray-600 transition-all"
          >
            <span className="text-lg font-semibold text-white">📅 Week : {week}</span>
            <span className="text-xl text-gray-300">
              {openWeeks[week] ? "▾" : "▸"}
            </span>
          </button>

          {/* Questions Table (Dropdown) */}
          {openWeeks[week] && (
            <table className="w-full border-t border-gray-700">
              <thead className="bg-gray-700 text-gray-200">
                <tr>
                  <th className="p-3 text-left">Topic</th>
                  <th className="p-3 text-left">Question</th>
                  <th className="p-3 text-left">Difficulty</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {weekQuestions.map((q) => (
                  <tr
                    key={q.id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
                  >
                    <td className="p-3">{q.topic}</td>
                    <td className="p-3">
                      <a
                        href={q.question_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {q.question_title}
                      </a>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(
                          q.difficulty
                        )}`}
                      >
                        {q.difficulty}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={q.status}
                        onChange={() => toggleStatus(q.id, q.status)}
                        className="w-5 h-5 accent-blue-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </main>
  );
}
