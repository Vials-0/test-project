import React from 'react';
import './PlaceCard.css';

// Material UI
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { default as YesIcon } from '@material-ui/icons/CheckCircle';
import { default as NoIcon } from '@material-ui/icons/Cancel';

const PlaceCard = ({ place }) => {
    return (
        <Card className='card'>
            <CardContent>
                <h1>{place.name}</h1>
                <p>{place.description}</p>
                <section>
                    <div className='mask-required-container'>
                        <p>Masks required for customers:</p>
                        {place.requireCustomerMask
                            ? <YesIcon className='yes-no-icon' />
                            : <NoIcon className='yes-no-icon' />
                        }
                    </div>
                    <div className='mask-required-container'>
                        <p>Masks required for employees:</p>
                        {place.requireEmployeeMask
                            ? <YesIcon className='yes-no-icon' />
                            : <NoIcon className='yes-no-icon' />
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


