// src/App.js
import React from "react";
import Map from "./map";
import {Provider} from "react-redux";
import {store} from "./redux/store";

function App() {
	return (
		<Provider store={store}>
			<Map/>
		</Provider>
	);
}

export default App;
