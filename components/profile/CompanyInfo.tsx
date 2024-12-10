"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useCompanyStore } from "@/stores/companyStore";

export default function CompanyInfo() {
  const { company, updateCompany, isLoading } = useCompanyStore();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
  });

  useEffect(() => {
    if (company) {
      setFormData({
        name: company?.name || "",
        city: company?.city || "",
      });
    }
  }, [company]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCompany(company?.id || "", formData);
    } catch {
      toast.error("Échec de la mise à jour du profil");
    }
  };

  const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-[70%]">
      <div className="space-y-1">
        <Label className="text-sm">Nom de la société</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nom de la société"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-sm">Ville</Label>
        <Input
          id="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Paris"
        />
      </div>

      <Button type="submit" className="w-fit float-right" disabled={isLoading}>
        {isLoading ? "Mise à jour..." : "Mettre à jour"}
      </Button>
    </form>
  );
}
