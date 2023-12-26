// Card.js
import React from 'react';
import { Box, Image, Text, Badge, Flex } from '@chakra-ui/react';

const Card = ({ title, address, city, state, price, imageUrl, bedrooms, bathrooms, tags }) => {
    return (
        <Box
            maxW="md"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            bg="white"
        >
            <Image src={imageUrl} alt={title} h="200px" objectFit="cover" />

            <Box p="4">
                <Flex justify="space-between" align="center" mb="2">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                        {tags}
                    </Badge>
                    <Text color="gray.500" fontSize="sm">
                        {`${bedrooms} beds • ${bathrooms} baths`}
                    </Text>
                </Flex>

                <Text fontWeight="semibold" fontSize="lg" mb="2" lineHeight="tight" isTruncated>
                    {title}
                </Text>

                <Text fontSize="md" color="gray.700" mb="2">
                    {`${address}, ${city}, ${state}`}
                </Text>

                <Text fontWeight="bold" fontSize="lg" color="teal.500">
                    {`$${price}`}
                </Text>
            </Box>
        </Box>
    );
};

export default Card;
