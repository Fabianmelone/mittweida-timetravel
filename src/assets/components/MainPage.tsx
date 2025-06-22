import Map from "./Map/Map.tsx";
import {useEffect, useState} from "react";
import {RouteButton} from "./RouteButton/RouteButton.tsx";
import L from 'leaflet';
import { useNavigate } from "react-router-dom";


//testing for nearby location
// navigator.geolocation.getCurrentPosition = (success, error) => {
//     success({
//         coords: {
//             latitude: 50.9856,
//             longitude: 12.9797,
//             accuracy: 10,
//         },
//     });
// };


export default function MainPage() {
    const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
    const [selectedDestination, setSelectedDestination] = useState<[number, number] | null>(null);
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
    const [route, setRoute] = useState<[number, number][] | null>(null);
    const [isNearby, setIsNearby] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (userPosition && selectedDestination) {
            const userLatLng = L.latLng(userPosition);
            const destLatLng = L.latLng(selectedDestination);
            const distance = userLatLng.distanceTo(destLatLng);

            setIsNearby(distance < 100);
        } else {
            setIsNearby(false);
        }
    }, [userPosition, selectedDestination]);


    const handleRouteRequest = () => {
        if (userPosition && selectedDestination) {
            setRoute([userPosition, selectedDestination]);
            return;
        }

        if (!selectedDestination) return;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords: [number, number] = [
                    position.coords.latitude,
                    position.coords.longitude,
                ];

                setUserPosition(coords);
                setRoute([coords, selectedDestination]);
            },
            (error) => {
                console.error("Geolocation error", error);
            },
            {enableHighAccuracy: true}
        )
    }

    return (
        <div className="map-container">
            <Map
                userPosition={userPosition}
                setUserPosition={setUserPosition}
                setSelectedDestination={setSelectedDestination}
                setSelectedLabel={setSelectedLabel}
                route={route}
            />

            <RouteButton
                visible={!!selectedDestination}
                onClick={handleRouteRequest}
                label={selectedLabel}
                />

            {isNearby && (
                <button
                    className="nearby-button"
                    onClick={() => navigate("/next-location")}
                >
                    Enter Location
                </button>
            )}

        </div>
    )
}