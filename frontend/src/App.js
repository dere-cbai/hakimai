import React, { useState, useEffect } from 'react';
import './styles/main.css';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'true') {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <button id="darkModeToggle" onClick={toggleDarkMode}>
        🌓
      </button>
      <h1>Dinknesh LM<sup>3</sup> AI</h1>
      <p className="subtitle">
        <strong>The most capable Amharic multi-modal model. Coming soon with many other languages!</strong>
      </p>
      <InputSection setOutput={setOutput} />
      <OutputSection output={output} />
    </div>
  );
}

export default App;

