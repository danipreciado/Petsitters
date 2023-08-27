import { useState } from 'react';
import styles from './SignUp.module.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        address: '',
        phoneNumber: '',
        email: '',
        password: '',
    });
    

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
    };  

    const handleSignUp = async () => {
        try {
          const response = await fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            navigate('/login'); // Navigate to login page on successful signup
          } else {
            console.error('Error signing up');
          }
        } catch (error) {
          console.error('Error signing up:', error);
        }
      };

    return (

        <article className={styles.signUp__Container}>

            <aside className={styles.signUp__FormAside}>
                <h1 className={styles.signUp__Title}>Registro</h1>

                <form className={styles.signUp__Form}>
                    <label htmlFor="name" className={styles.signUp__InputLabel}>Nombre</label>
                    <input
                        id='name'
                        className={styles.signUp__Input}
                        type='text'
                        value={formData.name}
                        onChange={handleInputChange}
                    ></input>
                    <label htmlFor="lastname" className={styles.signUp__InputLabel}>Apellido</label>
                    <input
                        id='lastname'
                        className={styles.signUp__Input}
                        type='text'
                        value={formData.lastname}
                        onChange={handleInputChange}
                    ></input>
                    <label htmlFor="address" className={styles.signUp__InputLabel}>Dirección</label>
                    <input
                        id='address'
                        className={styles.signUp__Input}
                        type='text'
                        value={formData.address}
                        onChange={handleInputChange}
                    ></input>
                    <label htmlFor="phoneNumber" className={styles.signUp__InputLabel}>Teléfono celular</label>
                    <input
                        id='phoneNumber'
                        className={styles.signUp__Input}
                        type='number'
                        value={formData.cellphone}
                        onChange={handleInputChange}
                    ></input>
                    <label htmlFor='email' className={styles.signUp__InputLabel}>Correo Electrónico</label>
                    <input
                        id='email'
                        className={styles.signUp__Input}
                        type='text'
                        value={formData.email}
                        onChange={handleInputChange}
                    ></input>
                    <label htmlFor="password" className={styles.signUp__InputLabel}>Contraseña</label>
                    <input
                        id='password'
                        className={styles.signUp__Input}
                        type='password'
                        value={formData.password}
                        onChange={handleInputChange}
                    ></input>

                </form>
                <button className={styles.signUp__Button} onClick={handleSignUp}>
                    Crear Cuenta
                </button>
            </aside>

            <aside className={styles.signUp__ImgAside}>
                <img className={styles.signUp__Img} src="signUpImg.png" alt="Dog"></img>
            </aside>

        </article>

    )
}

export default SignUp