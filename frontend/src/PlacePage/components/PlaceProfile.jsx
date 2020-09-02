import React from 'react';
import './PlaceProfile.css';
import { Link, useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import PhoneIcon from '@material-ui/icons/Phone';
import BusinessIcon from '@material-ui/icons/Business';
import WebIcon from '@material-ui/icons/Web';
import { green } from '@material-ui/core/colors';
import { default as YesIcon } from '@material-ui/icons/CheckCircle';
import { default as NoIcon } from '@material-ui/icons/Cancel';

const PlaceProfile = ({ place }) => {
    const history = useHistory();

    const handleDelete = () => {
        const deletePlace = async () => {
            const response = await fetch(`http://localhost:22334/place/${place.id}`, { method: "DELETE" });
            const res = await response.json();
            history.push(`/`);
        }

        deletePlace();
    }

    const handleHome = () => {
        history.push('/')
    }

    return (
        <div className='container'>
            <img src={place.imageUrl} className='profile-image' />
            <div className='profile-info-container'>
                <h1>{place.name}</h1>
                <h2 style={{ textAlign: 'center', fontFamily: 'Arial' }}>{place.description}</h2>
                <h3 className='headers'>Store Info:</h3>
                <div className='details-container'>
                    <BusinessIcon />
                    <p className='details-text'>{place.address}</p>
                </div>
                <div className='details-container'>
                    <PhoneIcon />
                    <p className='details-text'>{place.phone}</p>
                </div>
                <div className='details-container'>
                    <WebIcon />
                    <a href={`https://${place.website}`} className='details-text link'>{place.website}</a>
                </div>
                <h3 className='headers'>Mask Info:</h3>
                <div className='details-container'>
                    <p>Masks required for customers:</p>
                    {place.requireCustomerMask
                        ? <YesIcon className='yes-no-icon' style={{ color: green[500], fontSize: 32 }} />
                        : <NoIcon className='yes-no-icon' style={{ fontSize: 32 }} />
                    }
                </div>
                <div className='details-container'>
                    <p>Masks required for employees:</p>
                    {place.requireEmployeeMask
                        ? <YesIcon className='yes-no-icon' style={{ color: green[500], fontSize: 32 }} />
                        : <NoIcon className='yes-no-icon' style={{ fontSize: 32 }} />
                    }
                </div>
            </div>
            <div className='delete-container'>
                <Button size="large" color='primary' onClick={handleHome}>
                    Go Back
                </Button>
                <Button size="large" color='secondary' onClick={handleDelete}>
                    Delete Place
                </Button>
            </div>
        </div >
    )
}

export default PlaceProfile;