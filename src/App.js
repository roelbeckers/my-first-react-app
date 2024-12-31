import React, { useState } from 'react';
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const callBedrock = async () => {
    
    
    setIsLoading(true);
    try {
      const client = new BedrockRuntimeClient({ 
        region: process.env.REACT_APP_AWS_REGION,
        credentials: {
          accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
        }
      });

      console.log('Environment check:', {
        region: process.env.REACT_APP_AWS_REGION,
        hasAccessKey: !!process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        hasSecretKey: !!process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
      });

      const input = {
        modelId: "anthropic.claude-3-haiku-20240307-v1:0",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
          anthropic_version: "bedrock-2023-05-31",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: prompt
            }
          ]
        })
      };

      console.log('Sending request to Bedrock:', input);
      const command = new InvokeModelCommand(input);
      const response = await client.send(command);
      
      // Parse the response
      const responseData = JSON.parse(new TextDecoder().decode(response.body));
      console.log('Response from Bedrock:', responseData);
      setResponse(responseData.content[0].text);
    } catch (error) {
      console.error('Detailed error:', {
        message: error.message,
        name: error.name,
        code: error.code,
        stack: error.stack,
        details: error
      });
      setResponse('Error occurred while calling Bedrock: ' + error.message + ' (Code: ' + error.code + ')');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My First React App with Bedrock</h1>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
          style={{ width: '80%', height: '100px', margin: '20px' }}
        />
        <button 
          onClick={callBedrock}
          disabled={isLoading || !prompt}
          style={{ margin: '20px', padding: '10px 20px' }}
        >
          {isLoading ? 'Processing...' : 'Send to Claude'}
        </button>
        {response && (
          <div style={{ 
            width: '80%', 
            margin: '20px', 
            padding: '20px',
            backgroundColor: '#f0f0f0',
            borderRadius: '5px',
            textAlign: 'left'
          }}>
            <h3>Response:</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{response}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
