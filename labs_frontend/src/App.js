import React, { useEffect, useState } from 'react';
import './App.css';
import '@fontsource/roboto/400.css';

import { Button, Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, IconButton, Dialog } from '@mui/material'

import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });
const themes = [lightTheme, darkTheme];

async function fetchPredictions(data, url) {
  let method = "POST"
  let body = JSON.stringify({data: data})
  return fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: body,
    }).then((res) => res.json())
      .then((data) => {
        console.log(data)
        return data;
      })
      .catch((err) => console.log(err));
}

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
        const words = await fetchPredictions(input, url);
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
    }, 500);
  }, [input, isTyping, settingsOpen]);

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


  return (
    <ThemeProvider theme={themes[theme_id]}>
      <CssBaseline />
      <Grid
        className="App"
        container
        direction="column"
        justifyContent="space-between"
        // alignItems="center"
        // alignContent="center"
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
        <LabSelector />
        {loadingWords || predictedWords[labNumber].length === 0 ? (
          <Grid item sx={{width: 3/4}}>
            <Button margin={5} fullWidth variant="contained" color="primary" disabled style={{backgroundColor: 'white'}}>
              No predictions received
            </Button>
          </Grid>
        ):(
          <React.Fragment>
              {[...predictedWords[labNumber]].map((e, i) => (
                <Grid item sx={{width: 1/predictedWords.length}} key={predictedWords[labNumber][i] + i}>
                  <Button
                    onClick={() => {
                      const word = predictedWords[labNumber][i]
                      const text = input === '' ? word : input + " " + word
                      setInput(text)
                    }}
                    margin={2}
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ textTransform: 'none' }}
                  >
                    {predictedWords[labNumber][i]}
                  </Button>
                </Grid>
            ))}
            </React.Fragment>
        )}
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
        </Grid>

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
