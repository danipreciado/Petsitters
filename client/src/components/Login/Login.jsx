import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
       
        navigate('/');
      } else {
        setError('Verifique su correo electrónico o contraseña');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud', error);
    }
  };

  return (

    <article className={styles.login__Container}>

      <h1 className={styles.login__Title}>Inicio de Sesión</h1>
      <h2 className={styles.login__Subtitle}>
        Ingresa tus credenciales de acceso
      </h2>
      {error && <p className={styles.login__Error}>{error}</p>} 
      <form className={styles.login__Form}>
        <label htmlFor='email' className={styles.login__InputLabel}>Correo Electrónico</label>
        <input
          id='email'
          className={styles.login__Input}
          type='text'
          autoComplete='current-password'
          placeholder='Correo'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label htmlFor="password" className={styles.login__InputLabel}>Contraseña</label>
        <input
          id='password'
          className={styles.login__Input}
          type='password'
          placeholder='Contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        ></input>
      </form>
      <button className={styles.login__Button} onClick={handleLogin}>
        INGRESAR
      </button>
    </article>

  )
}

export default Login
