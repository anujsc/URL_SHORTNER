import React, { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import Button from './Button';
import Loader from './Loader';
import { useSelector } from "react-redux";
import { queryClient } from "../client";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [customSlug, setCustomSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const shortUrl = await createShortUrl(url, customSlug);
      setShortUrl(shortUrl);
      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
  console.log("Short URL:", shortUrl);

  return (
    <div className="space-y-4">
      {loading && <Loader text="Shortening your URL..." />}
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
      <Button
        onClick={handleSubmit}
        type="submit"
        variant="primary"
        size="lg"
        style={{ width: '100%', borderRadius: '8px' }}
      >
        Shorten URL
      </Button>
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
            <Button
              onClick={handleCopy}
              variant={copied ? "success" : "secondary"}
              size="md"
              style={{ borderRadius: '0 8px 8px 0' }}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
