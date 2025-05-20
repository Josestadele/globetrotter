"use client";
import { useState } from "react";
import useAppStore from "@/app/Store/store";
import { step2Schema } from "@/app/schema/flightSchema";


export default function Step2() {
  const { nextStep, prevStep, formData, step2 } = useAppStore();
  const [error, setError] = useState<string>("");

  // Cambia el nombre para que coincida con el render
  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    idx: number
  ) => {
    setError("");
    const updatedTravelers = [...formData.step2.travelers];
    updatedTravelers[idx] = {
      ...updatedTravelers[idx],
      [e.target.name]: e.target.value,
    };
    step2({ travelers: updatedTravelers });
  };

  const addTravel = () => {
    setError("");
    const newTravel = {
      name: "",
      birthDate: "",
      documentType: "passport" as "passport" | "id",
      documentNumber: "",
    };
    step2({ travelerCount: formData.step2.travelerCount + 1 })
    const updatedTravelers = [...formData.step2.travelers, newTravel];
    step2({ travelers: updatedTravelers });

  };

  const removeTravel = (idx: number) => {
    setError("");
    const updatedTravelers = formData.step2.travelers.filter((_, i) => i !== idx);
    step2({ travelers: updatedTravelers });
    step2({ travelerCount: formData.step2.travelerCount - 1 })
  };

  const validateAndNext = () => {
    try {
      console.log("formData.step2", formData.step2);
      step2Schema.parse(formData.step2);
      setError("");
      nextStep();
    } catch (error: any) {
      setError(
        error.errors[0]?.message ||
          "Please fill in the experience field correctly."
      );
    }
  };

  return (
    <div>
      
      <div className="mt-5">
        {error && <div className="text-xs text-red-500 font-medium mb-2">*{error}</div>}
        <div>
          <button
            className="text-blue-500 text-sm px-1 py-0.5 rounded hover:bg-blue-200 transition"
            onClick={addTravel}
          >
            Add Travel
          </button>
        </div>
        <div>
          {formData.step2.travelers?.map((travel, idx) => (
            <div
              key={idx}
              className="bg-white border border-blue-200 p-2 rounded-lg mt-3 flex flex-col gap-2 shadow-md"
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-medium text-gray-700">Traveler {idx + 1}</h3>
                <button
                  className="text-xs text-red-400 hover:underline transition"
                  onClick={() => removeTravel(idx)}
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full">
                <label className="flex flex-col text-[11px] text-gray-500 font-normal w-full">
                  Name
                  <input
                    type="text"
                    name="name"
                    className="bg-gray-50 border-b border-blue-100 text-gray-800 text-xs px-1 py-0.5 focus:outline-none focus:border-blue-300 transition w-full"
                    value={travel.name}
                    onChange={(e) => handle(e, idx)}
                    required
                  />
                </label>
                <label className="flex flex-col text-[11px] text-gray-500 font-normal w-full">
                  Birth Date
                  <input
                    type="date"
                    name="birthDate"
                    className="bg-gray-50 border-b border-blue-100 text-gray-800 text-xs px-1 py-0.5 focus:outline-none focus:border-blue-300 transition w-full"
                    value={travel.birthDate}
                    onChange={(e) => handle(e, idx)}
                    required
                  />
                </label>
                <label className="flex flex-col text-[11px] text-gray-500 font-normal w-full">
                  Document Type
                  <select
                    name="documentType"
                    className="bg-gray-50 border-b border-blue-100 text-gray-800 text-xs px-1 py-0.5 focus:outline-none focus:border-blue-300 transition w-full"
                    value={travel.documentType}
                    onChange={(e) => handle(e, idx)}
                  >
                    <option value="passport">Passport</option>
                    <option value="id">ID Card</option>
                  </select>
                </label>
                <label className="flex flex-col text-[11px] text-gray-500 font-normal w-full">
                  Document Number
                  <input
                    type="text"
                    name="documentNumber"
                    className="bg-gray-50 border-b border-blue-100 text-gray-800 text-xs px-1 py-0.5 focus:outline-none focus:border-blue-300 transition w-full"
                    value={travel.documentNumber}
                    onChange={(e) => handle(e, idx)}
                    required
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* buttons */}
      <div className="flex justify-between mt-5">
        <button className="text-blue-500 text-sm px-1 py-0.5 rounded hover:bg-blue-200 transition" onClick={prevStep}>
          {"\u2190"} Previous
        </button>
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