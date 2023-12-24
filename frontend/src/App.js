import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CodeIcon from '@mui/icons-material/Code';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import ProblemList from './ProblemList';
import Problem from './Problem';

const CustomAppBar = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <CodeIcon sx={{ mr: 2 }} />
        {/* <Button size="small" href={`/`}> */}
          <Typography variant="h6" color="inherit" noWrap>
            ByteCode
          </Typography>
        {/* </Button> */}
      </Toolbar>
    </AppBar>
  );
};

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

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <CustomAppBar />
      <Routes>
        <Route exact path="/" element={<ProblemList />} />
        <Route exact path="/problems/:name" element={<Problem />} />
      </Routes>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
      {/* End footer */}
    </Router>
  );
};

export default App;