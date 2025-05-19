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
        {error && <div className="font-bold text-red-600">*{error}</div>}
        <div>
          <button
            className="text-white bg-blue-500 px-3 py-1 rounded-lg text-lg sm:text-xl"
            onClick={addTravel}
          >
            Add Travel
          </button>
        </div>
        <div>
          {formData.step2.travelers?.map((travel, idx) => (
            <div
              key={idx}
              className="border p-4 rounded-lg mt-4 flex flex-col gap-2"
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Traveler {idx + 1}</h3>
                <button
                  className="text-red-500"
                  onClick={() => removeTravel(idx)}
                >
                  Remove
                </button>
              </div>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={travel.name}
                  onChange={(e) => handle(e, idx)}
                  required
                />
              </label>
              <label>
                Birth Date:
                <input
                  type="date"
                  name="birthDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={travel.birthDate}
                  onChange={(e) => handle(e, idx)}
                  required
                />
              </label>
              <label>
                Document Type:
                <select
                  name="documentType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={travel.documentType}
                  onChange={(e) => handle(e, idx)}
                >
                  <option value="passport">Passport</option>
                  <option value="id">ID Card</option>
                </select>
              </label>
              <label>
                Document Number:
                <input
                  type="text"
                  name="documentNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={travel.documentNumber}
                  onChange={(e) => handle(e, idx)}
                  required
                />
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* buttons */}
      <div className="flex justify-between mt-5">
        <button className="text-blue-500 text-lg sm:text-xl" onClick={prevStep}>
          {"\u2190"} Previous
        </button>
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