export default function LoadingScreen() {
    return (
        <div className="loading-screen">
            <div className="loader">
                <h1>Mittweida Timetravel</h1>
                <img src="/public/img/timetravel-logo.svg" />
                <p className="loading-text">Loading...</p>
            </div>
        </div>
    )
}