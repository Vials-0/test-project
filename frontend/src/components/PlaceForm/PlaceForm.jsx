import React, { useState } from 'react';
import './PlaceForm.css';

// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const PlaceForm = ({ showing, toggleForm, updatePlaces }) => {
    const [place, setPlace] = useState({
        name: '',
        address: '',
        phone: '',
        website: '',
        description: '',
        imageUrl: ''
    })

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
        })
    }

    const handleSubmit = () => {
        const submitPost = async () => {
            const res = await fetch(
                'http://localhost:22334/place',
                {
                    method: 'POST',
                    body: JSON.stringify({ place: place }),
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            const result = await res.json();

            if (result.success) {
                updatePlaces();
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
                            label="Phone Number"
                            fullWidth
                            onChange={handleChange('phone')}
                            value={place.phone}
                        />
                        <TextField
                            style={{ margin: 10 }}
                            label="Website URL"
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
                        <Button
                            variant='contained'
                            color='primary'
                            style={{ width: '15%', margin: 10 }}
                            disabled={submitDisabled()}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                        <Button
                            variant='contained'
                            color='secondary'
                            style={{ width: '15%', margin: 10 }}
                            onClick={() => {
                                toggleForm(false);
                                handleClearPlace();
                            }}
                        >
                            Cancel
                        </Button>
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