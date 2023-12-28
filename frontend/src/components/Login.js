import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link as ChakraLink, Text } from '@chakra-ui/react';
import { login } from '../auth/auth';
const Login = ({ isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    };
    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <Box maxW="400px" m="auto" mt="8">
            <Helmet>
                <title>Realest Estate - Login</title>
                <meta name="description" content="login page" />
            </Helmet>
            <Heading as="h1" mb="4" textAlign="center">
                Sign In
            </Heading>
            <form onSubmit={(e) => onSubmit(e)}>
                <FormControl mb="4" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Enter your email"
                    />
                </FormControl>
                <FormControl mb="4" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Enter your password"
                        minLength="6"
                    />
                </FormControl>
                <Button type="submit" colorScheme="teal" width="full">
                    Login
                </Button>
            </form>
            <Text mt="4" textAlign="center">
                Don't have an account?{' '}
                <ChakraLink as={Link} to="/signup" color="teal.500">
                    Sign Up
                </ChakraLink>
            </Text>
        </Box>
    );
};

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
};

export default Login;
