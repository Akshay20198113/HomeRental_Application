import React, { useState, useEffect } from 'react';

const GeolocationComponent = () => {
    const [location, setLocation] = useState(null);
    const [city, setCity] = useState(null);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    fetchCityName(latitude, longitude);
                },
                (error) => {
                    console.error(error);
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser');
        }
    }, []);

    const fetchCityName = async (latitude, longitude) => {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        const data = await response.json();
        if (data.city) {
            setCity(data.city);
        } else {
            console.error('City not found in the response');
        }
    };

    return (
        <div>
            {location ? (
                <div>
                    <p>City: {city ? city : 'Fetching city name...'}</p>
                </div>
            ) : (
                <p>Fetching location...</p>
            )}
        </div>
    );
};

export default GeolocationComponent;
