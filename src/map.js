import React, {useState, useEffect} from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import TrafficLightModal from "./components/ModalTrafficLight";
import {useDispatch, useSelector} from "react-redux";
import {getLights} from "./redux/slices/lightSlice";

const Map = () => {
	const [trafficLights, setTrafficLights] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedLight, setSelectedLight] = useState(null);

	const dispatch = useDispatch();

	const lights = useSelector(state => state.lights);

	useEffect(() => {
		dispatch(getLights());
	}, [])

	//  useEffect(() => {
	//   fetch('http://92.43.82.153:5000/api/traffic-lights')  // Замінити localhost на твою публічну IP, якщо сайт має бути доступний з Інтернету
	//     .then((response) => response.json())
	//     .then((data) => {
	//       setTrafficLights([
	//         { id: 1, lat: 49.4444, lng: 32.0590, status: true, votes: 5 },
	//         { id: 2, lat: 49.4454, lng: 32.0600, status: false, votes: 3 },
	//       ]);
	//     });
	// }, []);  // Порожній масив вказує, що цей код виконується один раз після завантаження компонента

	const openModal = (light) => {
		setSelectedLight(light);
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
		setSelectedLight(null);
	};

	const approveLight = () => {
		// Відправка запиту на сервер для оновлення статусу світлофора
		fetch(`http://localhost:5000/traffic-light/${selectedLight.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				status: !selectedLight.status,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setSelectedLight((prev) => ({...prev, status: data.status}));
				closeModal();
			})
			.catch((error) => console.error('Error updating traffic light:', error));
	};

	return (
		<div>
			<MapContainer
				center={[49.4444, 32.0590]}
				zoom={13}
				style={{height: "100vh"}}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				{lights.map((el) => (
					<Marker
						key={el.id}
						position={[el.lat, el.lon]}
						icon={L.icon({
							iconUrl: el.status ? "/green-light.png" : "/red-light.png", // Іконки світлофорів
							iconSize: [25, 25],
						})}
						eventHandlers={{
							click: () => openModal(el),
						}}
					>
						<Popup>
							Світлофор {el.id} - Статус: {el.status ? "Включено" : "Виключено"}
						</Popup>
					</Marker>
				))}
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
