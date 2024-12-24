"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import { FormEvent, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "@/stores/authStore";
import { useRouter ,useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function Login() {
  toast.error('test');

  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const formFields = [
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
  ];

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

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
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setErrors((prev) => ({
        ...prev,
        email: "Email ou mot de passe incorrect",
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        email: "L\'adresse email est deja existé ",
      }));
    }
  }, [searchParams]);

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent('http://localhost:3000/googlecallback')}&response_type=code&scope=email profile&access_type=offline`;
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
          Retour à l&apos;accueil
        </Link>
        <h1 className="text-3xl font-bold text-primary mb-8">
          Content de te revoir !
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Entrez vos identifiants pour accéder à votre compte
        </p>

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

          <div className="flex justify-end items-center">
            <Link href="#" className="text-sm text-primary">
              Mot de passe oublié
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full relative"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Connexion...</span>
              </div>
            ) : (
              "Se connecter"
            )}
          </Button>

          <div className="flex items-center gap-2">
            <span className="w-full h-[1px] bg-gray-300"></span>
            ou
            <span className="w-full h-[1px] bg-gray-300"></span>
          </div>

          <div className="flex justify-center items-center gap-2">
            <p>Je n&apos;ai pas de compte ? </p>
            <Link href="/signup" className="text-primary">
              Créer un compte
            </Link>
          </div>

          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={handleGoogleLogin}
          >
            <FcGoogle />
            Se connecter avec Google
          </Button>
        </form>
      </div>
      <div className="w-[50%]">
        <Image
          src="/images/login.jpg"
          alt="aa9ar"
          width={200}
          height={200}
          className="w-full max-h-screen object-cover rounded-l-lg"
        />
      </div>
    </div>
  );
}
