import NavBar from '../NavBar/NavBar';
import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';
import FAQ from '../FAQ/FAQ';
import ReviewsHome from '../ReviewsHome/ReviewsHome';

function HomeView() {

    return (
        <>
            <NavBar />
            <WelcomeMessage />
            <ReviewsHome />
            <FAQ />
            
        </>
    )
}

export default HomeView