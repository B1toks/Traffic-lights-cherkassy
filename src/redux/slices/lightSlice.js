import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = [];

export const getLights = createAsyncThunk("stats/get", async (_, ThunkAPI) => {
	try {
		await fetch(`${process.env.REACT_APP_SERVER_URL}/lights/get-all`, {
			method: "GET"
		}).then((res) => {
			if (res.ok) {
				return res.json()
			}
			throw new Error("No lights!");
		}).then((res) => {
			ThunkAPI.dispatch(reset());
			ThunkAPI.dispatch(setLights(res));
		});
	} catch (e) {
		console.error(e)
	}
})

export const trafficLightSlice = createSlice({
	name: "trafficLight",
	initialState,
	reducers: {
		setLights: (state, action) => {
			action.payload.forEach(light => {
				state.push(light)
			});
		},
		reset: () => initialState
	},
});

export const {setLights, reset} =
	trafficLightSlice.actions;
export default trafficLightSlice.reducer;
