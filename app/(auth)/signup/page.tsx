"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import { FormEvent, useState, useEffect, Suspense } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "@/stores/authStore";
import { useRouter, useSearchParams } from "next/navigation";

function SignupContent() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const formFields = [
    {
      label: "Nom et Prénom",
      name: "username",
      type: "text",
      placeholder: "Entrez votre nom complet",
      value: formData.username,
      error: errors.username,
    },
    {
      label: "Adresse email",
      name: "email",
      type: "email",
      placeholder: "exemple@email.com",
      value: formData.email,
      error: errors.email,
    },
    {
      label: "Mot de passe",
      name: "password",
      type: "password",
      placeholder: "••••••••",
      value: formData.password,
      error: errors.password,
    },
    {
      label: "Confirmer le mot de passe",
      name: "confirmPassword",
      type: "password",
      placeholder: "••••••••",
      value: formData.confirmPassword,
      error: errors.confirmPassword,
    },
  ];

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.username.trim()) {
      newErrors.username = "Le nom est requis";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "La confirmation du mot de passe est requise";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await register({
        full_name: formData.username,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });
      router.push("/onboarding");
    } catch (error) {
      console.log("Registration failed:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "auth_failed") {
      setErrors((prev) => ({
        ...prev,
        email: "L'authentification Google a échoué",
      }));
    }
  }, [searchParams]);

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    }&redirect_uri=${encodeURIComponent(
      "http://localhost:3000/googlecallback"
    )}&response_type=code&scope=email profile&access_type=offline`;
  };

  return (
    <div className="flex justify-between">
      <div className="w-[50%] pl-16 mt-14">
        <Image
          src="/logo/main.png"
          alt="aa9ar"
          width={100}
          height={100}
          className="w-28"
        />
        <Link href="/" className="flex items-center gap-2 my-9">
          <IoMdArrowBack />
          Retour
        </Link>
        <h1 className="text-3xl font-bold text-primary mb-8">
          Commence maintenant
        </h1>

        <form onSubmit={handleSubmit} className="w-2/3 space-y-6">
          {formFields.map((field) => (
            <div key={field.name} className="space-y-1">
              <Label>{field.label}</Label>
              <Input
                type={field.type}
                name={field.name}
                id={field.name}
                placeholder={field.placeholder}
                value={field.value}
                onChange={handleChange}
                className={field.error ? "border-red-500" : ""}
              />
              {field.error && (
                <p className="text-red-500 text-xs mt-1">{field.error}</p>
              )}
            </div>
          ))}

          <Button
            type="submit"
            className="w-full relative"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Inscription...</span>
              </div>
            ) : (
              "S'inscrire"
            )}
          </Button>

          <div className="flex items-center gap-2">
            <span className="w-full h-[1px] bg-gray-300"></span>
            ou
            <span className="w-full h-[1px] bg-gray-300"></span>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
          >
            <FcGoogle />
            S&apos;inscrire avec Google
          </Button>

          <div className="flex justify-center items-center gap-2">
            <p>Vous avez déjà un compte ?</p>
            <Link href="/login" className="text-primary">
              Se connecter
            </Link>
          </div>
        </form>
      </div>
      <div className="w-[50%] ">
        <Image
          src="/images/signup.jpeg"
          alt="aa9ar"
          width={200}
          height={200}
          className="w-full h-screen object-cover rounded-l-lg"
        />
      </div>
    </div>
  );
}

export default function Signup() {
  return (
    <Suspense>
      <SignupContent />
    </Suspense>
  );
}
