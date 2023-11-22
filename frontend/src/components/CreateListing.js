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
    });
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:8000/listings/', formData)
            .then(() => {
                const message = 'Listing created successfully.';
                setConfirmationMessage(message);
                // Clear the form (optional)
                setFormData({
                    title: '',
                    description: '',
                    price: 0,
                });
            })
            .catch((error) => {
                console.error('Error creating listing:', error);
            });
    };

    return (
        <Box mt={5} p={5}>
            <Heading as="h2" size="xl" textAlign="center">
                Create a New Listing
            </Heading>
            {confirmationMessage && (
                <Center mt={3}>
                    <Text color="green">{confirmationMessage}</Text>
                </Center>
            )}
            <form onSubmit={handleSubmit}>
                <FormControl mt={5}>
                    <FormLabel>Title:</FormLabel>
                    <Input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={5}>
                    <FormLabel>Description:</FormLabel>
                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl mt={5}>
                    <FormLabel>Price:</FormLabel>
                    <Input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
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
