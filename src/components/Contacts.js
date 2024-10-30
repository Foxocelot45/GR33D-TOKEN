import React from 'react';
import './Contacts.css';

function Contacts() {
  return (
    <div className="contacts-container">
      <h2>Contacts</h2>
      <p>Retrouvez-nous sur nos réseaux sociaux :</p>
      <div className="social-links">
        <a href="https://x.com/TheGr33dyzClub" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://t.co/e6Z9lyHC2k" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://t.me/+XWXpQfDJoUhmZDlk" target="_blank" rel="noopener noreferrer">Telegram</a>
      </div>
    </div>
  );
}

export default Contacts;
