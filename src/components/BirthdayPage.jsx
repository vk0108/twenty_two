import React, { useState, useEffect } from 'react';
import StarryBackground from './StarryBackground';
import './BirthdayPage.css';

const BirthdayPage = () => {
  const [displayTitle, setDisplayTitle] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const fullTitle = "Happy Birthday Baby";

  useEffect(() => {
    let i = 0;
    const typeWriter = () => {
      if (i < fullTitle.length) {
        setDisplayTitle(fullTitle.slice(0, i + 1));
        i++;
        setTimeout(typeWriter, 150);
      } else {
        setTimeout(() => setShowMessage(true), 800);
      }
    };
    typeWriter();
  }, []);

  return (
    <StarryBackground>
      <div className="birthday-page">
        <div className="birthday-container">
          <h1 className="birthday-title">{displayTitle}</h1>
          {showMessage && (
            <p className="birthday-message">
              Kosh Kutty! Happy 22 CHELLO!❤️ THANK YOU FOR BEING BORN. YOUR EXISTENCE MADE A BEAUTIFUL IMPACT IN MY LIFE. I have made a lot of websites, but this so special to me, you know why? This is the first ever website that I have deployed🥺 and when I know it's for you, it's more than something special. Muah chello, I wish you all the happiness throughout your life.
            </p>
          )}
        </div>
      </div>
    </StarryBackground>
  );
};

export default BirthdayPage;