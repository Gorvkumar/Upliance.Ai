import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Counter from './components/Counter';
import UserForm from './components/UserForm';
import RichTextEditor from './components/RichTextEditor';
import Navbar from './components/Navbar';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500); // Simulating a data fetch delay
  }, []);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 p-8">
        <Navbar />
        <div className="max-w-7xl mx-auto">
          {loading && <Loader />}
          {!loading && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="flex flex-col">
                  <h2 className="text-3xl font-bold mb-6">Interactive Counter</h2>
                  <Counter />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-3xl font-bold mb-6">Rich Text Editor</h2>
                  <RichTextEditor />
                </div>
              </div>

              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">User Profile Form</h2>
                <UserForm />
              </div>
            </>
          )}
        </div>
      </div>
    </Provider>
  );
}

export default App;
