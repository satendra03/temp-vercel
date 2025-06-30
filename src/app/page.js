"use client";
import { useState } from "react";

export default function Home() {
  const [commitDate, setCommitDate] = useState("");
  const [commitMsg, setCommitMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleCommit = async () => {
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("/api/try", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: commitDate, message: commitMsg })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("✅ 10 commits created successfully!");
      } else {
        setStatus(data.error || "Something went wrong.");
      }
    } catch (err) {
      setStatus("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-blue-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="bg-white/90 dark:bg-gray-900/90 shadow-2xl rounded-3xl p-10 max-w-md w-full flex flex-col items-center border border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 dark:text-blue-300 mb-2 tracking-tight drop-shadow-lg">
          GitHub Commit Maker
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300 text-center mb-8">
          Create 10 fake commits for a specific date and message.<br/>Great for visualizing your GitHub contribution graph!
        </p>
        <div className="w-full flex flex-col gap-4 mb-6">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Commit Date</span>
            <input
              type="date"
              className="rounded-lg border px-3 py-2 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={commitDate}
              onChange={e => setCommitDate(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Commit Message</span>
            <input
              type="text"
              className="rounded-lg border px-3 py-2 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={commitMsg}
              onChange={e => setCommitMsg(e.target.value)}
              placeholder="Your commit message"
            />
          </label>
        </div>
        <button
          onClick={handleCommit}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 text-lg disabled:opacity-60 disabled:cursor-not-allowed w-full"
          disabled={loading || !commitDate || !commitMsg}
        >
          {loading ? "Committing..." : "Make 10 Commits"}
        </button>
        {status && (
          <div className="mt-6 text-center text-base font-medium text-green-600 dark:text-green-400 animate-fade-in">
            {status}
          </div>
        )}
      </div>
      <footer className="mt-10 text-gray-400 text-xs text-center">
        &copy; {new Date().getFullYear()} GitHub Commit Maker
      </footer>
    </div>
  );
}
