import React from 'react';
import './PlaceCard.css';

// Material UI
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { default as YesIcon } from '@material-ui/icons/CheckCircle';
import { default as NoIcon } from '@material-ui/icons/Cancel';

const PlaceCard = ({ place }) => {
    return (
        <Card className='card'>
            {/* TODO: Use background image for similarly-sized images */}
            <img
                className='card-image'
                src={place.imageUrl}
            />
            <CardContent>
                <h1>{place.name}</h1>
                <p>{place.description}</p>
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
                <Button size="small">Show Business Details</Button>
            </CardActions>
        </Card>
    )
}

export default PlaceCard;


