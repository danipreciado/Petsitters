import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PetSitterCard from '../PetSitterCard/PetSitterCard';
import NavBar from '../NavBar/NavBar';
import styles from './PetSittersView.module.css'



function PetSittersView() {
  const navigate = useNavigate();

  const handleCardClick = (petSitterId) => {
    
    navigate(`/${petSitterId}`);
  };
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
        <div className={styles.cards__container} >
      <h1>Encuentra a tu Cuidador Ideal</h1>
      <div className={styles.cards__card}>
        {petsitters.map((petsitter) => (
          <PetSitterCard onClick={() => handleCardClick(petsitter._id)} key={petsitter._id} petsitter={petsitter} />
        ))}
      </div>
    </div>
    </>
    
  );
}

export default PetSittersView;