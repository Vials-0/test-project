import React, { useState, useEffect } from 'react';
import './App.css';

import {
  Header,
  PlaceCard,
  PlaceForm
} from './app-components';


const App = () => {
  const [places, setPlaces] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Get initial places on mount
  useEffect(() => {
    const getInitialPlaces = async () => {
      const response = await fetch('http://localhost:22334/places');
      const res = await response.json();
      setPlaces(res.result)
    }

    getInitialPlaces();
  }, []);

  // Toggle the form and inputs
  const handleToggleForm = (bool) => {
    setShowForm(bool);
  }

  // Re-query all places
  const updatePlaces = () => {
    const refreshPlaces = async () => {
      const response = await fetch('http://localhost:22334/places');
      const res = await response.json();
      setPlaces(res.result)
    }

    refreshPlaces();
  }

  // Used to generate 'fake' elements to ensure
  // flexbox'd grid starts from left and not center
  // when lengths is less than three on that row
  const blankFillSpaces = places.length > 3
    ? (3 - (places.length % 3))
    : 3 - places.length;
  const blankFillArray = new Array(blankFillSpaces).fill('');
  const renderFill = blankFillSpaces < 3;

  return (
    <div className='App'>
      <Header />
      <PlaceForm
        showing={showForm}
        toggleForm={handleToggleForm}
        updatePlaces={updatePlaces}
      />
      <section className='card-container'>
        {places.map((place, index) => {
          return <PlaceCard
            key={place.id}
            place={place}
          />
        })}
        {/* generate empty objects to correct grid */}
        {renderFill && (
          blankFillArray.map(item => {
            return <div className='placeholder-card' />
          })
        )}
      </section>
    </div>
  );
}

export default App;
