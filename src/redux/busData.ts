import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Bus {
    main: string
    blanket: boolean;
    boarding_time: string;
    bus_number: string;
    cctv: boolean;
    charging_point: boolean;
    deboarding_time: string;
    destination: string;
    emergency_contacts: boolean;
    fare_per_km: number;
    id: number;
    m_ticket: boolean;
    name: string;
    ratings: number;
    reading_light: boolean;
    starting_point: string;
    status: string;
    type: string;
  }
  interface BusDataState {
    busData: Bus[];
  }
  
  const initialState: BusDataState = {
    busData: [],
  };
const busDataSlice = createSlice({
    name: 'busData',
    initialState,
    reducers: {
        getBusData: (state, action:PayloadAction<Bus[]>) =>{
          state.busData = action.payload
        },

}
})
export const {getBusData} = busDataSlice.actions;
