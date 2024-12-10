"use client";

import { IoMdAdd } from "react-icons/io";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { MdDeleteSweep } from "react-icons/md";
import { useCompanyStore } from "@/stores/companyStore";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import { useState } from "react";
import { useInviteStore } from "@/stores/invitesStore";
import { toast } from "sonner";
import { InvitedPartner } from "@/types/invites-type";

const AddPartnerDialog = () => {
  const [formData, setFormData] = useState({
    email: "",
    percentage: "",
  });
  const { sendInvitation, isLoading } = useInviteStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendInvitation(formData.email, Number(formData.percentage));
      toast.success("Invitation envoyée avec succès");
    } catch {
      toast.error("Échec de l'envoi de l'invitation");
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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="float-right mb-4">
          Ajouter un partenaire
          <IoMdAdd />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un partenaire</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label>Adresse Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="exemple@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label>Pourcentage</Label>
            <Input
              id="percentage"
              type="number"
              placeholder="50"
              value={formData.percentage}
              onChange={handleChange}
            />
          </div>
          <Button
            type="submit"
            className="mt-4 float-right"
            disabled={isLoading}
          >
            {isLoading ? "Envoi..." : "Envoyer l'invitation"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default function PartnerInfo() {
  const { projectPartners } = useCompanyStore();

  return (
    <div>
      <AddPartnerDialog />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Adresse Email</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projectPartners.map((partner: InvitedPartner) => (
            <TableRow key={partner._id}>
              <TableCell>{partner.email}</TableCell>
              <TableCell>{partner.status}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <MdDeleteSweep />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
