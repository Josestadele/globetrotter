"use client";
import { useState } from "react";
import useAppStore from "@/app/Store/store";
import { step2Schema } from "@/app/schema/flightSchema";

export default function Step2() {
  const { nextStep, prevStep, formData, step2 } = useAppStore();
  const [error, setError] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const { name, value } = e.target;

    const updatedTravels = [...formData.step2.travelers!];

    updatedTravels[idx] = {
      ...updatedTravels[idx],
      [name]: value,
    };

    step2({
      travelers: updatedTravels,
    });
  };

  const addTravel = () => {
    const newTravel: any = {
      name: "",
      birthDate: "",
      documentType: "passport",
      documentNumber: "",
    };

    formData.step2.travelers.push(newTravel);
    setShowForm(true); // Mostrar el formulario al agregar un viajero
  };

  const removeExperience = (idx: number) => {
    setError("");
    const currentTravel = [...formData.step2.travelers!];
    const newTravel: any = [];

    currentTravel.filter((e) => {
      if (e.documentNumber != currentTravel[idx].documentNumber) {
        newTravel.push(e);
      }
    step2({
      travelers: newTravel,
    });
    });
  };

  const validateAndNext = () => {
    try {
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
      <h2 className="text-xl font-semibold">Experience Information</h2>
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
          {formData.step2.travelers.map((traveler, idx) => (
          <div key={idx} className="mt-5 border p-4 rounded-lg bg-gray-50">
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-900">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={traveler.name}
                onChange={(e) => handleExperienceChange(e, idx)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-900">
                Birth Date:
              </label>
              <input
                type="date"
                name="birthDate"
                value={traveler.birthDate}
                onChange={(e) => handleExperienceChange(e, idx)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-900">
                Document Type:
              </label>
              <select
                name="documentType"
                value={traveler.documentType}
                onChange={(e) => handleExperienceChange(e, idx)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option value="passport">Passport</option>
                <option value="id">ID</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-900">
                Document Number:
              </label>
              <input
                type="text"
                name="documentNumber"
                value={traveler.documentNumber}
                onChange={(e) => handleExperienceChange(e, idx)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <button
              className="text-white bg-red-500 px-3 py-1 rounded-lg text-lg sm:text-xl"
              onClick={() => removeExperience(idx)}
            >
              Remove
            </button>
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

function setError(arg0: any) {
  throw new Error("Function not implemented.");
}
