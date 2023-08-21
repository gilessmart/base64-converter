import { useState } from 'react';
import './App.css';
import Utf8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';

export default function App() {
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  function onTextChange(event) {
    const newText = event.target.value;
    setText(newText);
  }

  function onEncodeClick() {
    try {
      const uft8Words = Utf8.parse(text);
      const base64 = Base64.stringify(uft8Words);
      setText(base64);
    }
    catch (error) {
      setErrorMessage(error.message);
    }
  }

  function onDecodeClick() {
    try {
      const uft8Words = Base64.parse(text);
      const decodedText = Utf8.stringify(uft8Words);
      setText(decodedText);
    }
    catch (error) {
      setErrorMessage(error.message);
    }
  }

  function onDismissErrorClick() {
    setErrorMessage(null);
  }

  return (
    <div className='app'>
      <header>
        <h1 className='mainHeading'>Base64 Converter</h1>
        
      </header>

      <p className="subheading">Converts strings to / from base64 encoding</p>

      <main>
        {errorMessage && <div class="notification error" role='alert'>
          <p className='message'>{errorMessage}</p>
          <button className="dismiss" onClick={onDismissErrorClick}>Dismiss</button>
        </div>}

        <textarea className='text-editor' 
                  placeholder='Text to convert'
                  value={text}
                  onChange={onTextChange} />

        <div className="controls">
          <button disabled={text.length === 0} onClick={onEncodeClick}>Encode</button>
          <button disabled={text.length === 0} onClick={onDecodeClick}>Decode</button>
        </div>
      </main>
    </div>
  );
};
