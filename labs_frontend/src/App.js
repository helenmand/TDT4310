import React, { useEffect, useState } from 'react';
import './App.css';
import '@fontsource/roboto/400.css';

import { Button, Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, IconButton, Dialog, CircularProgress } from '@mui/material'

import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { fetchPredictions } from './api';

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });
const themes = [lightTheme, darkTheme];


const NUM_LABS = 4

function App() {
  const default_url = "http://127.0.0.1:5000/predictions"
  const theme = useTheme();

  const [theme_id, setThemeId] = useState(1);  // 0 = light, 1 = dark

  const [labNumber, setLabNumber] = useState(0);
  const [predictedWords, setPredictedWords] = useState(new Array(NUM_LABS).fill([]));
  const [loadingWords, setLoadingWords] = useState(true);
  const [input, setInput] = useState('');
  const [url, setUrl] = useState(default_url);
  const [apiCalls, setApiCalls] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    async function getPredictions() {
      try {
        setLoadingWords(true);
        const words = await fetchPredictions(input, url, labNumber);
        // check the type of the response, needs to be an array
        if (!Array.isArray(words)) {
          alert("Invalid type of predictions received. Verify the URL:\n" + url)
          return new Array(NUM_LABS).fill([]);
        }
        else {
          setPredictedWords(words);
        }
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

  const LabSelector = () => (
      <FormControl variant="outlined">
        <Select
          id="lab-selector"
          value={labNumber}
          label="Lab number"
          onChange={(e) => setLabNumber(e.target.value)}
        >
          {Array.from(Array(NUM_LABS).keys()).map((e) => (
            <MenuItem value={e} key={e}>Lab {e + 1}</MenuItem>
          ))}
        </Select>
      </FormControl>
  )

  const NextWordButton = ({word}) => (
      <Button
        onClick={() => setInput(input === '' ? word : input + " " + word)}
        variant="contained"
        style={{ textTransform: 'none' }}
      >
        {word}
      </Button>
  )


  return (
    <ThemeProvider theme={themes[theme_id]}>
      <CssBaseline />
      <Grid
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
                      <NextWordButton word={predictedWords[i]} />
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
            <LabSelector/>
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
          <IconButton sx={{ ml: 1 }} onClick={() => setThemeId(theme_id === 0 ? 1 : 0)} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
