import React, { useEffect, useState } from 'react';
import './App.css';
import '@fontsource/roboto/400.css';

import { Button, Grid, TextField } from '@mui/material'

async function fetchPredictions(data) {
  let url = "http://127.0.0.1:5000/predictions"
  let method = "POST"
  let body = JSON.stringify({data: data})
  return fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: body,
    }).then((res) => res.json())
      .then((data) => {return data;})
      .catch((err) => console.log(err));
}

function App() {
  const default_url = "http://127.0.0.1:5000/predictions"

  const [predictedWords, setPredictedWords] = useState([]);
  const [loadingWords, setLoadingWords] = useState(true);
  const [input, setInput] = useState('');
  const [url, setUrl] = useState(default_url);
  const [apiCalls, setApiCalls] = useState(0);

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    async function getPredictions() {
      try {
        setLoadingWords(true);
        const words = await fetchPredictions(input);
        setPredictedWords(words);
      }
      catch (e) { console.error(e); }
      finally {
        setLoadingWords(false);
        setApiCalls(api => api + 1);
      }
    }

    setTimeout(() => {
      if (!isTyping) {
        getPredictions();
      }
    }, 500);
  }, [input, isTyping]);

  useEffect(() => {
    let typingTimer;
    const doneTyping = () => setIsTyping(false);
    const onTyping = () => {
      clearTimeout(typingTimer);
      setIsTyping(true);
      typingTimer = setTimeout(doneTyping, 500);
    };
    const inputField = document.getElementById('input-field');
    inputField.addEventListener('keydown', onTyping);
    return () => inputField.removeEventListener('keydown', onTyping);
  }, [isTyping]);

  return (
    <Grid
      className="App"
      container
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
      style={{
        height: "90vh",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding={1}
      >
      {loadingWords || predictedWords.length === 0 ? (
        <Grid item sx={{width: 1}}>
          <Button margin={5} fullWidth variant="contained" color="primary" disabled style={{backgroundColor: 'white'}}>
            Waiting for input...
          </Button>
        </Grid>
      ):(
        <React.Fragment>
          {[...predictedWords].map((e, i) => (
              <Grid item sx={{width: 1/predictedWords.length}} key={predictedWords[i] + i}>
                <Button
                  onClick={() => {
                    if (input === '') {
                      setInput(predictedWords[i])
                    } else {
                      setInput(input + " " + predictedWords[i])
                    }
                  }}
                  margin={5}
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ textTransform: 'none' }}
                >
                  {predictedWords[i]}
                </Button>
              </Grid>
          ))}
          </React.Fragment>
      )}
        <TextField
          id="input-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant='outlined'
          multiline
          fullWidth
          style={{
            backgroundColor: 'white',
            borderRadius: 5,
            marginTop: 10,
          }}
        />
      </Grid>
      <br/>
      <br/>
      <Grid width={1} padding={1}>
        <h3>API info</h3>
        <p>Endpoint URL - verify from the python server</p>
        <TextField
          id="endpoint-field"
          value={url}
          variant='outlined'
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Endpoint URL - verify from the python server"
          fullWidth
          style={{
            backgroundColor: '#bbb',
            height: 20,
            justifyContent: 'center',
            borderRadius: 5,
          }}
        />
        <p>calls: {apiCalls}</p>
      </Grid>
    </Grid>
  );
}

export default App;
