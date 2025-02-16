// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Import the LandingPage component
// Import other pages if needed, for example:
// import AboutPage from './pages/AboutPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
};

export default App;
