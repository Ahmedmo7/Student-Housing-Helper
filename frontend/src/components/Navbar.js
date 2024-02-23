// Navbar.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Flex,
    Text,
    Link,
    Button,
    IconButton,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
    const { toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue('white', 'gray.800');
    const color = useColorModeValue('gray.800', 'white');

    return (
        <Box
            as="nav"
            boxShadow="md"
            position="sticky"
            top="0"
            zIndex="sticky"
            bg={bgColor}
            color={color}
        >
            <Flex
                align="center"
                justify="space-between"
                maxW="container.xl"
                mx="auto"
                p="4"
            >
                <Text fontWeight="bold" fontSize="lg">
                    <Link as={RouterLink} to="/" color="teal.500">
                        Student Housing Helper
                    </Link>
                </Text>

                <Flex align="center">
                    <Box>
                        <Link as={RouterLink} to="/listings" mr="4" _hover={{ textDecoration: 'none', color: 'teal.500' }}>
                            Listings
                        </Link>
                        {/* Add more navigation links as needed */}
                    </Box>

                    {/* <IconButton
                        icon={<FaSun />}
                        onClick={toggleColorMode}
                        variant="ghost"
                        fontSize="20px"
                    />

                    <IconButton
                        icon={<FaMoon />}
                        onClick={toggleColorMode}
                        variant="ghost"
                        fontSize="20px"
                    /> */}

                    {/* Add user authentication and profile button */}
                    <Link as={RouterLink} to="/signup" mr="4" _hover={{ textDecoration: 'none', color: 'teal.500' }}>
                        <Button ml="4" colorScheme="teal" variant="outline">
                            Sign Up
                        </Button>
                    </Link>
                    <Link as={RouterLink} to="/login" mr="4" _hover={{ textDecoration: 'none', color: 'teal.500' }}>
                        <Button ml="4" colorScheme="teal" variant="outline">
                            Log In
                        </Button>
                    </Link>


                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;
