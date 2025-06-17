import WelcomeText from "./WelcomeText.tsx";
import ImageSlider from "./sliderModule/ImageSlider.tsx";
import {useLocation} from "wouter";

export default function WelcomePage() {
    const [, setLocation] = useLocation();

    return (
        <div className="welcome-page">

            <ImageSlider
                imageOne={'../public/img/mittweida-now-2020.png'}
                imageTwo={"../public/img/mittweida-before-1914.png"} />
            <WelcomeText />
            <button
                className="start-button"
                onClick={() => setLocation("/")}
                aria-label="Start Exploring"
            >
            Start Exploring
            </button>
        </div>
    );
}