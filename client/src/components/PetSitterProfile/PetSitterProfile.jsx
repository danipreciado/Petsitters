import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './PetSitterProfile.module.css';
import NavBar from '../NavBar/NavBar';

function PetSitterProfile() {
    const { id } = useParams();
    const [petSitter, setPetSitter] = useState();

    const petTypeIcons = {
        'Perros': '../dog-icon.png',
        'Gatos': '../cat-icon.png',
        'Serpientes': '../snake-icon.png',

    }

    useEffect(() => {
        Promise.all([
            fetch(`http://localhost:8080/petsitters/${id}`).then((response) => response.json()),
            fetch(`http://localhost:8080/reviews/${id}`).then((response) => response.json())
        ])
            .then(([petSitterData, reviewsData]) => {
                setPetSitter({ ...petSitterData, reviewsData });
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [id]);

    if (!petSitter) {
        return <p>Loading...</p>;
    }


    return (
        <>
            <NavBar />
            <div className={styles.profile__container}>
                <aside className={styles.profile__card}>
                    <img className={styles.profile__pic} src={petSitter.photoURL} alt={petSitter.name}></img>
                    <div className={styles.profile__card__rating}> <img src='../starIcon.png'></img>{petSitter.averageRating} </div>
                    <p> Tipos de mascotas que cuida: </p>
                    <div className={styles.profile__types}>
                        {petSitter.petsType.map((petType) => (
                            <img
                                key={petType._id}
                                src={petTypeIcons[petType.description]}
                                alt={petType.description}
                                className={styles.profile__typeImg}
                            />
                        ))}
                    </div>
                </aside>
                <section className={styles.profile__info}>
                    <h1 className={styles.profile__name}>{petSitter.name} {petSitter.lastname}</h1>
                    <div className={styles.profile__details}>
                        <p className={styles.profile__detail}><img src='../ageIcon.png'></img> Edad: {petSitter.age}</p>
                        <p className={styles.profile__detail}><img src='../locationIcon.png'></img> Locación: {petSitter.city}, {petSitter.state}</p>
                    </div>

                    <article className={styles.profile__reviewsContainer}>
                        <h2>Reseñas:</h2>
                        {petSitter.reviewsData.map((review) => (
                            <div key={review._id} className={styles.profile__review}>
                                <div className={styles.profile__reviewsIconContainer}><img className={styles.profile__reviewsIcon} src='../comillasIcon.png'></img></div>
                                <p>{review.comments}</p>
                                <div className={styles.profile__reviewsRatingContainer}><p>Rating: {review.rating}</p></div>
                            </div>
                        ))}
                    </article>
                </section>


            </div>
        </>


    );
}

export default PetSitterProfile;
