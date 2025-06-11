import WelcomeText from "./WelcomeText.tsx";

export default function WelcomePage() {
    return (
        <div className="welcome-page">
            <WelcomeText />
            <button className="start-button">Start Exploring</button>
        </div>
    )
}