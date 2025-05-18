

"use client";
import { use} from "react";
use

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
    <div className="flex justify-center py-10">
      <div className="bg-gray-100 rounded-lg w-full p-10 mx-5">
        <div className="pt-2 mb-5 text-center text-2xl sm:text-3xl font-semibold">
          Travel
        </div>
        {/* progress bar */}
        <ProgressBar />

        {/* steps */}
        <div>{renderStep()}</div>
      </div>
    </div>
  );
}