import React, { useState } from 'react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    pwd: '',
    role: 'farmer'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Log the request details
    console.log('Attempting to connect to:', 'http://localhost:5000/api/register');
    console.log('Request data:', formData);
    
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Remove credentials if not needed
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.status === 201) {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
      } else {
        setError(`Registration failed: ${data.message}`);
      }
    } catch (err) {
      console.error('Detailed error:', err);
      setError(`Connection error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-1">
              Create Account
            </h1>
            <p className="text-center text-gray-500 mb-8">
              Join our farming community today
            </p>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                  placeholder="Enter your username"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="pwd" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="pwd"
                  name="pwd"
                  type="password"
                  required
                  value={formData.pwd}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                  placeholder="Create a password"
                />
              </div>

              {/* Role Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select your role
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className={`cursor-pointer rounded-lg border p-4 text-center transition-all ${
                      formData.role === 'farmer' 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-600' 
                        : 'border-gray-200 hover:border-emerald-200'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, role: 'farmer' }))}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="farmer"
                      checked={formData.role === 'farmer'}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className="font-medium">Farmer</span>
                  </div>
                  <div 
                    className={`cursor-pointer rounded-lg border p-4 text-center transition-all ${
                      formData.role === 'customer' 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-600' 
                        : 'border-gray-200 hover:border-emerald-200'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, role: 'customer' }))}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="customer"
                      checked={formData.role === 'customer'}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className="font-medium">Customer</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 text-white py-3 px-6 rounded-lg font-medium
                         hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-500/20 
                         transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-50 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;