import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import {
    Container,
    Box,
    SimpleGrid,
    Spinner,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Button,
} from '@chakra-ui/react';
import Card from '../components/Card';
import Pagination from '../components/Pagination';

const Listings = () => {
    const [listings, setListings] = useState([]);
    const [count, setCount] = useState(0);
    const [previous, setPrevious] = useState('');
    const [next, setNext] = useState('');
    const [active, setActive] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/listings/?page=1');

                setListings(res.data.results);
                setCount(res.data.count);
                setPrevious(res.data.previous);
                setNext(res.data.next);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    const displayListings = () => (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
            {listings.map((listing) => (
                <Card
                    key={listing.slug}
                    imageUrl={listing.photo_main}
                    title={listing.title}
                    address={listing.address}
                    city={listing.city}
                    state={listing.state}
                    price={listing.price}
                    sale_type={listing.sale_type}
                    home_type={listing.home_type}
                    bedrooms={listing.bedrooms}
                    bathrooms={listing.bathrooms}
                    sqft={listing.sqft}
                    photo_main={listing.photo_main}
                    slug={listing.slug}
                />
            ))}
        </SimpleGrid>
    );

    const visitPage = (page) => {
        axios
            .get(`http://localhost:8000/api/listings/?page=${page}`)
            .then((res) => {
                setListings(res.data.results);
                setPrevious(res.data.previous);
                setNext(res.data.next);
                setActive(page);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            });
    };

    const previous_number = () => {
        axios
            .get(previous)
            .then((res) => {
                setListings(res.data.results);
                setPrevious(res.data.previous);
                setNext(res.data.next);
                if (previous) setActive(active - 1);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            });
    };

    const next_number = () => {
        axios
            .get(next)
            .then((res) => {
                setListings(res.data.results);
                setPrevious(res.data.previous);
                setNext(res.data.next);
                if (next) setActive(active + 1);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            });
    };

    const handleSearch = () => {
        // Implement your search logic here
        console.log('Searching for:', searchTerm);
    };

    return (
        <Container maxW="container.xl" mt={10}>
            <Helmet>
                <title>Student Housing Helper - Listings</title>
                <meta name="description" content="Listings page" />
            </Helmet>
            <Box as="header" mb={8}>
                <Heading as="h1" size="xl" mb={4}>
                    Student Housing Listings
                </Heading>
                <InputGroup>
                    <Input
                        type="text"
                        placeholder="Search listings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        borderRadius="md"
                        mb={4}
                    />
                    <InputRightElement width="4.5rem">
                        <Button
                            h="full"
                            w="full"
                            colorScheme="teal"
                            borderRadius="md"
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Box>
            <Box as="section" className="listings__listings" mb={8}>
                {loading ? <Spinner size="xl" /> : displayListings()}
            </Box>
            <Box as="section" className="listings__pagination" textAlign="center">
                <Pagination
                    itemsPerPage={3}
                    count={count}
                    visitPage={visitPage}
                    previous={previous_number}
                    next={next_number}
                    active={active}
                    setActive={setActive}
                />
            </Box>
        </Container>
    );
};

export default Listings;
