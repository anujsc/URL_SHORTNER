import React, { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { queryClient } from "../client";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [customSlug, setCustomSlug] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    try {
      const shortUrl = await createShortUrl(url, customSlug);
      setShortUrl(shortUrl);
      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="url"
          className="block text-base font-semibold text-blue-700 mb-2"
        >
          Enter your URL
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-3 text-blue-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.828 14.828a4 4 0 01-5.656-5.656l1.415-1.415a4 4 0 015.657 5.657l-1.415 1.414z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 7h2a2 2 0 012 2v6a2 2 0 01-2 2h-2"
              />
            </svg>
          </span>
          <input
            type="url"
            id="url"
            value={url}
            onInput={(event) => setUrl(event.target.value)}
            placeholder="https://example.com"
            required
            className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-700 bg-white/80 placeholder-gray-400"
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        Shorten URL
      </button>
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      {isAuthenticated && (
        <div className="mt-4">
          <label
            htmlFor="customSlug"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Custom URL (optional)
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(event) => setCustomSlug(event.target.value)}
            placeholder="Enter custom slug"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      {shortUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Your shortened URL:</h2>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 p-2 border border-gray-300 rounded-l-md bg-gray-50"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-r-md transition-colors duration-200 ${
                copied
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
