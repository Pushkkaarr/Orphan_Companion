import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [backendMessage, setBackendMessage] = useState('');

  // Fetch data from backend when the button is clicked
  const fetchBackendMessage = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL; // Get backend URL from env variable

    // Call backend API (replace with your actual endpoint)
    fetch(`${backendUrl}/demo`)
      .then((response) => response.json())  // Parse the response as JSON
      .then((data) => {
        // Assuming the backend sends a message property
        setBackendMessage(data.message);  // Set the message in the state
      })
      .catch((error) => {
        console.error('Error fetching from backend:', error);
      });
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={fetchBackendMessage}>Get Backend Message</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <h2>Backend Message:</h2>
        <p>{backendMessage || 'Loading message from backend...'}</p>
      </div>
    </>
  );
}

export default App;
