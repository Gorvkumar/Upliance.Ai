import { useState } from 'react';

export default function SignIn({ onSignIn }: { onSignIn: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(''); // For error handling

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear any previous error
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    // Email validation (basic check)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email.');
      setLoading(false);
      return;
    }

    // Dummy sign-in logic
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    
    if (email === storedEmail && password === storedPassword) {
      onSignIn(); // Sign in the user if credentials match
    } else {
      setError('Invalid credentials');
    }

    setLoading(false); // Stop loading when done
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
            placeholder="Enter your password"
          />
        </div>

        {/* Display error message */}
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
