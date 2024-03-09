// errorHandler.js

const sendErrorToServer = (errorMessage) => {
    console.log(errorMessage);
    fetch('http://localhost:3000/server', {
      method: 'POST',
      body: JSON.stringify({ error: errorMessage })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send error to server');
      }
      console.log('Error sent to server successfully');
    })
    .catch(error => {
      console.error('Error sending error to server:', error);
    });
  };
  
  const handleError = () => {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (args[0].includes('[hmr]')) {
        console.log('HMR error detected:', args[0]);
        if (args[0]) {
          sendErrorToServer(args[0]);
          console.log('yes error was here');
        } else {
          sendErrorToServer('No Error Was Detected');
        }
        console.log(args[0]);
      } else {
        originalConsoleError(...args);
      }
    };
  
    window.onerror = function(message, source, lineno, colno, error) {
      const errorMessage = {
        message,
        source,
        lineno,
        colno,
        error: error ? error.toString() : null
      };
      console.log('Error generated:', errorMessage);
  
      if (errorMessage !== '') {
        sendErrorToServer(errorMessage);
        console.log('yes error was here');
      } else {
        sendErrorToServer('No Error Was Detected');
      }
    };
  };
  
  module.exports =  handleError ;
  
