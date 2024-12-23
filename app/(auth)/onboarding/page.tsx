"use client";

import StepOne from "@/components/onboarding/StepOne";
import StepTwo from "@/components/onboarding/StepTwo";
import Image from "next/image";
import { useOnboardingStore } from "@/stores/onboardingStore";
import StepThree from "@/components/onboarding/StepThree";
// import { useEffect } from "react";

export default function Onboarding() {
  // TODO: add setStep here
  const { step } = useOnboardingStore();

  // useEffect(() => {
  //   // TODO: add api of invitation
  //   setStep(3);
  // }, []);

  const renderStep = () => {
    console.log(step);
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
    }
  };

  return (
    <div className="w-[50%] mx-auto my-10">
      <Image
        src="/logo/main.png"
        alt="aa9ar"
        width={200}
        height={200}
        className="w-32 mx-auto mb-16"
      />
      {/*  */}
      {renderStep()}
    </div>
  );
}
