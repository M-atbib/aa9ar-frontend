"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

interface AddOtherExpensesProps {
  onSubmit: (data: {
    date: string;
    label: string;
    quantity: number;
    pricePerUnit: number;
    note?: string;
    partner1Share: number;
    partner2Share: number;
  }) => void;
}

export default function AddOtherExpenses({ onSubmit }: AddOtherExpensesProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    label: "",
    quantity: 0,
    pricePerUnit: 0,
    note: "",
    partner1Share: 0,
    partner2Share: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setOpen(false);
    setFormData({
      date: "",
      label: "",
      quantity: 0,
      pricePerUnit: 0,
      note: "",
      partner1Share: 0,
      partner2Share: 0,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity" ||
        name === "pricePerUnit" ||
        name === "partner1Share" ||
        name === "partner2Share"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Ajouter une dépense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle dépense</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <label htmlFor="date">Date</label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="label">Libellé</label>
            <Input
              id="label"
              name="label"
              value={formData.label}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="quantity">Quantité</label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              step="any"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="pricePerUnit">Prix unitaire</label>
            <Input
              id="pricePerUnit"
              name="pricePerUnit"
              type="number"
              min="0"
              step="any"
              value={formData.pricePerUnit}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="partner1Share">Part du partenaire 1</label>
            <Input
              id="partner1Share"
              name="partner1Share"
              type="number"
              min="0"
              max="100"
              value={formData.partner1Share}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="partner2Share">Part du partenaire 2</label>
            <Input
              id="partner2Share"
              name="partner2Share"
              type="number"
              min="0"
              max="100"
              value={formData.partner2Share}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="note">Note</label>
            <Textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full">
            Ajouter
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
