import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

interface RoutingControlProps {
    waypoints: [number, number][];
}

export default function RoutingControl({ waypoints }: RoutingControlProps) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: waypoints.map(([lat, lng]) => L.latLng(lat, lng)),
            routeWhileDragging: false,
            show: false,
            addWaypoints: false,
            waypointMode: "snap",
            // @ts-expect-error property is not defined in the type
            draggableWaypoints: true, //lets you drag the waypoints that create the route
            fitSelectedRoutes: true,
            showAlternatives: true,
            createMarker: () => null, //remove automatic waypoints
        }).addTo(map);

        routingControl.on('routesfound', function() {

        });

        routingControl.on('routingerror', function(e) {
            console.error('Routing error:', e?.error);
        });

        return () => {
            try {
                routingControl.getPlan().setWaypoints([]);
                routingControl.remove();
            } catch (err) {
                console.warn("Routing control cleanup failed", err);
            }
        };
    }, [map, waypoints]);

    return null;
}