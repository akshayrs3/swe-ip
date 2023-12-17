import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CodeIcon from '@mui/icons-material/Code';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// TODO: Should we use Link from router-dom or mui?
import { Link } from 'react-router-dom';
// import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/akshayrs3">
        Akshay
      </Link>{' '}
      {'  /  '}
      <Link color="inherit" href="https://github.com/theAB316">
        Aneesh
      </Link>{' '}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ProblemList () {

  // useState returns a variable, and a function that can modify the variable 
  const [problemTitles, setProblemTitles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000')
      .then(response => response.json())
      .then(data => {
        setProblemTitles(data);
      })
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CodeIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            ByteCode
          </Typography>
        </Toolbar>
      </AppBar>
      <main>

        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Problem List
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Pick any problem below, find the best solution and submit it!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}

          <Grid container spacing={4}>
            {problemTitles.map((problemTitle, index) => (  
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {problemTitle}
                    </Typography>
                    <Typography>
                        {/* TODO: create a new field called one-line-description for each problem and display it here. */}
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href={`/problems/${problemTitle}`}>View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
      {/* End footer */}
      
    </ThemeProvider>
  );
}