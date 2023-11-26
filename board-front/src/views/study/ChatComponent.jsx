import React, { useState } from 'react';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = () => {
    setChatHistory([...chatHistory, { text: message, sender: 'user' }]);
    setMessage('');
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '1100px', width: '700px', margin: 'auto' }}>
      <div style={{ flex: 8, overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: '10px',
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: msg.sender === 'user' ? '#e0f7fa' : '#f5f5f5',
            }}
          >
            <strong>{msg.sender === 'user' ? '나' : '상대방'}</strong>: {msg.text}
          </div>
        ))}
      </div>

      <div style={{ flex: 2, display: 'flex', padding: '10px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: 8, marginRight: '10px' }}
        />
        <button onClick={sendMessage} style={{ flex: 2 }}>
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
