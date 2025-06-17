import WelcomeText from "./WelcomeText.tsx";
import ImageSlider from "./sliderModule/ImageSlider.tsx";

export default function WelcomePage() {

    return (
        <div className="welcome-page">

            <ImageSlider imageOne={'../public/img/mittweida-now-2020.png'} imageTwo={"../public/img/mittweida-before-1914.png"} />
            <WelcomeText />
            <button className="start-button">Start Exploring</button>
        </div>
    )
}