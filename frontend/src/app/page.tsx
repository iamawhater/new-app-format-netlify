"use client"; // Add this line at the top

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!url) {
      setError("Please enter a YouTube URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/summarize", { url });
      setSummary(response.data.summary);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while summarizing the video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Video Summarizer</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube URL"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleSummarize}
        disabled={loading}
        className={`w-full p-2 rounded ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {summary && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Summary</h2>
          <p className="whitespace-pre-line">{summary}</p>
        </div>
      )}
    </div>
  );
}