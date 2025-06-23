import styles from "./RouteButton.module.css"

interface RouteButtonProps {
    visible: boolean;
    onClick: () => void;
    label?: string | null;
}

export function RouteButton({ visible, onClick, label}: RouteButtonProps) {
    if (!visible) return null;

    return (
        <div className={styles.routeButtonContainer}>
            <button onClick={onClick} className={styles.showRouteButton}>
                Directions to {label || "This Point"}
            </button>
        </div>
    )
}