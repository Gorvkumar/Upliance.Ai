import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { User, Mail, Phone, MapPin, UserCheck } from 'lucide-react';

export default function ResultsSection() {
  const userData = useSelector((state: RootState) => state.user);

  if (!userData) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <User size={48} className="mb-4 opacity-50" />
        <p className="text-lg">No user data available</p>
        <p className="text-sm">Please fill out the form to see results</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
          <UserCheck size={24} className="text-indigo-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">User Profile</h3>
          <p className="text-sm text-gray-500">ID: {userData.id.slice(0, 8)}...</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start">
          <User size={20} className="mr-3 mt-1 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="text-gray-900">{userData.name}</p>
          </div>
        </div>

        <div className="flex items-start">
          <Mail size={20} className="mr-3 mt-1 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-gray-900">{userData.email}</p>
          </div>
        </div>

        <div className="flex items-start">
          <Phone size={20} className="mr-3 mt-1 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-500">Phone</p>
            <p className="text-gray-900">{userData.phone}</p>
          </div>
        </div>

        <div className="flex items-start">
          <MapPin size={20} className="mr-3 mt-1 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-500">Address</p>
            <p className="text-gray-900">{userData.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}