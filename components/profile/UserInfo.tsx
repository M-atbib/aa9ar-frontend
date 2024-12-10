"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Label } from "@radix-ui/react-dropdown-menu";

export default function UserInfo() {
  const { user, updateUser, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.full_name || "",
        email: user.email || "",
        phone: "", // These fields don't exist in User type
        address: "", // These fields don't exist in User type
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(formData);
    } catch {
      toast.error("Échec de la mise à jour du profil");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-[70%] ">
      <div className="space-y-1">
        <Label className="text-sm">Nom complet</Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Jean Dupont"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-sm">Adresse e-mail</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="jean.dupont@example.com"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-sm">Numéro de téléphone</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+33 6 12 34 56 78"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-sm">Emplacement</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Paris, France"
        />
      </div>

      <Button type="submit" className="w-fit float-right" disabled={isLoading}>
        {isLoading ? "Mise à jour..." : "Mettre à jour le profil"}
      </Button>
    </form>
  );
}
