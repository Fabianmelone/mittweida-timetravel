import {useMap, useMapEvents} from "react-leaflet";
import type {LocationEvent} from "leaflet";

export function LocateControl({ onLocate }: { onLocate: (position: [number, number]) => void}) {
    const map = useMap();

    useMapEvents({
        locationfound(e: LocationEvent) {
            const coords: [number, number] = [e.latlng.lat, e.latlng.lng];
            onLocate(coords);
            map.flyTo(coords, map.getZoom())
        },
    })

    const handleLocate = () => {
        map.locate({
            setView: false,
            watch: false,
            enableHighAccuracy: true,
        })
    }
    return (
        <button onClick={handleLocate} className="find-me-button">
        </button>
    );
}

//comment