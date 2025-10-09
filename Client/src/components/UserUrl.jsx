import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api'

// Determine the public base URL for short links. Prefer a Vite env var, then the
// API URL, and finally fall back to the current origin. This lets the UI show
// and copy the correct deployed host instead of hardcoded localhost.
const BASE_URL = (import.meta.env.VITE_APP_BASE_URL || import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/,'')

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  })
  const [copiedId, setCopiedId] = useState(null)
  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
        Error loading your URLs: {error.message}
      </div>
    )
  }

  if (!urls.urls || urls.urls.length === 0) {
    return (
      <div className="text-center text-gray-500 my-6 p-4 bg-white/60 backdrop-blur-md rounded-xl border border-gray-200 shadow-lg">
        <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        <p className="text-lg font-semibold">No URLs found</p>
        <p className="mt-1">You haven't created any shortened URLs yet.</p>
      </div>
    )
  }

  // ...existing code...
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl mt-8 shadow-2xl overflow-hidden border border-blue-100">
      {/* Desktop Table (hidden on mobile) */}
      <div className="w-full overflow-x-auto hidden sm:block">
        <table className="min-w-full divide-y divide-blue-100 text-xs sm:text-sm">
          <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <tr>
              <th scope="col" className="px-2 sm:px-6 py-3 text-left font-bold text-blue-700 uppercase tracking-wider whitespace-nowrap">
                Original URL
              </th>
              <th scope="col" className="px-2 sm:px-6 py-3 text-left font-bold text-blue-700 uppercase tracking-wider whitespace-nowrap">
                Short URL
              </th>
              <th scope="col" className="px-2 sm:px-6 py-3 text-left font-bold text-blue-700 uppercase tracking-wider whitespace-nowrap">
                Clicks
              </th>
              <th scope="col" className="px-2 sm:px-6 py-3 text-left font-bold text-blue-700 uppercase tracking-wider whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/70 divide-y divide-blue-50">
            {urls.urls.slice().reverse().map((url) => (
              <tr key={url._id} className="hover:bg-blue-50/60 transition">
                <td className="px-2 sm:px-6 py-4 max-w-[120px] sm:max-w-xs truncate">
                  <div className="text-gray-900 truncate">{url.full_url}</div>
                </td>
                <td className="px-2 sm:px-6 py-4 max-w-[120px] sm:max-w-xs truncate">
                  <a
                    href={`${BASE_URL}/${url.short_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-indigo-700 hover:underline break-all font-semibold transition"
                  >
                    {`${BASE_URL}/${url.short_url}`}
                  </a>
                </td>
                <td className="px-2 sm:px-6 py-4">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 shadow">
                    {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
                  </span>
                </td>
                <td className="px-2 sm:px-6 py-4 text-xs sm:text-sm font-medium">
                  <button
                    onClick={() => handleCopy(`${BASE_URL}/${url.short_url}`, url._id)}
                    className={`inline-flex items-center px-3 py-1.5 border border-transparent font-semibold rounded-full shadow-md ${
                      copiedId === url._id
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200`}
                  >
                    {copiedId === url._id ? (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                        </svg>
                        Copy URL
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View (only on mobile) */}
      <div className="sm:hidden flex flex-col gap-4 p-4">
        {urls.urls.slice().reverse().map((url) => (
          <div
            key={url._id}
            className="bg-gradient-to-br from-blue-50/80 via-white/80 to-indigo-50/80 rounded-2xl shadow-xl border border-blue-100 p-4 transition hover:scale-[1.01] hover:shadow-2xl"
          >
            <div className="mb-2">
              <span className="block text-xs text-blue-700 font-bold uppercase">Original URL</span>
              <span className="block text-gray-900 truncate">{url.full_url}</span>
            </div>
            <div className="mb-2">
              <span className="block text-xs text-blue-700 font-bold uppercase">Short URL</span>
              <a
                href={`${BASE_URL}/${url.short_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-indigo-700 hover:underline break-all font-semibold transition"
              >
                {`${BASE_URL}/${url.short_url}`}
              </a>
            </div>
            <div className="mb-2">
              <span className="block text-xs text-blue-700 font-bold uppercase">Clicks</span>
              <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 shadow">
                {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
              </span>
            </div>
            <div>
              <button
                onClick={() => handleCopy(`${BASE_URL}/${url.short_url}`, url._id)}
                className={`inline-flex items-center px-3 py-1.5 border border-transparent font-semibold rounded-full shadow-md ${
                  copiedId === url._id
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200`}
              >
                {copiedId === url._id ? (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                    </svg>
                    Copy URL
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserUrl