import PropTypes from 'prop-types';
import styles from './PetSitterCard.module.css';

function PetSitterCard({ petsitter, onClick }) {
  return (
    <div className={styles.card__container} onClick={onClick}>
      <div className={styles.card__rating}> <img  src='starIcon.png'></img>{petsitter.averageRating} </div>
      <img className={styles.card__img} src={petsitter.photoURL} alt={petsitter.name} />
      <h2 className={styles.card__name}>{petsitter.name}</h2>
      <p className={styles.card__location}>{`${petsitter.city}, ${petsitter.state}`}</p>
    </div>
  );
}

PetSitterCard.propTypes = {
    petsitter: PropTypes.shape({
      averageRating: PropTypes.number,
      photoURL: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
  };

export default PetSitterCard;
