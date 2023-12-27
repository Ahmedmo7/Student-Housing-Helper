import React from 'react';
import Listings from './components/Listings';
import CreateListing from './components/CreateListing';
import LandingPage from './components/LandingPage';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './components/Signup';
import Login from './components/Login';

function App() {
  return (

    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/listings" element={<Listings />} />
          <Route path="/create" element={<CreateListing />} />
          <Route path="/" element={<LandingPage />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
