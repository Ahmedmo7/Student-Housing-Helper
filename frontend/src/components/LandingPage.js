import React, { useState, useEffect } from 'react';
import {
    Box, Heading, Button, Text, useColorModeValue
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import skyline from "../skyline.jpg";

function LandingPage() {
    const [loading, setLoading] = useState(true);
    const [recentListings, setRecentListings] = useState([]);
    const [filterOptions, setFilterOptions] = useState({ city: '', saleType: '' });

    useEffect(() => {
        const fetchRecentListings = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/listings/?page=1');
                setRecentListings(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recent listings:', error);
            }
        };

        fetchRecentListings();
    }, []);

    // Dynamic color mode value for text color
    const textColor = useColorModeValue("gray.800", "white");

    return (
        <Box
            minHeight="100vh"
            bgImage={`url(${skyline})`}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                maxW="container.md"
                textAlign="center"
                color={textColor}
                p={8}
                bgGradient="linear(to-b, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))"
                borderRadius="lg"
                boxShadow="2xl"
                backdropFilter="blur(10px)" // Frosted glass effect
                border="1px solid rgba(255, 255, 255, 0.2)"
            >
                <Heading as="h1" size="3xl" fontWeight="bold" color="teal.500" mb={6} textShadow="2px 2px 2px rgba(0, 0, 0, 0.2)">
                    Student Housing Helper
                </Heading>
                <Text fontSize="xl" fontWeight="semibold" mb={4} shadow="1px 1px 2px rgba(0, 0, 0, 0.1)">
                    Your Destination for Affordable Rentals
                </Text>
                <Button
                    as={RouterLink}
                    to="/listings"
                    colorScheme="teal"
                    size="lg"
                    mb={8}
                    _hover={{ bg: 'teal.700' }}
                    shadow="md" // Button shadow for depth
                >
                    Explore Listings
                </Button>
                <Text fontSize="lg" mb={4} shadow="1px 1px 2px rgba(0, 0, 0, 0.1)">
                    Looking for a place to stay as a student? We've got you covered. Discover a wide range
                    of affordable rental listings tailored for students.
                </Text>
                <Text fontSize="lg" shadow="1px 1px 2px rgba(0, 0, 0, 0.1)">
                    Create your own listing if you have a room to rent out. It's fast and easy!
                </Text>
            </Box>
        </Box>
    );
}

export default LandingPage;
