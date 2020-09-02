import React, { useState } from 'react';
import './PlaceProfile.css';
import { Link, useHistory } from "react-router-dom";

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PhoneIcon from '@material-ui/icons/Phone';
import BusinessIcon from '@material-ui/icons/Business';
import WebIcon from '@material-ui/icons/Web';
import { green } from '@material-ui/core/colors';
import { default as YesIcon } from '@material-ui/icons/CheckCircle';
import { default as NoIcon } from '@material-ui/icons/Cancel';


const PlaceProfile = ({ place }) => {
    const [editMode, setEditMode] = useState(false);
    const [inEditPlace, setInEditPlace] = useState({ ...place });
    const history = useHistory();

    // Curried change handler
    const handleChange = (property) => (event) => {
        setInEditPlace({ ...inEditPlace, [property]: event.target.value })
    }

    const handleChangeCheckbox = (property) => (bool) => {
        setInEditPlace({ ...inEditPlace, [property]: bool })
    }

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

    const handleSubmitEdit = () => {
        const submitEdit = async () => {
            const res = await fetch(
                `http://localhost:22334/place/${place.id}`,
                {
                    method: 'PUT',
                    body: JSON.stringify({ place: inEditPlace }),
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            const result = await res.json();

            if (result.success) {
                history.push('/')
                // TODO: Stay on the profile page
            }
            // TODO: Add a message for a failed PUT
        }

        submitEdit();
    }

    return (
        <div className='container'>
            <img src={place.imageUrl} className='profile-image' />
            <div className='profile-info-container'>
                {editMode
                    ? (
                        <React.Fragment>
                            <TextField
                                style={{ margin: 10 }}
                                label="Name"
                                fullWidth
                                onChange={handleChange('name')}
                                value={inEditPlace.name}
                            />
                            <TextField
                                style={{ margin: 10 }}
                                label="Description"
                                fullWidth
                                onChange={handleChange('description')}
                                value={inEditPlace.description}
                            />
                        </React.Fragment>
                    )
                    : (
                        <React.Fragment>
                            <h1>{place.name}</h1>
                            <h2 style={{ textAlign: 'center', fontFamily: 'Arial' }}>{place.description}</h2>
                        </React.Fragment>
                    )
                }
                <h3 className='headers'>Store Info:</h3>
                {editMode
                    ? (
                        <React.Fragment>
                            <TextField
                                style={{ margin: 10 }}
                                label="Address"
                                fullWidth
                                onChange={handleChange('address')}
                                value={inEditPlace.address}
                            />
                            <TextField
                                style={{ margin: 10 }}
                                label="Phone"
                                fullWidth
                                onChange={handleChange('phone')}
                                value={inEditPlace.phone}
                            />
                            <TextField
                                style={{ margin: 10 }}
                                label="Website"
                                fullWidth
                                onChange={handleChange('website')}
                                value={inEditPlace.website}
                            />
                        </React.Fragment>
                    )
                    : (
                        <React.Fragment>
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
                        </React.Fragment>
                    )
                }
                <h3 className='headers'>Mask Info:</h3>
                {editMode
                    ? (
                        <React.Fragment>
                            <FormControlLabel
                                style={{ width: '100%' }}
                                control={
                                    <Checkbox
                                        checked={inEditPlace.requireCustomerMask}
                                        name="customer-mask-edit"
                                        onChange={() => {
                                            handleChangeCheckbox('requireCustomerMask')(!inEditPlace.requireCustomerMask)
                                        }}
                                    />
                                }
                                label="Customer Masks Required"
                            />
                            <FormControlLabel
                                style={{ width: '100%' }}
                                control={
                                    <Checkbox
                                        checked={inEditPlace.requireEmployeeMask}
                                        name="employee-mask-edit"
                                        onChange={() => {
                                            handleChangeCheckbox('requireEmployeeMask')(!inEditPlace.requireEmployeeMask)
                                        }}
                                    />
                                }
                                label="Employee Masks Required"
                            />
                        </React.Fragment>
                    )
                    : (
                        <React.Fragment>
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
                        </React.Fragment>
                    )
                }

            </div>
            <div className='delete-container'>
                {editMode
                    ? (
                        <React.Fragment>
                            <Button
                                size="large"
                                onClick={() => {
                                    setEditMode(false);
                                    setInEditPlace({ ...place });
                                }}
                            >
                                Cancel Edit
                        </Button>
                            <Button
                                size="large"
                                color='primary'
                                onClick={handleSubmitEdit}
                            >
                                Submit
                        </Button>
                        </React.Fragment>
                    )
                    : (
                        <React.Fragment>
                            <Button size="large" color='primary' onClick={handleHome}>
                                Go Back
                        </Button>
                            <Button size="large" onClick={() => { setEditMode(true) }}>
                                Edit Place
                        </Button>
                            <Button size="large" color='secondary' onClick={handleDelete}>
                                Delete Place
                        </Button>
                        </React.Fragment>
                    )
                }
            </div>
        </div >
    )
}

export default PlaceProfile;