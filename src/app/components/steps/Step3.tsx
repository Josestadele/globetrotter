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
      <div>
          <label
            className="text-lg font-medium text-gray-900"
            htmlFor="preferredSeats"
          >
            Asientos preferidos ?
          </label>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              name="preferredSeats"
              checked={formData.step3.preferredSeats}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 bg-gray-300 ruonded focus:ring-blue-500"
            />
          </div>

          <label
            className="text-lg font-medium text-gray-900"
            htmlFor="travelInsurance"
          >
            Seguro para viajes ?
          </label>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              name="travelInsurance"
              checked={formData.step3.travelInsurance}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 bg-gray-300 ruonded focus:ring-blue-500"
            />
          </div>
          <label
            className="text-lg font-medium text-gray-900"
            htmlFor="specialAssistance"
          >
            Asistencia Especial ?
          </label>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              name="specialAssistance"
              checked={formData.step3.specialAssistance}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 bg-gray-300 ruonded focus:ring-blue-500"
            />
          </div>
          {formData.step3.specialAssistance === true && (
            <div className="mt-4">
              <label className="block text-lg font-medium text-gray-900" htmlFor="specialAssistanceNote">
                Especifica la asistencia requerida:
              </label>
              <textarea
                name="assistanceNote"
                maxLength={200}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 text-sm"
                value={formData.step3.assistanceNote || ""}
                onChange={(e) => step3({ assistanceNote: e.target.value })}
                rows={3}
                placeholder="Describe la asistencia especial que necesitas"
              />
            </div>
          )}
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


