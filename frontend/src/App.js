import React, { useState, useEffect } from 'react';
import './App.css';

import {
  Header,
  PlaceCard,
  PlaceForm
} from './components';


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
      </section>
    </div>
  );
}

export default App;
