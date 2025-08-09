import React, { useState, useEffect } from 'react';
import StarryBackground from './StarryBackground';
import './SecretKeyPage.css';

const SecretKeyPage = ({ onAuthenticate }) => {
  const [inputValue, setInputValue] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState('');

  const fullText = "Enter your secret pass key🧚‍♀️";
  const SECRET_KEY = "lemontree2024";

  useEffect(() => {
    let i = 0;
    const typeWriter = () => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
        setTimeout(typeWriter, 80);
      } else {
        setTimeout(() => setShowInput(true), 500);
      }
    };
    typeWriter();
  }, [fullText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue === SECRET_KEY) {
      onAuthenticate(true);
    } else {
      setError('Invalid secret key!');
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <StarryBackground>
      <div className="secret-page">
        <div className="container">
          <h1 className="typewriter-text">{displayText}</h1>
          {showInput && (
            <form onSubmit={handleSubmit} className="secret-form">
              <input
                type="password"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="secret-input"
                placeholder="Type your secret key..."
                autoFocus
              />
              <button type="submit" className="submit-btn">Enter</button>
            </form>
          )}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </StarryBackground>
  );
};

export default SecretKeyPage;