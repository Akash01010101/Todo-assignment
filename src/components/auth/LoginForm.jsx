import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (credentials.email && credentials.password) {
        dispatch(loginSuccess({
          name: credentials.email.split('@')[0],
          email: credentials.email
        }));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full space-y-8">
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
        Sign in to DoIt
      </h2>
    </div>
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 bg-gray-800 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            value={credentials.email}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 bg-gray-800 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm text-center">
          {error}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  </div>
</div>

  );
};
export default LoginForm