import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function BuildingLocation() {
  return (
    <div className="py-4">
      <h1 className="text-center text-2xl py-3">
        Get your location by google map
      </h1>
      <MapContainer
        center={[23.807103, 90.3586455]}
        zoom={100}
        scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[23.807103, 90.3586455]}>
          <Popup>Nation housing complex, mirpur, Dhaka.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
