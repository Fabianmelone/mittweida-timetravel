import {MapContainer, TileLayer} from "react-leaflet";
import styles from "./Map.module.css";
import 'leaflet/dist/leaflet.css';
import RoutingControl from "../RoutingControl/RoutingControl.tsx";
import {SinglePin} from "./SinglePin.tsx";
import {LocateControl} from "./LocateControl.tsx";

const initialPosition: [number, number] = [50.9853, 12.9741];


interface MapProps {
    userPosition: [number, number] | null;
    setUserPosition: (pos: [number, number]) => void;
    setSelectedDestination: (pos: [number, number]) => void;
    setSelectedLabel: (label: string) => void;
    route: [number, number][] | null;
}

export default function Map({userPosition, setUserPosition, setSelectedDestination, setSelectedLabel, route}: MapProps) {
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
            <SinglePin position={[50.9856089, 12.9797651]}
                       icon="/img/mittweida-town-hall.svg"
                       label="City Administration"
                       onClick={(coords) => {
                           setSelectedDestination(coords);
                           setSelectedLabel("City Administration");
                       }} />
            <SinglePin position={[50.9851082, 12.9744165]}
                       icon="/img/mittweida-library.svg"
                       label="City Library"
                       onClick={(coords) => {
                           setSelectedDestination(coords);
                           setSelectedLabel("City Library");
                       }} />
            <SinglePin position={[50.9859774, 12.9726802]}
                       icon="/img/coffee-ines-haferkom.svg"
                       label="Cafe Ines Haferkom"
                       onClick={(coords) => {
                           setSelectedDestination(coords);
                           setSelectedLabel("Cafe Ines Haferkom");
                       }} />
            <SinglePin position={[50.9860966, 12.971174917]}
                       icon="/img/faculty-of-media.svg"
                       label="Faculty of Media"
                       onClick={(coords) => {
                           setSelectedDestination(coords);
                           setSelectedLabel("Faculty of Media");
                       }} />
        </MapContainer>
    )
}
