import {Marker} from "react-leaflet";
import L from 'leaflet';

interface SinglePinProps {
    position: [number, number] | null;
    icon: string;
    label: string
    onClick?: (position: [number, number]) => void; // make it optional
}

export function SinglePin({ position, icon, label, onClick}: SinglePinProps) {
    if (!position) return null;

    const pinStyle = L.divIcon({
        html: `
          <div class="my-location" style="text-align: center;">
            <img alt="timetravel-logo" src="${icon}" />
            <figcaption class="pin-label">${label}</figcaption>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 20],
        className: "my-location",
    });

    return (
        <Marker position={position}
           icon={pinStyle}
           {...(onClick && {
               eventHandlers: {
                click: () => onClick(position),
               },
           })}
        />
    );
}