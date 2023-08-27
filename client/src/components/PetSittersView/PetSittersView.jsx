import { useState, useEffect } from 'react';
import PetSitterCard from '../PetSitterCard/PetSitterCard';
import NavBar from '../NavBar/NavBar';



function PetSittersView() {

    const [petsitters, setPetsitters] = useState([]);

    useEffect(() => {
      fetch('http://localhost:8080/petsitters')
        .then((response) => response.json())
        .then((data) => {
          setPetsitters(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);


  return (
    <>
        <NavBar />
        <div className="App">
      <h1>Listado de Cuidadores de Mascotas</h1>
      <div className="card-container">
        {petsitters.map((petsitter) => (
          <PetSitterCard key={petsitter._id} petsitter={petsitter} />
        ))}
      </div>
    </div>
    </>
    
  );
}

export default PetSittersView;