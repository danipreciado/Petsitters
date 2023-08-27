import styles from './NavBar.module.css';
import { useNavigate, Link} from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
    
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login');
    };

  /*   const handleNavigateHome = () => {
        navigate('/'); 
    };

    const handleNavigatePetsitters = () => {
        navigate('/petsitters');
    }; */



    return (
        <nav className={styles.navBar}>
            <section className={styles.navBar__logoContainer}>
            <div className={styles.navBar__logo}>
                <img src="logoPetSitters.png" alt="Logo" />
            </div>
            </section>
            
            <section className={styles.navBar__linksContainer}>
            <Link className={styles.navBar__links} to="/">Inicio</Link>
            <Link className={styles.navBar__links} to="/petsitters">Encuentra un cuidador</Link>
                {isLoggedIn ? ( 
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
