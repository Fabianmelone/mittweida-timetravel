import WelcomeText from "./WelcomeText.tsx";
import ImageSlider from "./sliderModule/ImageSlider.tsx";
import {useLocation} from "wouter";

export default function WelcomePage() {
    const [, setLocation] = useLocation();

    return (
        <div className="welcome-page">

            <ImageSlider
                imageOne={'./img/mittweida-2020-crop2.png'}
                imageTwo={"./img/mittweida-1914-crop2.png"}
            />
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