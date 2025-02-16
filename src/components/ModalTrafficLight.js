import React, {useState} from "react";
import Modal from "react-modal";
import photo from "../assets/img/photo.svg";
import {useDispatch, useSelector} from "react-redux";
import {getLights, reset} from "../redux/slices/lightSlice";

Modal.setAppElement('#root');

const TrafficLightModal = ({isOpen, closeModal, trafficLight, approveLight}) => {
	const dispatch = useDispatch();

	const castVote = async (positive) => {
		await fetch(`${process.env.REACT_APP_SERVER_URL}/lights/vote/${trafficLight.id}`, {
			method: 'POST',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({vote: positive}),
		})
			.then(() => {
				dispatch(getLights());
			})
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			contentLabel="Світлофор"
			style={{
				overlay: {backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000},
				content: {
					background: 'white',
					borderRadius: '10px',
					padding: '20px',
					width: '320px',
					margin: 'auto',
					maxWidth: '90%',
					boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
				}
			}}
		>
			{/* Кнопка закриття */}
			<button
				onClick={closeModal}
				style={{
					position: 'absolute',
					top: '10px',
					right: '10px',
					background: 'transparent',
					border: 'none',
					fontSize: '20px',
					color: '#333',
					cursor: 'pointer',
				}}
			>
				&times;
			</button>

			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
				<h2>Світлофор {trafficLight?.id}</h2>
				{/* Статус світлофора */}
				<span style={{
					backgroundColor: trafficLight?.status ? "green" : "red",
					color: "white",
					borderRadius: "5px",
					padding: "5px 10px",
					fontWeight: "bold"
				}}>
          {trafficLight?.status ? "Світиться" : "Не світиться"}
        </span>
			</div>

			{/* Вулиця */}
			<p><strong>Вулиця: </strong>{trafficLight?.street || "Не вказано"}</p>

			{/* Час останнього оновлення */}
			<p><strong>Оновлено:</strong> {Date(trafficLight?.updated) || "Невідомо(Ласт тайм)"}</p>

			{/* Фото світлофора */}
			<div style={{marginBottom: '10px'}}>
				<img
					src={photo}
					alt="Фото світлофора"
					style={{
						width: '100%',
						height: 'auto',
						display: 'block',
					}}
				/>
			</div>

			{/* Кількість голосів */}
			<p><strong>Голосів: </strong>{trafficLight?.votes || "Ще не оцінено"}</p>

			{/* Кнопка для зміни статусу */}
			<p>Оцініть актуальність інформації</p>
			<button
				onClick={() => castVote(true)}
				style={{
					backgroundColor: "transparent",
					color: "white",
					padding: "10px 20px",
					border: "1px green solid",
					borderRadius: "5px",
					cursor: "pointer",
					width: "100%",
				}}
			>
				👍
			</button>
			<button
				onClick={() => castVote(false)}
				style={{
					backgroundColor: "transparent",
					color: "white",
					padding: "10px 20px",
					border: "1px red solid",
					borderRadius: "5px",
					cursor: "pointer",
					width: "100%",
					marginTop: '10px',
				}}
			>
				👎
			</button>
		</Modal>
	);
};

export default TrafficLightModal;
