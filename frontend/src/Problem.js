// React
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom
import CodeEditor from './CodeEditor';
import MarkDownDisplayer from './MarkDownDisplayer';
import VerticalSpace from './Utils';

// Important global variables
const defaultTheme = createTheme();

const Problem = () => {
  // Re-render occurs any time these variables change
  const { name } = useParams();
  const [problem, setProblem] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [solution, setSolution] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/problems/${name}`)
      .then(response => response.json())
      .then(data => {
        setProblem(data);
      })
  }, [name]);

  // Fetches the solution from the backend. Also, toggles the showSolution variable, in order to
  // hide/show the solution when the button is clicked.
  const getSolution = () => {
    if (!showSolution) {
      fetch(`http://localhost:5000/problems/${problem.problem_name}/solution`)
        .then(response => response.json())
        .then(data => {
          setSolution(data.problem_solution);
        })
        .catch(error => {
          console.error("Error fetching solution:", error);
        });
    }
    setShowSolution(!showSolution); // Toggle the showSolution state
  }

  // A callback function that is passed to the CodeEditor component, so that its content can be retrieved and processed
  const processUserSolution = (userSolution) => {
    // TODO: 
    // 1. replace this with some database operation?
    // 2. add input sanitization
    alert("Processing user solution: " + userSolution)
    console.log("Processing user solution: " + userSolution);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <main>

        {/* Hero unit */}
        <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, }}>
          <Container maxWidth="lg">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              {problem.problem_name}
            </Typography>
            
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
              <Button variant="contained" onClick={getSolution}>
                {showSolution ? 'Hide Answer' : 'Show Answer'}
              </Button>
              <Button variant="outlined" href={`/`}>Back to Problem List</Button>
            </Stack>
          </Container>
        </Box>
        {/* End hero unit */}

        <Container maxWidth="lg">

          {/* Code Editor */}
          <Typography variant="h4" align="left" paragraph>Code Editor</Typography>
          <CodeEditor callbackOnEditorContent={processUserSolution} />
          <VerticalSpace />

          <Typography variant="h4" align="left" paragraph>Problem statement</Typography>
          <MarkDownDisplayer markdownContent={problem.problem_description} />
          <VerticalSpace />

          {/* Show answer if the button is clicked i.e the showSolution variable is set */}
          {showSolution && 
            <Typography variant="h4" align="left" paragraph>
              Answer
            </Typography>
          }
          {showSolution && 
            <MarkDownDisplayer markdownContent={solution} />
          }
        </Container>

      </main>      
    </ThemeProvider>
  );
};

export default Problem;
