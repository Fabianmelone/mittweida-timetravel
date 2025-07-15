import Map from "./Map/Map.tsx";
import {useEffect, useState} from "react";
import {RouteButton} from "./RouteButton/RouteButton.tsx";
import L from 'leaflet';
import {useLocation} from "wouter";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {mutate} from "swr";

//watertowers
// johannes schilling haus
//technikumplatz
//stadtkirche


// testing for nearby location library
// navigator.geolocation.getCurrentPosition = (success) => {
//     success({
//         coords: {
//             latitude: 50.9860979,
//             longitude: 12.9674641,
//             accuracy: 10,
//             altitude: null,
//             altitudeAccuracy: null,
//             heading: null,
//             speed: null,
//         },
//         timestamp: Date.now(),
//     } as GeolocationPosition);
// };

// testing for nearby stadtverwaltung
// navigator.geolocation.getCurrentPosition = (success) => {
//     success({
//         coords: {
//             latitude: 50.985727,
//             longitude: 12.981443,
//             accuracy: 10,
//             altitude: null,
//             altitudeAccuracy: null,
//             heading: null,
//             speed: null,
//         },
//         timestamp: Date.now(),
//     } as GeolocationPosition);
// };


export default function MainPage() {
    const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
    const [selectedDestination, setSelectedDestination] = useState<[number, number] | null>(null);
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
    const [route, setRoute] = useState<[number, number][] | null>(null);
    const [isNearby, setIsNearby] = useState(false);
    const [, navigate] = useLocation();


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


    //backend routing post and get using SWR
    const postLocation = async (url: string, { arg }: { arg: string}) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ label: arg }),
        });

        if (!res.ok) {
            throw new Error('Failed to mark location as visited');
        }
    };

    const { trigger: postVisit, isMutating } = useSWRMutation(
        'http://localhost:3000/location/visit',
        postLocation,
        {
            onSuccess: () => mutate('http://localhost:3000/location/visited'),
        }
    );

    const handleTimeTravel = async () => {
        if (!selectedLabel) return;

        try {
            await postVisit(selectedLabel);
            navigate(`/timetravel/${selectedLabel.toLowerCase().replace(/\s+/g, "-")}`)
            } catch (err) {
            console.error("Failed to mark location as visited", err);
        }
    };

    //fetch
    const fetcher = (url: string) => fetch(url).then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
    });

    const { data: visitedLocation =[] , error, isLoading } = useSWR<string[]>(
        'http://localhost:3000/location/visited',
        fetcher
    );

    useEffect(() => {
        if (error) {
            console.warn("Backend not available. Proceeding without visited location data.");
        }
    }, [error]);

    return (
        <div className="map-container">
            <Map
                userPosition={userPosition}
                setUserPosition={setUserPosition}
                setSelectedDestination={setSelectedDestination}
                setSelectedLabel={setSelectedLabel}
                route={route}
                visitedLabels = {visitedLocation}
            />

            <RouteButton
                visible={!!selectedDestination && !isNearby}
                onClick={handleRouteRequest}
                label={selectedLabel}
                />

            {selectedLabel && !isLoading && (isNearby || visitedLocation.includes(selectedLabel)) && (
                <button
                    className="time-travel-button"
                    onClick={handleTimeTravel}
                    disabled={isMutating}
                >
                    Time Travel {selectedLabel}
                </button>
            )}

        </div>
    )
}