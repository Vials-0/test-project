import React, { useState, useEffect } from 'react';
import './App.css';

import {
  Header,
  PlaceCard
} from './components';


const App = () => {
  const [places, setPlaces] = useState([]);

  // Get initial places on mount
  useEffect(() => {
    const getInitialPlaces = async () => {
      const response = await fetch('http://localhost:22334/places');
      const res = await response.json();
      setPlaces(res.result)
    }

    getInitialPlaces();
  }, []);

  return (
    <div className='App'>
      <Header />
      <section className='card-container'>
        {places.map((place, index) => {
          return <PlaceCard
            key={place.id}
            place={place}
          />
        })}
      </section>
    </div>
  );
}

export default App;
