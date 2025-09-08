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
import { Loader2, PlusIcon } from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useMaterialStore } from "@/stores/materialStore";
import { Material } from "@/types/folders-type";
import { useParams } from "next/navigation";

interface AddMaterialProps {
  categoryId?: string;
}

export default function AddMaterial({ categoryId }: AddMaterialProps) {
  const { id } = useParams();
  const { createMaterial } = useMaterialStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Material>({
    project_id: id as string,
    category_id: categoryId || "",
    entry_date: "",
    label: "",
    quantity: 0,
    unit: "",
    unit_cost: 0,
    note: "",
  } as Material);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await createMaterial(formData);
    setOpen(false);
    setFormData({
      project_id: id as string,
      category_id: categoryId || "",
      entry_date: "",
      label: "",
      quantity: 0,
      unit: "",
      unit_cost: 0,
      note: "",
    } as Material);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "unit_cost" ? Number(value) : value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Ajouter un matériel
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Ajouter un matériel</DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Remplissez les informations ci-dessous pour ajouter un nouveau
            matériel au projet.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                id="entry_date"
                name="entry_date"
                type="date"
                value={formData.entry_date}
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
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Prix unitaire</Label>
              <Input
                id="unit_cost"
                name="unit_cost"
                type="number"
                value={formData.unit_cost}
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
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <PlusIcon className="h-4 w-4 mr-2" />
              )}
              Ajouter
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
