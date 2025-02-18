import React from 'react';
import './Loader.css'; // We'll define the loader's styles here

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
