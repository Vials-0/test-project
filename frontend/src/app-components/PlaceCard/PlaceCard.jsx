import React from 'react';
import './PlaceCard.css';
import { Link, useHistory } from "react-router-dom";

// Material UI
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { default as YesIcon } from '@material-ui/icons/CheckCircle';
import { default as NoIcon } from '@material-ui/icons/Cancel';


const PlaceCard = ({ place, fullScreen = false }) => {
    const history = useHistory();

    const handleDelete = () => {
        const deletePlace = async () => {
            const response = await fetch(`http://localhost:22334/place/${place.id}`, { method: "DELETE" });
            const res = await response.json();
            history.push(`/`);
        }

        deletePlace();
    }

    return (
        <Card className={fullScreen ? 'fullscreen-card' : 'card'}>
            {/* TODO: Use background image for similarly-sized images */}
            <img
                className='card-image'
                src={place.imageUrl}
            />
            <CardContent>
                <h1>{place.name}</h1>
                <p>{place.description}</p>
                {fullScreen && (
                    <div className='place-details-container'>
                        <p>{place.address}</p>
                        <p>{place.phone}</p>
                        <p>{place.website}</p>
                    </div>
                )}
                <section>
                    <div className='mask-required-container'>
                        <p>Masks required for customers:</p>
                        {place.requireCustomerMask
                            ? <YesIcon className='yes-no-icon' style={{ color: green[500], fontSize: 32 }} />
                            : <NoIcon className='yes-no-icon' style={{ fontSize: 32 }} />
                        }
                    </div>
                    <div className='mask-required-container'>
                        <p>Masks required for employees:</p>
                        {place.requireEmployeeMask
                            ? <YesIcon className='yes-no-icon' style={{ color: green[500], fontSize: 32 }} />
                            : <NoIcon className='yes-no-icon' style={{ fontSize: 32 }} />
                        }
                    </div>
                </section>
            </CardContent>
            <CardActions>
                {fullScreen
                    ? (
                        // <Link
                        //     to={'/'}
                        //     style={{ textDecoration: 'none' }}
                        //     onClick={handleDelete}
                        // >
                        <Button size="large" color='secondary' onClick={handleDelete}>
                            Delete Place
                        </Button>
                        // </Link>

                    )
                    : (
                        <Link
                            to={`/place/${place.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <Button size="small">
                                Show Business Details
                                    </Button>
                        </Link>
                    )
                }
            </CardActions>
        </Card >
    )
}

export default PlaceCard;


