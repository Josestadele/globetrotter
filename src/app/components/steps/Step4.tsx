"use client";
import useAppStore from "@/app/Store/store";

export default function Step4() {
  const { prevStep,submitForm } = useAppStore();
  return (
    <div>
      <h2>Resumen y Confirmación</h2>
      <p>Detalles del viaje...</p>
      <div className="flex flex-col mt-5">
        <h3 className="text-lg font-medium text-gray-900">Detalles del viaje</h3>
        <p className="text-gray-700">
          {`Destino: ${useAppStore.getState().formData.step1.destination}`}
        </p>
        <p className="text-gray-700">
          {`Fecha de salida: ${useAppStore.getState().formData.step1.departureDate}`}
        </p>
        <p className="text-gray-700">
          {`Fecha de regreso: ${useAppStore.getState().formData.step1.returnDate}`}
        </p>
        <p className="text-gray-700">
          {`Clase de vuelo: ${useAppStore.getState().formData.step1.flightClass}`}
        </p>
        <p className="text-gray-700">
          {`Número de viajeros: ${useAppStore.getState().formData.step2.travelerCount}`}
        </p>
        <p className="text-gray-700">
          {`Mascotas: ${useAppStore.getState().formData.step2.pets ? "Sí" : "No"}`}
        </p>
        <p className="text-gray-700">
          {`Número de mascotas: ${useAppStore.getState().formData.step2.petCount}`}

        </p>
        <p className="text-gray-700">
          {`Equipaje adicional: ${useAppStore.getState().formData.step2.extraLuggage ? "Sí" : "No"}`}
        </p>
        <p className="text-gray-700">
          {`Número de maletas: ${useAppStore.getState().formData.step2.luggageCount}`}
        </p>
        <p className="text-gray-700">
          {`Seguro de viaje: ${useAppStore.getState().formData.step3.travelInsurance ? "Sí" : "No"}`}
        </p>
        <p className="text-gray-700">
          {`Asientos preferidos: ${useAppStore.getState().formData.step3.preferredSeats ? "Sí" : "No"}`}
        </p>

        <p className="text-gray-700">
          {`Asistencia especial: ${useAppStore.getState().formData.step3.specialAssistance ? "Sí" : "No"}`} 
        </p>
        <p className="text-gray-700">
          {`Nota de asistencia: ${useAppStore.getState().formData.step3.assistanceNote}`}
        </p>

      <div className="flex justify-between mt-5">
        <button
          className="text--blue-500 text-lg sm:text-xl"
          onClick={prevStep}
        >
          {"\u2190"} Previous
        </button>
        <button
          className="text-white bg-blue-500 px-3 py-1 rounded-lg text-lg sm:text-xl"
          onClick={submitForm}
        >
          Submit
        </button>
      </div>
      </div>
    </div>
  );
}
