import styles from './WelcomeMessage.module.css';
import { useNavigate } from 'react-router-dom';

function WelcomeMessage() {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/signup');
    };


    const token = localStorage.getItem('token');
    return (
        <section className={styles.welcomeMessage__container}>
            <article className={styles.welcomeMessage__message}>
                <h1 className={styles.welcomeMessage__h1}> Bienvenido a PetSitter: Tu Comunidad de Cuidadores de Confianza </h1>
                <p className={styles.welcomeMessage__p}> ¡Explora a nuestros cuidadores, descubre reseñas y encuentra el cuidador perfecto para tu peludo amigo!
                    Regístrate como dueño de mascota o cuidador hoy mismo y únete a nuestra comunidad dedicada a hacer sonreír a las mascotas de todas partes.</p>
                {!token && (
                    <button
                        className={styles.welcomeMessage__registerButton}
                        onClick={handleRegister}
                    >
                        Crear Cuenta
                    </button>
                )}

            </article>

            <article className={styles.welcomeMessage__picture}>
                <img className={styles.welcomeMessage__img} src="homeImg.png" alt="Dog Smiling"></img>
            </article>


        </section>
    )
}

export default WelcomeMessage