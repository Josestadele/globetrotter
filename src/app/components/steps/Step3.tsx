"use client";

import useAppStore from "@/app/Store/store";
import { useState } from "react";
import { step3Schema } from "@/app/schema/flightSchema";

export default function Step3() {

  const { nextStep, prevStep,formData ,step3 } = useAppStore();
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    step3({ [e.target.name]: e.target.checked });
  };

    const validateAndNext = () => {
      try {
        console.log("formData.step3", formData.step3);
         step3Schema.parse(formData.step3);
        console.log("formData.step1", formData.step3);
        nextStep();
      } catch (error: any) {
        setError(
          error.errors[0]?.message || "Please fill all teh fields correctly."
        );
      }
    };
  return (
    <div>
      <div className="flex flex-row flex-wrap gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            name="preferredSeats"
            checked={formData.step3.preferredSeats}
            onChange={handleChange}
            className="h-4 w-4 text-blue-500 border-blue-200 rounded focus:ring-blue-300 transition"
          />
          ¿Asientos preferidos?
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            name="travelInsurance"
            checked={formData.step3.travelInsurance}
            onChange={handleChange}
            className="h-4 w-4 text-blue-500 border-blue-200 rounded focus:ring-blue-300 transition"
          />
          ¿Seguro para viajes?
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            name="specialAssistance"
            checked={formData.step3.specialAssistance}
            onChange={handleChange}
            className="h-4 w-4 text-blue-500 border-blue-200 rounded focus:ring-blue-300 transition"
          />
          ¿Asistencia especial?
        </label>
      </div>
      {formData.step3.specialAssistance === true && (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="specialAssistanceNote">
            Especifica la asistencia requerida:
          </label>
          <textarea
            name="assistanceNote"
            maxLength={200}
            className="w-full rounded-md border border-blue-100 p-2 text-gray-800 text-xs focus:outline-none focus:border-blue-300 transition"
            value={formData.step3.assistanceNote || ""}
            onChange={(e) => step3({ assistanceNote: e.target.value })}
            rows={3}
            placeholder="Describe la asistencia especial que necesitas"
          />
        </div>
      )}

      {/* buttons */}
      <div className="flex justify-between mt-6">
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


