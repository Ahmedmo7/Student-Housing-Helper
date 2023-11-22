import React, { useState } from 'react';
import axios from 'axios';

function DeleteListing({ listingId, onConfirmation }) {
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/listings/delete_listing/${listingId}/`)
            .then(() => {
                const message = `Listing ID ${listingId} has been deleted.`;
                console.log("here is listing id")
                setConfirmationMessage(message);
                onConfirmation(message); // Notify parent component
            })
            .catch((error) => {
                console.error('Error deleting listing:', error);
            });
    };

    return (
        <div>
            {confirmationMessage ? (
                <span>{confirmationMessage}</span>
            ) : (
                <button onClick={handleDelete}>Delete Listing</button>
            )}
        </div>
    );
}

export default DeleteListing;
