import styles from './NavBar.module.css';

function NavBar() {

    return (
        <nav className={styles.navBar}>
            <section className={styles.navBar__logoContainer}>
            <div className={styles.navBar__logo}>
                <img src="logoPetSitters.png" alt="Logo" />
            </div>
            </section>
            
            <section className={styles.navBar__linksContainer}>
                <a className={styles.navBar__links} href="#">Inicio</a>
                <a className={styles.navBar__links} href="#">Encuentra un cuidador</a>
                <button className={styles.navBar__loginButton}>Inicio de Sesión</button>
            </section>
            
            
        </nav>
    )
}

export default NavBar
