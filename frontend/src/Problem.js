import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const Problem = () => {
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <main>

        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {problem.problem_name}
            </Typography>
            
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={getSolution}>
                {showSolution ? 'Hide Answer' : 'Show Answer'}
              </Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
        {/* End hero unit */}

        <Container maxWidth="lg">
          <Typography variant="h4" align="left" paragraph>
            Problem statement
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            {problem.problem_description}
          </Typography>

          <Container sx={{ py: 2 }} maxWidth="md"></Container>

          {showSolution && 
            <Typography variant="h4" align="left" paragraph>
              Answer
            </Typography>
          }
          {showSolution && 
            <Typography variant="h5" align="center" paragraph>
              {solution}
            </Typography>
          }
        </Container>
        </main>      
    </ThemeProvider>
  );
};

export default Problem;

{/* <div>
      <h2>Problem: {problem.problem_name}</h2>
      <div>{problem.problem_description}</div>
      <br />
      <div>
        <button onClick={getSolution}>
          {showSolution ? 'Hide Answer' : 'Show Answer'}
        </button>
      </div>
      {showSolution && <div>Solution: {solution}</div>}
    </div> */}
