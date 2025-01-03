import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { url } from "../api/url";

const initialState = {
  loading: false,
  pets: [],
  error: "",
};

export const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    fetchPending(state) {
      state.loading = true;
      state.pets = [];
      state.error = "";
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.pets = action.payload;
      state.error = "";
    },
    fetchReject(state, action) {
      state.loading = false;
      state.pets = [];
      state.error = action.payload;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchReject } = petSlice.actions;

export const fetchPets = (filter) => async (dispatch) => {
    try {
        dispatch(fetchPending())
        let urls = `${url}/pets?filter=${filter}`
       
        const { data } = await axios.get(`${urls}`,{
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            }
        })
        
        dispatch(fetchSuccess(data.data))

    } catch (error) {
        dispatch(fetchReject())
    }
};
export default petSlice.reducer;
