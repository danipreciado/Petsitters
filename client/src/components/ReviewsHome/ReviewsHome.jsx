import styles from './ReviewsHome.module.css';


function ReviewsHome() {

    return (
        <section className={styles.reviewsHome__container}>

            <article className={styles.reviewsHome__review}>
                <img className={styles.reviewsHome__img} src="pet1.png" alt="Cat smiling"></img>
                <div className={styles.reviewsHome__reviewContainer} >
                    <img className={styles.reviewsHome__icon} src="comillasIcon.png" ></img>
                    <p className={styles.reviewsHome__p}> ¡Meow! Estoy muy satisfecho con el servicio de cuidado. </p>
                    <p className={styles.reviewsHome__name}> -Moonee </p>
                </div>
            </article>

            <article className={styles.reviewsHome__review}>
                <img className={styles.reviewsHome__img} src="pet2.png" alt="Cat smiling"></img>
                <div className={styles.reviewsHome__reviewContainer} >
                    <img className={styles.reviewsHome__icon} src="comillasIcon.png" ></img>
                    <p className={styles.reviewsHome__p}> ¡Guau! Mi cuidadora fue increíble, me trataron como a un rey y me dieron muchas golosinas deliciosas. </p>
                    <p className={styles.reviewsHome__name}> -Max </p>
                </div>
            </article>


        </section>
    )
}

export default ReviewsHome