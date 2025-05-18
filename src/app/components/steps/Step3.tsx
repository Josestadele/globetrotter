"use client";
import { useState } from "react";
import useAppStore from "@/app/Store/store";

export default function Step3() {
  const [extraLuggage, setExtraLuggage] = useState(false);
  const [luggageCount, setLuggageCount] = useState(0);
  const { nextStep, prevStep,formData } = useAppStore();

    const validateAndNext = () => {
      try {
        /* step1Schema.parse(formData.step1); */
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
      <h2>Servicios Adicionales</h2>
      <label>Seguro de viaje:
        <input type="checkbox" />
      </label>

      <label>Seleccionar asientos preferenciales:
        <input type="checkbox" />
      </label>

      <label>Requiere asistencia especial:
        <input type="checkbox" />
      </label>

      {extraLuggage && (
        <label>Maletas extra:
          <input type="number" min="0" value={luggageCount} onChange={(e) => setLuggageCount(parseInt(e.target.value))} />
        </label>
      )}

      <button onClick={prevStep}>Anterior</button>
      <button onClick={validateAndNext}>Siguiente</button>
    </div>
  );
}

function setError(arg0: any) {
  throw new Error("Function not implemented.");
}
