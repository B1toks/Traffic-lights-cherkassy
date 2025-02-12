// src/Map.js
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const [trafficLights, setTrafficLights] = useState([]);

  useEffect(() => {
    fetch("https://api.openstreetmap.org/api/0.6/way/102712238")
      .then((response) => response.json())
      .then((data) => {
        // Обробка даних, щоб витягти координати світлофорів (Михайло)
        setTrafficLights([
          { id: 1, lat: 50.4501, lng: 30.5234, status: true },
          { id: 2, lat: 50.4511, lng: 30.5244, status: false },
        ]);
      });
  }, []);

  return (
    <MapContainer center={[50.4501, 30.5234]} zoom={13} style={{ height: "100vh" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {trafficLights.map(({ id, lat, lng, status }) => (
        <Marker
          key={id}
          position={[lat, lng]}
          icon={L.icon({
            iconUrl: status ? "/green-light.png" : "/red-light.png", // Завантажуємо відповідні іконки (он оф)
            iconSize: [25, 25],
          })}
        >
          <Popup>
            Світлофор {id} - Статус: {status ? "Включено" : "Виключено"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
