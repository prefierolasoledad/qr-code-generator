import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Import the correct component
import './App.css';

function App() {
  // State for storing the user input URL
  const [url, setUrl] = useState('');
  
  // Reference to the QRCodeCanvas
  const qrRef = useRef();

  // Function to update the state when user types in the input
  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  // Function to download QR code as an image
  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png'); // Convert canvas to image URL
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qrcode.png'; // Filename for the downloaded image
    link.click();
  };

  return (
    <section className="App">
      <div className="container">
        <h1>QR Code Generator</h1>

        {/* QR Code Box in between the header and input */}
        <div ref={qrRef} className="qr-box">
          {url && (
            <QRCodeCanvas
              value={url}
              size={200}
              bgColor="#bfa78d" // Set background color to #bfa78d
              fgColor="#000000" // Foreground color (QR code color)
            />
          )}
        </div>

        {/* Input field for user to enter the website URL */}
        <input
          type="text"
          placeholder="Enter website URL"
          value={url}
          onChange={handleInputChange}
          className="input-field"
        />

        {/* Show the URL below the QR code if entered */}
        {url && (
          <p>
            Current URL: <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
          </p>
        )}

        {/* Button to download the QR code */}
        {url && (
          <button onClick={downloadQRCode} className="download-button">
            Download QR Code
          </button>
        )}
      </div>
    </section>
  );
}

export default App;
