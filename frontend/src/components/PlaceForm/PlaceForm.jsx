import React, { useState } from 'react';
import './PlaceForm.css';

// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const PlaceForm = ({ showing, toggleForm, updatePlaces }) => {
    const [place, setPlace] = useState({
        name: '',
        address: '',
        phone: '',
        website: '',
        description: '',
        imageUrl: ''
    })
    const [requireEmployeeMask, setRequireEmployeeMask] = useState(false);
    const [requireCustomerMask, setRequireCustomerMask] = useState(false);

    const submitDisabled = () => {
        return (!place.name
            || !place.address
            || !place.phone
            || !place.website
            || !place.description
            || !place.imageUrl)
    }

    // Curried change handler
    const handleChange = (property) => (event) => {
        setPlace({ ...place, [property]: event.target.value })
    }

    const handleClearPlace = () => {
        setPlace({
            name: '',
            address: '',
            phone: '',
            website: '',
            description: '',
            imageUrl: ''
        });
        setRequireEmployeeMask(false);
        setRequireCustomerMask(false);
    }

    const handleSubmit = () => {
        const submitPost = async () => {
            const placeBody = { ...place, requireEmployeeMask, requireCustomerMask }
            const res = await fetch(
                'http://localhost:22334/place',
                {
                    method: 'POST',
                    body: JSON.stringify({ place: placeBody }),
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            const result = await res.json();

            if (result.success) {
                updatePlaces();
                handleClearPlace();
                toggleForm(false);
            }
            // TODO: Add a message for a failed POST
        }

        submitPost();
    }

    return (

        showing
            ? (
                <div className='place-form-container'>
                    <section className='place-form-section'>
                        <TextField
                            style={{ margin: 10 }}
                            label="Name"
                            fullWidth
                            onChange={handleChange('name')}
                            value={place.name}
                        />
                        <TextField
                            style={{ margin: 10 }}
                            label="Address"
                            fullWidth
                            onChange={handleChange('address')}
                            value={place.address}
                        />
                        <TextField
                            style={{ margin: 10 }}
                            label="Phone"
                            fullWidth
                            onChange={handleChange('phone')}
                            value={place.phone}
                        />
                        <TextField
                            style={{ margin: 10 }}
                            label="Website"
                            fullWidth
                            onChange={handleChange('website')}
                            value={place.website}
                        />
                    </section>
                    <section className='place-form-section'>
                        <TextField
                            label="Description"
                            fullWidth
                            style={{ margin: 10 }}
                            onChange={handleChange('description')}
                            value={place.description}
                        />
                        <TextField
                            style={{ margin: 10 }}
                            label="Image URL"
                            fullWidth
                            onChange={handleChange('imageUrl')}
                            value={place.imageUrl}
                        />
                    </section>
                    <section className='place-form-section'>
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={requireCustomerMask}
                                        name="customer-mask"
                                        onChange={() => {
                                            setRequireCustomerMask(!requireCustomerMask)
                                        }}
                                    />
                                }
                                label="Customer Masks Required"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={requireEmployeeMask}
                                        name="employee-mask"
                                        onChange={() => {
                                            setRequireEmployeeMask(!requireEmployeeMask)
                                        }}
                                    />
                                }
                                label="Employee Masks Required"
                            />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <Button
                                variant='contained'
                                color='primary'
                                style={{ margin: 10 }}
                                disabled={submitDisabled()}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                            <Button
                                variant='contained'
                                color='secondary'
                                style={{ margin: 10 }}
                                onClick={() => {
                                    toggleForm(false);
                                    handleClearPlace();
                                }}
                            >
                                Cancel
                        </Button>
                        </div>
                    </section>
                </div >
            )
            :
            <div className='create-button-container' onClick={() => toggleForm(true)}>
                <p className='create-text'>Create Place</p>
            </div>
    )
}

export default PlaceForm;