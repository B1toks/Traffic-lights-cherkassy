import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import TrafficLightModal from "./components/ModalTrafficLight";

const Map = () => {
  const [trafficLights, setTrafficLights] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLight, setSelectedLight] = useState(null);

  useEffect(() => {
    fetch("https://api.openstreetmap.org/api/0.6/way/102712238")
      .then((response) => response.json())
      .then((data) => {
        setTrafficLights([
          { id: 1, lat: 49.4444, lng: 32.0590, status: true, votes: 5 }, 
          { id: 2, lat: 49.4454, lng: 32.0600, status: false, votes: 3 },
        ]);
      });
  }, []);

  const openModal = (light) => {
    setSelectedLight(light);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedLight(null);
  };

  const approveLight = () => {
    // Тут можна обробити апрув і оновити статус світлофора
    setSelectedLight((prev) => ({ ...prev, status: !prev.status }));
    closeModal();
  };

  return (
    <div>
      <MapContainer
        center={[49.4444, 32.0590]} 
        zoom={13}
        style={{ height: "100vh" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {trafficLights.map(({ id, lat, lng, status, votes }) => (
          <Marker
            key={id}
            position={[lat, lng]}
            icon={L.icon({
              iconUrl: status ? "/green-light.png" : "/red-light.png", // Іконки світлофорів
              iconSize: [25, 25],
            })}
            eventHandlers={{
              click: () => openModal({ id, lat, lng, status, votes }),
            }}
          >
            <Popup>
              Світлофор {id} - Статус: {status ? "Включено" : "Виключено"}
            </Popup>
          </Marker>
        ))}

        {/* Тестовий маркер */}
        <Marker
          position={[49.4444, 32.0590]} 
          icon={L.icon({
            iconUrl: "/green-light.png",
            iconSize: [25, 25],
          })}
          eventHandlers={{
            click: () =>
              openModal({
                id: 999,
                lat: 49.4444,
                lng: 32.0590,
                status: true,
                votes: 1,
              }),
          }}
        >
          <Popup>
            Світлофор 999 - Статус: Включено
          </Popup>
        </Marker>
      </MapContainer>

      {/* Модальне вікно */}
      <TrafficLightModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        trafficLight={selectedLight}
        approveLight={approveLight}
      />
    </div>
  );
};

export default Map;
