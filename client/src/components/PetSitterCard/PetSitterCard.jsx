import PropTypes from 'prop-types';

function PetSitterCard({ petsitter }) {
  return (
    <div className="cuidador-card">
      <div> <img src='starIcon.png'></img>{petsitter.rating} </div>
      <img src={petsitter.photoURL} alt={petsitter.name} />
      <h2>{petsitter.name}</h2>
      <p>{petsitter.city}</p>
      <p>Rating: {petsitter.rating}</p>
    </div>
  );
}

PetSitterCard.propTypes = {
    petsitter: PropTypes.shape({
      rating: PropTypes.number,
      photoURL: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
    }).isRequired,
  };

export default PetSitterCard;
