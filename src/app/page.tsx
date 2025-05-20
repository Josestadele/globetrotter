

"use client";
import { use} from "react";
import Step1 from "./components/steps/Step1";
import Step2 from "./components/steps/Step2";
import Step3 from "./components/steps/Step3";
import Step4 from "./components/steps/Step4";
import useAppStore from "./Store/store";
import ProgressBar from "./components/ProgresBar/progresBar";

export default function Stepper() {
  const { step } = useAppStore();

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      default:
        return null
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white rounded-xl w-full max-w-[700px] p-8 shadow-2xl shadow-gray-500/30">
          <div className="text-center text-xl sm:text-2xl font-medium text-blue-400 tracking-tight mb-4  rounded-lg bg-white py-2">
            Globetrotter Travel
          </div>
        {/* progress bar */}
        <ProgressBar />

        {/* steps */}
        <div>{renderStep()}</div>
      </div>
    </div>
  );
}