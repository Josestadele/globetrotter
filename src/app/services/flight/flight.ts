import API from "../api";

export const getFlights =  async() => { return await API.get(`/Lstanislao/cities-permalink/main/flights.json`)};