import React, { useState } from 'react';
import SecretKeyPage from './components/SecretKeyPage';
import BirthdayPage from './components/BirthdayPage';
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      {!authenticated ? (
        <SecretKeyPage onAuthenticate={setAuthenticated} />
      ) : (
        <BirthdayPage />
      )}
    </div>
  );
}

export default App;