import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-3">
      
      <div className="w-full max-w-xs">
        
        {/* Back to home */}
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-1 text-xs font-medium
                     text-gray-600 hover:text-gray-900 transition"
        >
          ← Back to home
        </Link>

        {/* Card */}
        <div className="bg-white border rounded-lg shadow-sm p-5">
          
          {/* Header */}
          <div className="mb-4 text-center">
            <h1 className="text-lg font-semibold text-gray-900">
              Sign In
            </h1>
            <p className="mt-0.5 text-xs text-gray-600">
              Access your FrooteX account
            </p>
          </div>

          <form className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 w-full rounded-md border border-gray-300 px-2.5 py-2 text-xs focus:border-green-600 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 w-full rounded-md border border-gray-300 px-2.5 py-2 text-xs focus:border-green-600 focus:ring-green-600"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-green-600 py-2
                         text-xs font-semibold text-white hover:bg-green-700 transition"
            >
              Sign In
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-600">
            New user?{" "}
            <Link to="/signup" className="font-medium text-green-600 hover:text-green-700">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
