"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/stores";
import { Info } from "lucide-react";

export default function ErrorAlert() {
  const { error, setError } = useAppStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      // Auto-dismiss the error after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setError(null);
        }, 300); // Wait for animation to complete
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  if (!error) return null;

  return (
    <div
      className={`fixed top-20 right-4 z-50 max-w-md flex items-center gap-2 p-3 bg-red-100 rounded-lg shadow-md transition-all duration-300 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      }`}
    >
      <Info className="h-4 w-4" />
      <p>{error.message}</p>
    </div>
  );
}
