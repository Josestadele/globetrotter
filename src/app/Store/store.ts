import { create } from "zustand";
import { Step1,Step2,Step3,FormData } from '../schema/flightSchema';



interface appStore{
    step: number;
    formData: FormData;
    nextStep: () => void;
    prevStep: () => void;
    getTotalSteps: () => number;
    setInformation: (data: Partial<FormData>) => void;
    step1: (data: Partial<Step1>) => void;
    step2: (data: Partial<Step2>) => void;
    step3: (data: Partial<Step3>) => void;
   
    submitForm: () => void;
}

const useAppStore = create<appStore>((set,get) => (
    {
    step: 1,
    formData: {
        step1: {
            destination: '',
            departureDate: '',
            returnDate: '',
            flightClass: 'economy',
        },
        step2: {
            travelerCount: 0,
            travelers: [],
            pets: false,
            petCount: 0,
            extraLuggage: false,
            luggageCount: 0
        },
        step3: {
            travelInsurance:false,
            preferredSeats: false,
            specialAssistance:false, 
            assistanceNote:'' 
        },
    },
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    prevStep: () => set((state) => ({ step: state.step - 1 })),
    getTotalSteps: () => {
        return Object.keys(get().formData).length+1;
    },
    setInformation: (data: Partial<FormData>) => set((state) => ({
        formData: { ...state.formData, ...data }
    })),
    step1: (data: Partial<Step1>) => set((state) => ({
        formData: { ...state.formData, step1: { ...state.formData.step1, ...data } }
    })),
    step2: (data: Partial<Step2>) => set((state) => ({
        formData: { ...state.formData, step2: { ...state.formData.step2, ...data } }
    })),
    step3: (data: Partial<Step3>) => set((state) => ({
        formData: { ...state.formData, step3: { ...state.formData.step3, ...data } }
    })),

    submitForm: () => {
        set((state) => {
            console.log("Form submitted Successfully!");
            console.log("Submitted Data: ", state.formData);
           return { 
               step: 1, 
               formData: { 
                   step1: { destination: '', departureDate: '', returnDate: '', flightClass: 'economy' }, 
                   step2: { travelerCount: 0, travelers: [], pets: false, petCount: 0, extraLuggage: false, luggageCount: 0 }, 
                   step3: { travelInsurance: false, preferredSeats: false, specialAssistance: false, assistanceNote: '' } 
               } 
           };
        });
    }
}))

export default useAppStore;