# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from typing import Optional
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware
import uuid  # Import the uuid module to generate custom IDs

app = FastAPI()

# Define CORS settings
origins = ["*"]  # You can replace "*" with specific origins for security

# Add CORS middleware to your app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Connect to the MongoDB database
client = MongoClient("mongodb://localhost:27017/")
db = client["student_rentals"]
collection = db["rental_listings"]

# Define a Pydantic model for a rental listing with an 'id' field
class RentalListing(BaseModel):
    id: Optional[str]  # Use a custom ID
    title: str
    description: str
    price: float

@app.post("/listings/", response_model=RentalListing)
def create_listing(listing: RentalListing):
    # Remove the 'id' field from the input data, let the server generate it
    listing_dict = listing.dict(exclude={"id"})
    # Generate a custom ID using uuid
    custom_id = str(uuid.uuid4())
    # Add the custom ID to the dictionary
    listing_dict["id"] = custom_id

    # Insert the listing into MongoDB with the custom ID
    result = collection.insert_one(listing_dict)

    if not result.acknowledged:
        raise HTTPException(status_code=500, detail="Failed to create listing")

    # Return the newly created listing with the custom ID
    return listing_dict


# Retrieve a specific rental listing by ID
@app.get("/listings/{listing_id}/", response_model=RentalListing)
def read_listing(listing_id: str):
    # Retrieve the specific rental listing by custom ID
    listing = collection.find_one({"id": listing_id})

    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    return listing

# Retrieve all rental listings
@app.get("/listings/", response_model=list[RentalListing])
def read_listings(skip: int = 0, limit: int = 10):
    listings = collection.find().skip(skip).limit(limit)
    return list(listings)  # Return as a list, not a cursor

# Update a rental listing by ID
@app.put("/listings/{listing_id}/", response_model=RentalListing)
def update_listing(listing_id: str, updated_listing: RentalListing):
    # Update the rental listing by custom ID
    result = collection.update_one({"id": listing_id}, {"$set": updated_listing.dict()})

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Listing not found")

    # Return the updated listing
    return updated_listing

# Delete a rental listing by ID
@app.delete("/listings/delete_listing/{listing_id}")
def delete_listing(listing_id: str):
    # Delete the rental listing by custom ID
    result = collection.delete_one({"id": str(listing_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Listing not found")

    return {"message": "Listing deleted"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
