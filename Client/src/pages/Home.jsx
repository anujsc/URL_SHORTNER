
import UrlForm from '../components/UrlForm'
import { useSelector } from 'react-redux';

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
        <div className="mb-6">
          {!isAuthenticated && (
            <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
              <span className="text-blue-700 font-semibold text-sm sm:text-base">Want to create a <span className="font-bold text-indigo-600">custom link</span>? <span className="text-blue-600">  </span> to unlock this feature!</span>
            </div>
          )}
        </div>
        <UrlForm/>
      </div>
    </div>
  )
}

export default HomePage