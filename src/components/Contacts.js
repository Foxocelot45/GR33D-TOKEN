import React from 'react';
import './Contacts.css';

function Contacts() {
  return (
    <div className="contacts-section">
      <div className="contacts-content">
        <h2>Contacts</h2>
        <p>Follow us on social media :</p>
        <div className="social-links">
          <a href="https://x.com/TheGr33dyzClub" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://t.co/e6Z9lyHC2k" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://t.me/+XWXpQfDJoUhmZDlk" target="_blank" rel="noopener noreferrer">Telegram (French)</a>
          <a href="https://t.me/+WipDE7pBxF41Mzc0" target="_blank" rel="noopener noreferrer">Telegram (English)</a>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
