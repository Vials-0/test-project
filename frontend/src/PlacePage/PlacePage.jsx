import React, { useState, useEffect } from 'react';
import './PlacePage.css';
import { useParams } from "react-router-dom";

import { PlaceCard } from '../app-components';

const PlacePage = (props) => {
    const { id } = useParams();
    const [place, setPlace] = useState(null)

    useEffect(() => {
        const getPlaceById = async () => {
            const response = await fetch(`http://localhost:22334/place/${id}`);
            const res = await response.json();
            setPlace(res.result);
        }

        getPlaceById();
    }, []);

    return (
        <div>
            {place && (
                <PlaceCard
                    place={place}
                    fullScreen={true}
                />
            )}

        </div>
    )
}

export default PlacePage;