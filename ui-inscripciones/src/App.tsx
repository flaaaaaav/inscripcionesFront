import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/Routes';
import Footer from './components/footer';
import { Box } from '@mui/material';
import DrawerAppBar from './components/NavBar';

const App: React.FC = () => {
  return (
    <Router>
      <DrawerAppBar />
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh', 
        }}
      >
        <Box sx={{ flex: 1 }}>
          <main>
            <AppRoutes />
          </main>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;
