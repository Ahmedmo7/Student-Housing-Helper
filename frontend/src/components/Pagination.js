import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Text } from '@chakra-ui/react';

const Pagination = (props) => {
    const getNumbers = () => {
        let numbers = [];
        let itemsPerPage = props.itemsPerPage;
        let pageNumber = 1;

        for (let i = 0; i < props.count; i += itemsPerPage) {
            const page = pageNumber;
            let style = 'pagination__number';
            let content = null;

            if (props.active === page) {
                style = 'pagination__number pagination__number--active';
                content = (
                    <Box key={i} className={style} onClick={() => props.visitPage(page)}>
                        <Text fontWeight="bold" color="teal.500">
                            {pageNumber}
                        </Text>
                    </Box>
                );
            } else {
                content = (
                    <Box key={i} className={style} onClick={() => props.visitPage(page)}>
                        <Text>{pageNumber}</Text>
                    </Box>
                );
            }

            numbers.push(content);
            pageNumber++;
        }

        return numbers;
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center" mt="4">
            <Button
                variant="outline"
                colorScheme="teal"
                onClick={props.previous}
                mr="2"
                disabled={props.active === 1}
            >
                Previous
            </Button>
            {getNumbers()}
            <Button
                variant="outline"
                colorScheme="teal"
                onClick={props.next}
                ml="2"
                disabled={props.active === Math.ceil(props.count / props.itemsPerPage)}
            >
                Next
            </Button>
        </Box>
    );
};

Pagination.propTypes = {
    itemsPerPage: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    visitPage: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
};

export default Pagination;
