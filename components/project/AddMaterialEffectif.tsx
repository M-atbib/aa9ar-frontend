"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";

interface AddMaterialEffectifProps {
  type: "material" | "effectif";
  onSubmit: (data: {
    date: string;
    label: string;
    quantity: number;
    measureUnit: string;
    pricePerUnit: number;
    note?: string;
  }) => void;
}

export default function AddMaterialEffectif({
  type,
  onSubmit,
}: AddMaterialEffectifProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    label: "",
    quantity: 0,
    measureUnit: "",
    pricePerUnit: 0,
    note: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setOpen(false);
    setFormData({
      date: "",
      label: "",
      quantity: 0,
      measureUnit: "",
      pricePerUnit: 0,
      note: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "pricePerUnit" ? Number(value) : value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Ajouter {type === "material" ? "Matériel" : "Effectif"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Ajouter {type === "material" ? "un matériel" : "un effectif"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Remplissez les informations ci-dessous pour ajouter{" "}
            {type === "material" ? "un nouveau matériel" : "un nouvel effectif"}{" "}
            au projet.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Libellé</Label>
              <Input
                id="label"
                name="label"
                value={formData.label}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Quantité</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Unité de mesure</Label>
              <Input
                id="measureUnit"
                name="measureUnit"
                value={formData.measureUnit}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Prix unitaire</Label>
              <Input
                id="pricePerUnit"
                name="pricePerUnit"
                type="number"
                value={formData.pricePerUnit}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Note</Label>
              <Input
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Ajouter</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
