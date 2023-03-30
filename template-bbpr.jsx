import React, { useState, useEffect } from 'react';
import openai from 'openai'; // import the ChatGPT API

// create a new instance of the ChatGPT API with your credentials
const chatGPT = new openai.Auth({ 
  api_key: '_API KEY'
}).api();

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // when the component mounts, add a welcome message
    addMessage('Welcome to my chatbot!');
  }, []);

  const addMessage = (text, sender = 'bot') => {
    setMessages(prevMessages => [...prevMessages, { text, sender }]);
  };

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = async event => {
    event.preventDefault();

    // add the user's message to the chat window
    addMessage(inputValue, 'user');

    // generate a response using ChatGPT
    const response = await chatGPT.completions.create({
      prompt: inputValue,
      max_tokens: 50,
      n: 1,
      stop: '\n',
      temperature: 0.7,
    });

    // add the response to the chat window
    addMessage(response.choices[0].text);

    // clear the input field
    setInputValue('');
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index} className={message.sender}>
            {message.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleInputSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;
