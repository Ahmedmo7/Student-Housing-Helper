import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Link as ChakraLink,
    Text,
} from '@chakra-ui/react';
import { signup } from '../auth/auth';
import { setAlert } from '../auth/alert';

const SignUp = ({ isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            setAlert('Passwords do not match', 'error');
        } else {
            try {
                const success = await signup({ name, email, password, password2 });

                if (success) {
                    setAlert('Registration successful', 'success');
                    return <Navigate to='/listings' />;
                }
            } catch (error) {
                setAlert('Registration failed. Please try again.', 'error');
            }
        }
    };

    if (isAuthenticated) {
        return <Navigate to='/' />;
    }

    return (
        <Box maxW="400px" m="auto" mt="8" p="6" borderWidth="1px" borderRadius="lg">
            <Helmet>
                <title>Realest Estate - Sign Up</title>
                <meta name='description' content='sign up page' />
            </Helmet>
            <Heading as='h1' mb='4' textAlign='center'>
                Sign Up
            </Heading>
            <form onSubmit={onSubmit}>
                <FormControl mb='4' isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type='text' name='name' value={name} onChange={onChange} placeholder='Enter your name' />
                </FormControl>
                <FormControl mb='4' isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type='email' name='email' value={email} onChange={onChange} placeholder='Enter your email' />
                </FormControl>
                <FormControl mb='4' isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type='password'
                        name='password'
                        value={password}
                        onChange={onChange}
                        placeholder='Enter your password'
                        minLength='6'
                    />
                </FormControl>
                <FormControl mb='4' isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        type='password'
                        name='password2'
                        value={password2}
                        onChange={onChange}
                        placeholder='Confirm your password'
                        minLength='6'
                    />
                </FormControl>
                <Button type='submit' colorScheme='teal' width='full'>
                    Register
                </Button>
            </form>
            <Text mt='4' textAlign='center'>
                Already have an account?{' '}
                <ChakraLink as={Link} to='/login' color='teal.500'>
                    Sign In
                </ChakraLink>
            </Text>
        </Box>
    );
};

SignUp.propTypes = {
    isAuthenticated: PropTypes.bool,
};

export default SignUp;
