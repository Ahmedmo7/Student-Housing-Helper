// Card.js
import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

const Card = ({
    imageUrl,
    title,
    address,
    price,
    sale_type,
    home_type,
    bedrooms,
    bathrooms,
    sqft,
    onClick,
}) => {
    return (
        <Box
            maxW="md"
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            boxShadow="lg"
            cursor="pointer"
            onClick={onClick}
        >
            <Image src={imageUrl} alt={title} />

            <Box p="4">
                <Text fontSize="xl" fontWeight="semibold">
                    {title}
                </Text>
                <Text color="gray.600" fontSize="sm">
                    {address}
                </Text>
                <Text color="teal.500" fontWeight="bold" mt="2">
                    {price}
                </Text>

                <Box mt="2" display="flex" justifyContent="space-between">
                    <Text color="gray.600" fontSize="sm">
                        {sale_type}
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                        {home_type}
                    </Text>
                </Box>

                <Box mt="2" display="flex" justifyContent="space-between">
                    <Text color="gray.600" fontSize="sm">
                        {bedrooms} Beds
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                        {bathrooms} Baths
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                        {sqft} sqft
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default Card;
