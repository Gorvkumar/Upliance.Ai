import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { UserData } from '../types';
import { User, Mail, Phone, MapPin, Save, AlertTriangle } from 'lucide-react';

export default function UserForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Omit<UserData, 'id'>>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isDirty, setIsDirty] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        const confirmationMessage = "You have unsaved changes. Are you sure you want to leave?";
        e.returnValue = confirmationMessage; // Standard method
        return confirmationMessage; // For some browsers like Safari
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setIsDirty(true);
    setShowSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData: UserData = {
      ...formData,
      id: crypto.randomUUID(),
    };
    dispatch(setUser(userData));
    setIsDirty(false);
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-8 rounded-lg shadow-xl">
      {isDirty && (
        <div className="mb-6 bg-yellow-100 border border-yellow-300 rounded-lg p-4 flex items-center gap-3 shadow-md">
          <AlertTriangle className="text-yellow-500" size={20} />
          <p className="text-yellow-700 text-sm">
            You have unsaved changes. Please save your data before leaving.
          </p>
        </div>
      )}
      
      {showSuccess && (
        <div className="mb-6 bg-green-100 border border-green-300 rounded-lg p-4 flex items-center gap-3 shadow-md">
          <Save className="text-green-500" size={20} />
          <p className="text-green-700 text-sm">
            User data saved successfully!
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
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
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors shadow-sm"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
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
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors shadow-sm"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
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
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors shadow-sm"
            placeholder="+1 (555) 000-0000"
          />
        </div>
        
        <div>
          <label htmlFor="address" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <MapPin size={16} className="mr-2" />
            Address
          </label>
          <textarea
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors shadow-sm"
            placeholder="123 Main St, City, Country"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2"
        >
          <Save size={20} />
          Save Profile
        </button>
      </form>
    </div>
  );
}
