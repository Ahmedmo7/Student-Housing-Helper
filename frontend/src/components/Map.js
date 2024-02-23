import { useEffect } from "react";

export default Map = ({ propertyLocations }) => {
    useEffect(() => {
        // Initialize the map
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 0, lng: 0 }, // Set the initial center of the map
            zoom: 2 // Set the initial zoom level
        });

        // Create markers for each property location
        propertyLocations.forEach((location) => {
            const marker = new window.google.maps.Marker({
                position: { lat: location.latitude, lng: location.longitude },
                map: map,
                title: location.title // You can customize the title as needed
            });
        });
    }, [propertyLocations]);

    return <div id="map" style={{ height: '400px', width: '100%' }} />;
};
