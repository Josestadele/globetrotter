"use client";
import useAppStore from "@/app/Store/store";

export default function Step4() {
  const { nextStep, prevStep,submitForm } = useAppStore();
  return (
    <div>
      <h2>Resumen y Confirmación</h2>
      <p>Detalles del viaje...</p>
      <button onClick={prevStep}>Anterior</button>
      <button onClick={submitForm}>Confirmar Reserva</button>
    </div>
  );
}
