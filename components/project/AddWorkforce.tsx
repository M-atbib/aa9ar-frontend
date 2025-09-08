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
import { useWorkforceStore } from "@/stores/workforceStore";
import { Workforce } from "@/types/folders-type";
import { useParams } from "next/navigation";

interface AddWorkforceProps {
  categoryId?: string;
}

export default function AddWorkforce({ categoryId }: AddWorkforceProps) {
  const { id } = useParams();
  const { createWorkforce } = useWorkforceStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Workforce>({
    project_id: id as string,
    category_id: categoryId || "",
    entry_date: "",
    label: "",
    total_cost: 0,
    note: "",
  } as Workforce);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await createWorkforce(formData as Workforce);
    setOpen(false);
    setFormData({
      project_id: id as string,
      category_id: categoryId || "",
      entry_date: "",
      label: "",
      total_cost: 0,
      note: "",
    } as Workforce);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "total_cost" ? Number(value) : value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Ajouter main d&apos;oeuvre
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter main d&apos;oeuvre</DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Remplissez les informations ci-dessous pour ajouter une nouvelle
            main d&apos;oeuvre au projet.
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
              <Label>Coût total</Label>
              <Input
                id="total_cost"
                name="total_cost"
                type="number"
                value={formData.total_cost}
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
