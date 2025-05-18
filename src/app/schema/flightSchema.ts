import { z } from "zod";

export const step1Schema = z.object({
  destination: z.string().min(3, "El destino es obligatorio"),
  departureDate: z.string().refine((date) => new Date(date) > new Date(), {
    message: "La fecha de salida debe ser futura",
  }),
  returnDate: z.string().refine((date) => new Date(date) > new Date(), {
    message: "La fecha de regreso debe ser futura",
  }),
  flightClass: z.enum(["economy", "business", "first"]),
});

export const step2Schema = z.object({
  travelerCount: z.number().min(1, "Debe haber al menos un viajero").max(10, "Máximo 10 viajeros"),
  travelers: z.array(
    z.object({
      name: z.string().min(3, "El nombre es obligatorio"),
      birthDate: z.string(),
      documentType: z.enum(["passport", "id"]),
      documentNumber: z.string().min(5, "Número de documento inválido"),
    })
  ),
  pets: z.boolean(),
  petCount: z.number().optional(),
  extraLuggage: z.boolean(),
  luggageCount: z.number().optional(),
});

export const step3Schema = z.object({
  travelInsurance: z.boolean(),
  preferredSeats: z.boolean(),
  specialAssistance: z.boolean(),
  assistanceNote: z.string().max(200, "Máximo 200 caracteres").optional(),
});

export const formDataSchema = z.object({
  step1: step1Schema,   
  step2: step2Schema,
  step3: step3Schema,   
})

export type FormData = z.infer<typeof formDataSchema>;
export type Step1 = z.infer<typeof step1Schema>;
export type Step2 = z.infer<typeof step2Schema>;    
export type Step3 = z.infer<typeof step3Schema>; 

export type Step1Data = {
    destination: string; 
    departureDate: string;
    returnDate: string;
    flightClass: "economy" | "business" | "first";
}

export type Step2Data = {
    travelerCount: number;      
    travelers: {
        name: string;                   
        birthDate: string;
        documentType: "passport" | "id";
        documentNumber: string;
    }
}

export type Step3Data = {
    travelInsurance: boolean;
    preferredSeats: boolean;
    specialAssistance: boolean;
    assistanceNote?: string;
}
