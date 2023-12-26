import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Center,
} from '@chakra-ui/react';

function CreateListing() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        bedrooms: 0,
        bathrooms: 0,
        address: '',
        city: '',
        state: '',
        zipcode: '',
        sale_type: 'For Sale',
        home_type: 'House',
        sqft: 0,
        open_house: false,
        photo_main: null,
        // Add other photo fields as needed
    });
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            photo_main: file,
            // Add other photo fields as needed
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        try {
            const response = await axios.post('http://localhost:8000/api/listings/', data);

            if (response.status === 201) {
                const message = 'Listing created successfully.';
                setConfirmationMessage(message);
                // Clear the form (optional)
                setFormData({
                    title: '',
                    description: '',
                    price: 0,
                    bedrooms: 0,
                    bathrooms: 0,
                    address: '',
                    city: '',
                    state: '',
                    zipcode: '',
                    sale_type: 'For Sale',
                    home_type: 'House',
                    sqft: 0,
                    open_house: false,
                    photo_main: null,
                    // Clear other photo fields as needed
                });
            }
        } catch (error) {
            console.error('Error creating listing:', error);
        }
    };

    return (
        <Box mt={5} p={5} maxW="600px" mx="auto" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Heading as="h2" size="xl" textAlign="center">
                Create a New Listing
            </Heading>
            {confirmationMessage && (
                <Center mt={3}>
                    <Text color="green">{confirmationMessage}</Text>
                </Center>
            )}
            <form onSubmit={handleSubmit}>
                <FormControl mt={3}>
                    <FormLabel>Title:</FormLabel>
                    <Input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={3}>
                    <FormLabel>Description:</FormLabel>
                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={3}>
                    <FormLabel>Price:</FormLabel>
                    <Input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={3}>
                    <FormLabel>Bedrooms:</FormLabel>
                    <Input
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={3}>
                    <FormLabel>Bathrooms:</FormLabel>
                    <Input
                        type="number"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={3}>
                    <FormLabel>Address:</FormLabel>
                    <Input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={3}>
                    <FormLabel>City:</FormLabel>
                    <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={3}>
                    <FormLabel>State:</FormLabel>
                    <Input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={3}>
                    <FormLabel>Zipcode:</FormLabel>
                    <Input
                        type="text"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={3}>
                    <FormLabel>Sale Type:</FormLabel>
                    <Input
                        type="text"
                        name="sale_type"
                        value={formData.sale_type}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={3}>
                    <FormLabel>Home Type:</FormLabel>
                    <Input
                        type="text"
                        name="home_type"
                        value={formData.home_type}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={3}>
                    <FormLabel>Square Feet:</FormLabel>
                    <Input
                        type="number"
                        name="sqft"
                        value={formData.sqft}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={3}>
                    <FormLabel>Open House:</FormLabel>
                    <Input
                        type="checkbox"
                        name="open_house"
                        checked={formData.open_house}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={3}>
                    <FormLabel>Main Photo:</FormLabel>
                    <Input
                        type="file"
                        accept="image/*"
                        name="photo_main"
                        onChange={handleFileChange}
                    />
                </FormControl>
                <Center mt={5}>
                    <Button type="submit" colorScheme="teal">
                        Create Listing
                    </Button>
                </Center>
            </form>
        </Box>
    );
}

export default CreateListing;
