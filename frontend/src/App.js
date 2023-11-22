import React from 'react';
import Listings from './components/Listings';
import CreateListing from './components/CreateListing';
import LandingPage from './components/LandingPage';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/listings" element={<Listings />} />
          <Route path="/create" element={<CreateListing />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
