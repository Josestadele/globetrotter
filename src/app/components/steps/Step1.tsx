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
        {error && <div className="font-bold text-red-600">*{error}</div>}
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="destination"
            >
             Destino
            </label>
            <input
              list="destination-list"
              name="destination"
              value={formData.step1.destination}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
              className="text-lg font-medium text-gray-900"
              htmlFor="departureDate"
            >
              Fecha de salida
            </label>
            <input
              type="date"
              name="departureDate"
              value={formData.step1.departureDate}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="returnDate"
            >
              Fecha de retorno
            </label>
            <input
              type="date"
              name="returnDate"
              value={formData.step1.returnDate}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="flightClass"
            >
              Class
            </label>
            <select
              name="flightClass"
              value={formData.step1.flightClass}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
          className="text-white bg-blue-500 px-3 py-1 rounded-lg text-lg sm:text-xl"
          onClick={validateAndNext}
        >
          Next {"\u2192"}
        </button>
      </div>
    </div>
  );
}

