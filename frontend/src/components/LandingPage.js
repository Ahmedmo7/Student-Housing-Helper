import React from 'react';
import { Box, Heading, Button, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function LandingPage() {
    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                textAlign="center"
                bgGradient="linear(to-b, teal.500, teal.400)"
                color="white"
                px={4}
            >
                <Heading as="h1" size="4xl" mb={4}>
                    Welcome to Student Housing Helper
                </Heading>
                <Heading as="h2" size="xl" mb={8}>
                    Your Destination for Affordable Rentals
                </Heading>
                <Button
                    as={RouterLink}
                    to="/listings"
                    colorScheme="teal"
                    size="lg"
                    mb={4}
                >
                    Explore Listings
                </Button>
                <Link as={RouterLink} to="/create" fontSize="lg">
                    Create a New Listing
                </Link>
                <Box mt={12}>
                    <p>
                        Looking for a place to stay as a student? We've got you covered.
                        Discover a wide range of affordable rental listings tailored for
                        students.
                    </p>
                    <p>
                        Create your own listing if you have a room to rent out. It's fast and
                        easy!
                    </p>
                </Box>
            </Box>
            <Box py={8}>
                {/* Map container */}
                <div style={{ height: '400px', maxWidth: '800px', margin: '0 auto' }}>
                </div>
            </Box>
        </>
    );
}

export default LandingPage;
