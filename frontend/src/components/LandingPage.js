import React, { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Button,
    Link,
    Text,
    SimpleGrid,
    Spinner,
    VStack,
    Image,
    Grid,
    GridItem,
    Select,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

function LandingPage() {
    const [loading, setLoading] = useState(true);
    const [recentListings, setRecentListings] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        city: '',
        saleType: '',
    });

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

    const handleFilterChange = (field, value) => {
        setFilterOptions({
            ...filterOptions,
            [field]: value,
        });
    };

    const filteredListings = recentListings.filter((listing) => {
        return (
            (!filterOptions.city ||
                listing.city.toLowerCase() === filterOptions.city.toLowerCase()) &&
            (!filterOptions.saleType ||
                listing.sale_type.toLowerCase() === filterOptions.saleType.toLowerCase())
        );
    });

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                textAlign="center"
                color="gray.800" // Changed text color to a standard gray
                px={[4, 8]} // Adjusted padding for smaller screens
            >
                <Heading as="h1" size="4xl" mb={4} color="teal.600"> {/* Changed heading color */}
                    Student Housing Helper
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
                    _hover={{ bg: 'teal.600' }}
                >
                    Explore Listings
                </Button>

                <Box mt={12}>
                    <Text fontSize="lg" mb={8}>
                        Looking for a place to stay as a student? We've got you covered. Discover a wide range
                        of affordable rental listings tailored for students.
                    </Text>
                    <Text fontSize="lg">
                        Create your own listing if you have a room to rent out. It's fast and easy!
                    </Text>
                </Box>
            </Box>
            <Box py={8} bg="gray.100">
                <Box maxW="container.xl" mx="auto" px={[4, 8]}> {/* Adjusted padding for smaller screens */}
                    <Heading as="h2" size="xl" mb={6} textAlign="center" color="teal.600">
                        About Our Company
                    </Heading>
                    <Text fontSize="lg" mb={8} color="gray.700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                    </Text>
                </Box>
            </Box>
            <Box py={8} px={[4, 8]}> {/* Adjusted padding for smaller screens */}
                <Heading as="h2" size="xl" mb={6} textAlign="center" color="teal.600">
                    Featured Listings
                </Heading>
                <Grid templateColumns="repeat(12, 1fr)" gap={6} mb={8}>
                    <GridItem colSpan={{ base: 12, md: 6, lg: 3 }}>
                        <Select
                            placeholder="Filter by City"
                            onChange={(e) => handleFilterChange('city', e.target.value)}
                            value={filterOptions.city}
                            borderRadius="md"
                        >
                            <option value="new-york">New York</option>
                            <option value="los-angeles">Los Angeles</option>
                            <option value="chicago">Chicago</option>
                            {/* Add more city options */}
                        </Select>
                    </GridItem>
                    <GridItem colSpan={{ base: 12, md: 6, lg: 3 }}>
                        <Select
                            placeholder="Filter by Sale Type"
                            onChange={(e) => handleFilterChange('saleType', e.target.value)}
                            value={filterOptions.saleType}
                            borderRadius="md"
                        >
                            <option value="for-sale">For Sale</option>
                            <option value="for-rent">For Rent</option>
                        </Select>
                    </GridItem>
                    {/* Add more filter options based on your requirements */}
                </Grid>
                {loading ? (
                    <Spinner size="xl" />
                ) : filteredListings.length > 0 ? (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mb={8}>
                        {filteredListings.map((listing) => (
                            <Box
                                key={listing.id}
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                boxShadow="lg"
                                p={4} // Added padding here
                            >
                                <Image src={listing.photo_main} alt={listing.title} h="200px" objectFit="cover" />
                                <VStack p="4" align="start">
                                    <Heading as="h3" size="md" mb="2" color="teal.800">
                                        {listing.title}
                                    </Heading>
                                    <Text color="gray.600">{listing.address}</Text>
                                    <Text fontWeight="bold" color="teal.500">
                                        ${listing.price}/month
                                    </Text>
                                </VStack>
                            </Box>
                        ))}
                    </SimpleGrid>
                ) : (
                    <Text>No listings match the selected filters.</Text>
                )}
            </Box>

            {/* Filler Section 1 */}
            <Box py={8} bg="gray.200">
                <Box maxW="container.xl" mx="auto" px={[4, 8]}> {/* Adjusted padding for smaller screens */}
                    <Heading as="h2" size="xl" mb={6} textAlign="center" color="teal.600">
                        Discover Local Amenities
                    </Heading>
                    <Text fontSize="lg" mb={8} color="gray.700">
                        Explore nearby restaurants, cafes, and entertainment options to make the most of your student
                        experience.
                    </Text>
                    <Button colorScheme="teal" as={RouterLink} to="/amenities">
                        Explore Amenities
                    </Button>
                </Box>
            </Box>

            {/* Filler Section 2 */}
            <Box py={8}>
                <Heading as="h2" size="xl" mb={6} textAlign="center" color="teal.600">
                    Tips for Students
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8} mb={8} px={[4, 8]}>
                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg" p={4}>
                        <Text fontSize="lg" mb={4} color="gray.600">
                            Tip #1: Start your housing search early to secure the best deals and locations.
                        </Text>
                        <Text fontWeight="bold" color="teal.500">
                            Read More
                        </Text>
                    </Box>
                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg" p={4}>
                        <Text fontSize="lg" mb={4} color="gray.600">
                            Tip #2: Consider your budget and prioritize amenities that matter most to you.
                        </Text>
                        <Text fontWeight="bold" color="teal.500">
                            Read More
                        </Text>
                    </Box>
                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg" p={4}>
                        <Text fontSize="lg" mb={4} color="gray.600">
                            Tip #3: Attend local events and meetups to connect with fellow students in the area.
                        </Text>
                        <Text fontWeight="bold" color="teal.500">
                            Read More
                        </Text>
                    </Box>
                </SimpleGrid>
            </Box>

            {/* Filler Section 3 */}
            <Box py={8} bg="gray.200">
                <Box maxW="container.xl" mx="auto" px={[4, 8]}> {/* Adjusted padding for smaller screens */}
                    <Heading as="h2" size="xl" mb={6} textAlign="center" color="teal.600">
                        Testimonials
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg" p={4}>
                            <Text fontSize="lg" mb={4} color="gray.600">
                                "Student Housing Helper made my search for affordable and comfortable housing a breeze.
                                The listings are detailed, and the platform is easy to navigate."
                            </Text>
                            <Text fontWeight="bold" color="teal.500">
                                - Jane Doe, Student
                            </Text>
                        </Box>
                        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg" p={4}>
                            <Text fontSize="lg" mb={4} color="gray.600">
                                "I found the perfect apartment for my college years through Student Housing Helper.
                                The filters helped me narrow down my choices, and the process was efficient."
                            </Text>
                            <Text fontWeight="bold" color="teal.500">
                                - John Smith, Graduate Student
                            </Text>
                        </Box>
                        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg" p={4}>
                            <Text fontSize="lg" mb={4} color="gray.600">
                                "The 'Explore Listings' feature is my go-to when searching for housing options.
                                The platform provides all the necessary details, making it a valuable resource for students."
                            </Text>
                            <Text fontWeight="bold" color="teal.500">
                                - Emily Johnson, International Student
                            </Text>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Box>

            {/* Filler Section 4 */}
            <Box py={8} px={[4, 8]}> {/* Adjusted padding for smaller screens */}
                <Heading as="h2" size="xl" mb={6} textAlign="center" color="teal.600">
                    Stay Connected
                </Heading>
                <Text fontSize="lg" mb={8} color="gray.700">
                    Follow us on social media to stay updated on the latest housing trends, tips, and new listings.
                </Text>
                <Button colorScheme="facebook" mx={2}>
                    Facebook
                </Button>
                <Button colorScheme="twitter" mx={2}>
                    Twitter
                </Button>
                <Button colorScheme="linkedin" mx={2}>
                    LinkedIn
                </Button>
                <Button colorScheme="instagram" mx={2}>
                    Instagram
                </Button>
            </Box>
        </>
    );
}

export default LandingPage;
