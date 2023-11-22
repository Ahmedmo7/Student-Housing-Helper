import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Heading,
    Grid,
    GridItem,
    Text,
    Button,
    Flex,
    Spacer,
    Divider,
    Center,
} from '@chakra-ui/react';
import DeleteListing from './DeleteListing';

function Listings() {
    const [listings, setListings] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:8000/listings/')
            .then((response) => {
                setListings(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching listings:', error);
            });
    }, []);

    const handleDeleteConfirmation = (listingId, confirmationMessage) => {
        if (listingId) {
            setDeleteConfirmation(confirmationMessage);
        }
        axios
            .get('http://localhost:8000/listings/')
            .then((response) => {
                setListings(response.data);
            });
    };

    return (
        <Box mt={5} p={5}>
            <Heading as="h1" size="xl" textAlign="center" mb={5}>
                Welcome to Rental Listings
            </Heading>
            {deleteConfirmation && (
                <Center>
                    <Text color="green" mb={5}>
                        {deleteConfirmation}
                    </Text>
                </Center>
            )}
            <Grid
                templateColumns="repeat(2, 1fr)"
                gap={4}
                justifyContent="center"
                alignItems="center"
            >
                {listings.map((listing) => (
                    <GridItem key={listing.id}>
                        <Box
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            p={5}
                            boxShadow="md"
                        >
                            <Heading as="h2" size="lg">
                                {listing.title}
                            </Heading>
                            <Divider my={2} />
                            <Text fontSize="lg" fontWeight="bold">
                                ${listing.price}
                            </Text>
                            <Text fontSize="md">{listing.description}</Text>
                            <Flex mt={3}>
                                <Spacer />
                                <DeleteListing
                                    listingId={listing.id}
                                    onConfirmation={handleDeleteConfirmation}
                                />
                            </Flex>
                        </Box>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
}

export default Listings;
