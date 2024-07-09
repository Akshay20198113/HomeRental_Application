import React, { useState, useEffect } from 'react';

const GeolocationComponent = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser');
        }
    }, []);
    return (
        <div>
            {location ? (
                <div>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            ) : (
                <p>Fetching location...</p>
            )}
        </div>
    );
};

export default GeolocationComponent;
