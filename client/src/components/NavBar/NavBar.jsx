import styles from './NavBar.module.css';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem('token'); // Verificar si hay un token

    const handleLogout = () => {
        localStorage.removeItem('token');
    
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login'); // Navega a la ruta de inicio de sesión
    };

    const handleNavigateHome = () => {
        navigate('/'); // Navega a la ruta de inicio de sesión
    };



    return (
        <nav className={styles.navBar}>
            <section className={styles.navBar__logoContainer}>
            <div className={styles.navBar__logo}>
                <img src="logoPetSitters.png" alt="Logo" />
            </div>
            </section>
            
            <section className={styles.navBar__linksContainer}>
                <a className={styles.navBar__links} onClick={handleNavigateHome}>Inicio</a>
                <a className={styles.navBar__links} href="#">Encuentra un cuidador</a>
                {isLoggedIn ? ( // Mostrar el icono de cierre de sesión si el usuario está autenticado
                 <img className={styles.navBar__logoutButton} onClick={handleLogout} src="logoutIcon.png" alt="logout">
                </img>
                ) : (
                 <button className={styles.navBar__loginButton} onClick={handleLogin}>Inicio de Sesión</button>
                )}
            </section>
            
            
        </nav>
    )
}

export default NavBar
