import {MapContainer, TileLayer} from "react-leaflet";
import styles from "./Map.module.css";
import 'leaflet/dist/leaflet.css';
import RoutingControl from "../RoutingControl/RoutingControl.tsx";
import {SinglePin} from "./SinglePin.tsx";
import {LocateControl} from "./LocateControl.tsx";
import locationData from "../../../data/LocationData.json";

const initialPosition: [number, number] = [50.9853, 12.9741];


interface MapProps {
    userPosition: [number, number] | null;
    setUserPosition: (pos: [number, number]) => void;
    setSelectedDestination: (pos: [number, number]) => void;
    setSelectedLabel: (label: string) => void;
    route: [number, number][] | null;
    visitedLabels: string[];
}

interface LocationData {
    title: string;
    position: number[];
    icon: string;
    images: string[];
    beforeAfter: string[];
}

const typeLocationData: Record<string, LocationData> = locationData;

export default function Map({userPosition, setUserPosition, setSelectedDestination, setSelectedLabel, route, visitedLabels}: MapProps) {
    return (
        <MapContainer center={initialPosition} zoom={16} scrollWheelZoom={false} className={styles.map}>

            <TileLayer
                attribution='© <a href="https://www.mapbox.com/about/maps">Mapbox</a> ©<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a><strong><a href="https://apps.mapbox.com/feedback/" target="_blank">Improve this map</a></strong>'
                url={`https://api.mapbox.com/styles/v1/${import.meta.env.VITE_USERNAME}/${import.meta.env.VITE_MAPBOX_STYLE}/tiles/256/{z}/{x}/{y}@2x?access_token=${import.meta.env.VITE_MAPBOX_KEY}`}
            />
            {/*<Polyline positions={path} />*/}
            {/*um route von mir zu einem anderen ort brauche ich warscheinlich userPosition und die andere position*/}
            <LocateControl onLocate={setUserPosition} />
            <SinglePin position={userPosition} icon="/img/timetravel-logo.svg" label="You are here" />
            {route && <RoutingControl waypoints={route} />}

            {Object.entries(typeLocationData).map(([slug, loc]) => (
                <SinglePin
                    key={slug}
                    position={loc.position as [number, number]}
                    icon={visitedLabels.includes(loc.title)
                    ? "/img/visited.svg"
                    : loc.icon
                    }
                    label={loc.title}
                    onClick={(coords) => {
                        setSelectedDestination(coords);
                        setSelectedLabel(loc.title);
                    }}
                />
            ))}
        </MapContainer>
    )
}
