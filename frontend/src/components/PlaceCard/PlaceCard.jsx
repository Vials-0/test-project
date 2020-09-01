import React from 'react';
import './PlaceCard.css';

// Material UI
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


const PlaceCard = ({ place }) => {
    return (
        <Card className='card'>
            <CardContent>
                <h1>{place.name}</h1>
                <p>{place.description}</p>
                <p>{place.address}</p>
                <p>{place.phone}</p>
                <p>{place.website}</p>
                <p>Employee Mask: {place.requireEmployeeMask ? "Yes" : 'No'}</p>
                <p>Customer Mask: {place.requireCustomerMask ? "Yes" : 'No'}</p>
            </CardContent>
            <CardActions>
                <Button size="small">Action Button</Button>
            </CardActions>
        </Card>
    )
}

export default PlaceCard;


