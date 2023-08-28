import { useState } from 'react';
import styles from './FAQ.module.css';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      question: '¿Cómo registro mi mascota?',
      answer:
        'Para registrar tu mascota solamente debes crear una cuenta.',
    },
    {
      question: '¿Cómo puedo encontrar un cuidador para mi mascota?',
      answer:
        'Puedes encontrar un cuidador para tu mascota navegando a la sección de cuidadores para encontrar el cuidador adecuado para tus necesidades.',
    },
    {
      question: '¿Cómo veo las reseñas de un cuidador?',
      answer:
        'Ve al perfil del cuidador y debajo de sus datos aparecerán las reseñas, además de la calificación que le han dejado otros usuarios.',
    },
    
  ];

  const handleQuestionClick = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className={styles.faqContainer}>
      <h2 className={styles.faqHeading}>Preguntas Frecuentes</h2>
      <ul className={styles.faqList}>
        {questions.map((q, index) => (
          <li key={index} className={styles.faqItem}>
            <button
              className={`${styles.faqQuestion} ${
                activeIndex === index ? styles.active : ''
              }`}
              onClick={() => handleQuestionClick(index)}
            >
              {q.question}
            </button>
            {activeIndex === index && (
              <div className={styles.faqAnswer}>{q.answer}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FAQ;
