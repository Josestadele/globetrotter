"use client";
import { step1Schema } from "@/app/schema/flightSchema";
import useAppStore from "@/app/Store/store";

import { useState, useEffect } from "react";
import { getFlights } from "@/app/services/flight/flight"; // Adjust the import path as needed

export default function Step1() {
  const { nextStep, formData, step1 } = useAppStore();
  const [flights, setFlights] = useState([]);

  useEffect(() => {

    getFlights().then((res) => {
      console.log("res", res);  
      setFlights(res.data);
    }).catch((err) => {
      console.log("err", err);
    });
  }, []);

  const uniqueDestinations = Array.from(
    new Map(
      flights.map((flight) => [
        flight.destination,
        { destination: flight.destination },
      ])
    ).values()
  );

  const validateAndNext = () => {
    try {
       step1Schema.parse(formData.step1);
      console.log("formData.step1", formData.step1);
      nextStep();
    } catch (error: any) {
      setError(
        error.errors[0]?.message || "Please fill all teh fields correctly."
      );
    }
  };
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    step1({ [e.target.name]: e.target.value });
  };

  return (
<div>
  <div className="mt-5">
    {error && <div className="text-xs text-red-500 font-medium mb-2">*{error}</div>}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
      <div>
        <label
          className="block mb-1 text-sm font-medium text-gray-700 tracking-wide"
          htmlFor="flightClass"
        >
          Destino
        </label>
        <input
          list="destination-list"
          name="destination"
          value={formData.step1.destination}
          onChange={handleChange}
          placeholder="Destino"
          className="bg-white border border-gray-200 text-gray-800 text-xs rounded-md block w-full p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-200"
          required
        />
        <datalist id="destination-list">
          {uniqueDestinations.map((flight: any, index: number) => (
            <option key={index} value={flight.destination}>
              {flight.destination}
            </option>
          ))}
        </datalist>
      </div>
      <div>
        <label
          className="block mb-1 text-sm font-medium text-gray-700 tracking-wide"
          htmlFor="departureDate"
        >
          Fecha de salida
        </label>
        <input
          type="date"
          name="departureDate"
          value={formData.step1.departureDate}
          onChange={handleChange}
          placeholder="Fecha de salida"
          className="bg-white border border-gray-200 text-gray-800 text-xs rounded-md block w-full p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-200"
          required
        />
      </div>
      <div>
        <label
          className="block mb-1 text-sm font-medium text-gray-700 tracking-wide"
          htmlFor="returnDate"
        >
          Fecha de retorno
        </label>
        <input
          type="date"
          name="returnDate"
          value={formData.step1.returnDate}
          onChange={handleChange}
          placeholder="Fecha retorno"
          className="bg-white border border-gray-200 text-gray-800 text-xs rounded-md block w-full p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-200"
          required
        />
      </div>
      <div>
        <label
          className="block mb-1 text-sm font-medium text-gray-700 tracking-wide"
          htmlFor="flightClass"
        >
          Tipo de clase
        </label>
        <select
          name="flightClass"
          value={formData.step1.flightClass}
          onChange={handleChange}
          placeholder="Tipo de clase"
          className="bg-white border border-gray-200 text-gray-800 text-xs rounded-md block w-full p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-200"
          required
        >
          <option value="">Seleccione una clase</option>
          <option value="economy">Económica</option>
          <option value="business">Business</option>
          <option value="first">Primera clase</option>
        </select>
      </div>
    </div>
  </div>
  {/* buttons */}
  <div className="flex justify-end mt-5">
    <button
      className="text-blue-500 text-sm px-1 py-0.5 rounded hover:bg-blue-200 transition"
      onClick={validateAndNext}
    >
      Next {"\u2192"}
    </button>
  </div>
</div>
  );
}

