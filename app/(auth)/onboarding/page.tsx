"use client";

import StepOne from "@/components/onboarding/StepOne";
import StepTwo from "@/components/onboarding/StepTwo";
import Image from "next/image";
import { useOnboardingStore } from "@/stores/onboardingStore";
import StepThree from "@/components/onboarding/StepThree";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Loader2 } from "lucide-react";

export default function Onboarding() {
  // TODO: add setStep here
  const router = useRouter();
  const { step } = useOnboardingStore();
  const { fetchUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await fetchUser();
        if (user.status === "ACTIVE") {
          router.push("/dashboard");
          return;
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [fetchUser, router]);

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
      {isLoading ? (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <Loader2 className="animate-spin w-10 h-10" />
        </div>
      ) : (
        renderStep()
      )}
    </div>
  );
}
