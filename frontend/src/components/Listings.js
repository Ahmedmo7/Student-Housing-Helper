// Listings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Heading,
    Grid,
    GridItem,
    Input,
    Select,
} from '@chakra-ui/react';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import { Loader } from '@googlemaps/js-api-loader';

const getRandomColor = () => {
    const colors = ['teal', 'blue', 'green', 'purple', 'orange', 'pink'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const loader = new Loader({
    apiKey: "AIzaSyCbyDVvzqaUBoi4CWPXfeuhyZwSI3TkvK8",
    version: "weekly",
});

const Map = ({ propertyLocations, showListings, selectedListing, handleListingClick }) => {
    useEffect(() => {
        loader.load().then(() => {
            const map = new window.google.maps.Map(
                document.getElementById('map'),
                {
                    center: { lat: 0, lng: 0 },
                    zoom: 2,
                    streetViewControl: false,
                    fullscreenControl: false,
                }
            );

            propertyLocations.forEach((location) => {
                const marker = new window.google.maps.Marker({
                    position: {
                        lat: location.latitude,
                        lng: location.longitude,
                    },
                    map,
                    title: location.title,
                });

                marker.addListener('click', () => {
                    if (selectedListing) {
                        selectedListing.marker.setAnimation(null);
                    }
                    marker.setAnimation(window.google.maps.Animation.BOUNCE);
                    map.setCenter({ lat: location.latitude, lng: location.longitude });
                    handleListingClick(location);
                });

                location.marker = marker;
            });

            // If there's a selected listing, focus on it
            if (selectedListing) {
                map.setCenter({
                    lat: selectedListing.latitude,
                    lng: selectedListing.longitude,
                });
                selectedListing.marker.setAnimation(window.google.maps.Animation.BOUNCE);
            }
        });
    }, [propertyLocations, selectedListing]);

    return (
        <Box
            display="flex"
            height="100vh"
            width="100%"
            position="absolute"
            zIndex={0}
        >
            <Box
                id="map"
                flex="7"
                style={{
                    position: 'relative',
                    padding: '20px',
                    borderRight: '1px solid #ccc',
                }}
            />
            {showListings && (
                <Box
                    flex="3"
                    overflowY="auto"
                    padding="20px"
                    backgroundColor="white"
                    boxShadow="md"
                >
                    <Heading as="h1" size="xl" mb={4} color="teal.500">
                        Student Housing Listings
                    </Heading>
                    <Grid
                        templateColumns={{
                            base: 'repeat(1, 1fr)',
                            md: 'repeat(auto-fill, minmax(300px, 1fr))',
                        }}
                        gap={8}
                        p={4}
                    >
                        {propertyLocations.map((listing, index) => (
                            <GridItem key={index}>
                                <Card
                                    imageUrl={`https://via.placeholder.com/300/${getRandomColor()}`}
                                    title={listing.title}
                                    address={listing.address}
                                    price={listing.price}
                                    sale_type={listing.sale_type}
                                    home_type={listing.home_type}
                                    bedrooms={listing.bedrooms}
                                    bathrooms={listing.bathrooms}
                                    sqft={listing.sqft}
                                    onClick={() => handleListingClick(listing)}
                                />
                            </GridItem>
                        ))}
                    </Grid>
                    <Pagination
                        itemsPerPage={3}
                        count={propertyLocations.length}
                        visitPage={() => { }}
                        previous={() => { }}
                        next={() => { }}
                        active={1}
                        setActive={() => { }}
                    />
                </Box>
            )}
        </Box>
    );
};

const Listings = () => {
    const [showListings, setShowListings] = useState(true);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/listings/');
            const locations = res.data.results.map((listing) => ({
                title: listing.title,
                address: listing.address,
                price: listing.price,
                sale_type: listing.sale_type,
                home_type: listing.home_type,
                bedrooms: listing.bedrooms,
                bathrooms: listing.bathrooms,
                sqft: listing.sqft,
                latitude: listing.latitude,
                longitude: listing.longitude,
            }));
            setFilteredLocations(locations);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    const handleListingClick = (listing) => {
        if (selectedListing) {
            selectedListing.marker.setAnimation(null);
        }
        setSelectedListing(listing);
        setShowListings(false);
        if (listing.marker) {
            listing.marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
    };

    const handleSearch = (query) => {
        const lowercaseQuery = query.toLowerCase();
        const filtered = filteredLocations.filter((location) =>
            location.title.toLowerCase().includes(lowercaseQuery) ||
            location.address.toLowerCase().includes(lowercaseQuery)
        );
        setFilteredLocations(filtered);
    };

    const handleFilterChange = (event) => {
        const selectedFilter = event.target.value;
        const filtered = filteredLocations.filter((location) =>
            selectedFilter === 'all' ? true : location.sale_type === selectedFilter
        );
        setFilteredLocations(filtered);
    };

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                padding="1rem"
                backgroundColor="#f1f1f1"
                borderBottom="1px solid #ccc"
            >
                <Input
                    placeholder="Search..."
                    onChange={(e) => handleSearch(e.target.value)}
                    marginRight="1rem"
                    bgColor={selectedListing ? getRandomColor() : 'white'}
                    color={selectedListing ? 'white' : 'teal.500'}
                />
                <Select
                    placeholder="Filter..."
                    onChange={handleFilterChange}
                    ml={4}
                >
                    <option value="all">All</option>
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                </Select>
            </Box>
            <Map
                propertyLocations={filteredLocations}
                showListings={showListings}
                selectedListing={selectedListing}
                handleListingClick={handleListingClick}
            />
        </>
    );
};

export default Listings;
