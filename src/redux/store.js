import {configureStore} from "@reduxjs/toolkit";

import lightSlice from "./slices/lightSlice";

export const store = configureStore({
	reducer: {
		lights: lightSlice
	},
});
