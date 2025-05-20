"use client";
import useAppStore from "@/app/Store/store";

export default function Step4() {
  const { prevStep,submitForm } = useAppStore();
  return (
    <div>
        <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow p-4 sm:p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">Resumen y Confirmación</h2>
          <div className="divide-y divide-gray-100">
            <div className="py-2">
              <h3 className="text-base font-medium text-gray-700 mb-1">Detalles del viaje</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li><span className="font-medium">Destino:</span> {useAppStore.getState().formData.step1.destination}</li>
                <li><span className="font-medium">Fecha de salida:</span> {useAppStore.getState().formData.step1.departureDate}</li>
                <li><span className="font-medium">Fecha de regreso:</span> {useAppStore.getState().formData.step1.returnDate}</li>
                <li><span className="font-medium">Clase de vuelo:</span> {useAppStore.getState().formData.step1.flightClass}</li>
                <li><span className="font-medium">Viajeros:</span> {useAppStore.getState().formData.step2.travelerCount}</li>
                <li><span className="font-medium">Mascotas:</span> {useAppStore.getState().formData.step2.pets ? "Sí" : "No"}</li>
                <li><span className="font-medium">Nº de mascotas:</span> {useAppStore.getState().formData.step2.petCount}</li>
                <li><span className="font-medium">Equipaje adicional:</span> {useAppStore.getState().formData.step2.extraLuggage ? "Sí" : "No"}</li>
                <li><span className="font-medium">Seguro de viaje:</span> {useAppStore.getState().formData.step3.travelInsurance ? "Sí" : "No"}</li>
                <li><span className="font-medium">Asientos preferidos:</span> {useAppStore.getState().formData.step3.preferredSeats ? "Sí" : "No"}</li>
                <li><span className="font-medium">Asistencia especial:</span> {useAppStore.getState().formData.step3.specialAssistance ? "Sí" : "No"}</li>
                {useAppStore.getState().formData.step3.assistanceNote && (
                  <li>
                    <span className="font-medium">Nota de asistencia:</span> {useAppStore.getState().formData.step3.assistanceNote}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

      <div className="flex justify-between mt-5">
        <button
          className="text-blue-500 text-sm px-1 py-0.5 rounded hover:bg-blue-200 transition"
          onClick={prevStep}
        >
          {"\u2190"} Previous
        </button>
        <button
          className="text-blue-500 text-sm px-1 py-0.5 rounded hover:bg-blue-200 transition"
          onClick={submitForm}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
