import React, { useEffect, useState } from 'react';
import './App.css';
import '@fontsource/roboto/400.css';

import { Tooltip, Button, Box, Grid, TextField, IconButton, Dialog, Snackbar, Alert } from '@mui/material'

import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { fetchPredictions } from './api';
import { NextWordButton, LabSelector } from './components';
import { WifiTethering, WifiTetheringError } from '@mui/icons-material';

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });
const themes = [lightTheme, darkTheme];


function App() {
  const default_url = "http://127.0.0.1:5000/predictions"
  const theme = useTheme();

  const [theme_id, setThemeId] = useState(1);  // 0 = light, 1 = dark

  const [labNumber, setLabNumber] = useState(0);
  const [predictedWords, setPredictedWords] = useState([]);
  const [loadingWords, setLoadingWords] = useState(true);
  const [input, setInput] = useState('');
  const [url, setUrl] = useState(default_url);
  const [apiCalls, setApiCalls] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPredictions() {
      try {
        setLoadingWords(true);
        const words = await fetchPredictions(input, url, labNumber);
        if (!Array.isArray(words)) {
          setError(`No predictions received. Verify the URL (${url})`)
          return []
        }
        else {
          setError(null);
          setPredictedWords(words);
        }
      }
      catch (e) {
        setError(`Could not connect to server. Verify the URL (${url})`)
      }
      finally {
        setLoadingWords(false);
        setApiCalls(api => api + 1);
      }
    }

    setTimeout(() => {
      if (!isTyping) {
        getPredictions();
      }
    }, 1000);
  }, [input, isTyping, settingsOpen, url, labNumber]);

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
    <ThemeProvider theme={themes[theme_id]}>
      <CssBaseline />
      <Snackbar open={error !== null} autoHideDuration={5000}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>

      {/* show a success popup when there's no longer an error */}
      <Grid
        container
        className="main"
        direction="column"
        justifyContent="space-between"
        style={{ height: "90vh" }}
      >
        <Box padding={1} width={1}>
          <Grid container justifyContent="space-around" alignItems="center" spacing={1}>
              {predictedWords.length === 0 ? (
                <Button disabled>No predictions received</Button>
              ):(
                <React.Fragment>
                  {[...predictedWords].map((_, i) => (
                    <Grid item key={predictedWords[i] + i}>
                      <NextWordButton
                        word={predictedWords[i]}
                        onClick={() => setInput(input === '' ? predictedWords[i] : input + " " + predictedWords[i])}
                      />
                    </Grid>
                  ))}
                </React.Fragment>
              )}
          </Grid>
          <Box marginTop={2} width={1}>
            <TextField
              id="input-field"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              variant='outlined'
              multiline
              fullWidth
            />
          </Box>
          <Box marginTop={2}>
            <LabSelector
              labNumber={labNumber}
              onChange={(e) => setLabNumber(e.target.value)}
            />
          </Box>
        </Box>

        <Grid container justifyContent="center">
          <Button sx={{ ml: 1 }} onClick={() => setSettingsOpen(true)} color="inherit">
            Open API settings
          </Button>
          {settingsOpen && (
            <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)}>
              <Grid container width={1} padding={5} direction="column" justifyContent="center">
                <h1>API info</h1>
                <p>Endpoint URL - verify from the python server</p>
                <TextField
                  id="endpoint-field"
                  value={url}
                  variant='outlined'
                  onChange={(e) => {
                    console.log("changing url:", e.target.value)
                    setUrl(e.target.value)
                  }}
                  placeholder="Endpoint URL - verify from the python server"
                  fullWidth
                />
                <p>calls: {apiCalls}</p>
              </Grid>
            </Dialog>
          )}

          <Tooltip title={`Toggle ${theme_id ? 'eye killer' : 'comfy'} mode`}>
            <IconButton sx={{ ml: 1 }} onClick={() => setThemeId(theme_id === 0 ? 1 : 0)} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          <Tooltip title={error ? "Failed to connect to server" : "Connected to server"}>
            <IconButton color="inherit">
              {error ?
                <WifiTetheringError style={{color: "red"}} />
                :
                <WifiTethering style={{color: "limegreen"}} />
              }
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
