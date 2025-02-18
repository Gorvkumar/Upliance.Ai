import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { UserData } from '../types';
import { User, Mail, Phone, Lock, Save } from 'lucide-react';

export default function SignUp({ onSignUp }: { onSignUp: () => void }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Omit<UserData, 'id' | 'password'>>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [password, setPassword] = useState(''); // New state for password

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      alert('Please enter a password');
      return;
    }
    
    const userData: UserData = {
      ...formData,
      id: crypto.randomUUID(),
      password, // Save password as part of the user data
    };
    dispatch(setUser(userData));
    onSignUp(); // Trigger the onSignUp function after successful registration
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <User size={16} className="mr-2" />
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Mail size={16} className="mr-2" />
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Phone size={16} className="mr-2" />
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Lock size={16} className="mr-2" />
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md"
        >
          <Save size={20} />
          Register
        </button>
      </form>
    </div>
  );
}
