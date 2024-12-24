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
import { useState, useEffect } from "react";
import { useInviteStore } from "@/stores/invitesStore";
import { toast } from "sonner";
import { InvitedPartner } from "@/types/invites-type";

const AddPartnerDialog = () => {
  const [formData, setFormData] = useState({
    email: "",
    percentage: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const { sendInvitation, isLoading, getCompanyInvitations } = useInviteStore();
  const { company } = useCompanyStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendInvitation(formData.email, Number(formData.percentage));
      toast.success("Invitation envoyée avec succès");

      setFormData({ email: "", percentage: "" });

      if (company?.id) {
        await getCompanyInvitations(company?.id);
      }

      setIsOpen(false);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              required
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
              required
              min="0"
              max="100"
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
  const { company } = useCompanyStore();
  const { getCompanyInvitations, invitations, isLoading, deleteInvitation } = useInviteStore();

  const fetchInvitations = async () => {
    if (company?.id) {
      try {
        await getCompanyInvitations(company.id);
      } catch (error) {
        toast.error("Échec du chargement des invitations");
      }
    }
  };

  const handleDeleteInvitation = async (invitationId: string) => {
    try {
      await deleteInvitation(invitationId);
      toast.success("Invitation supprimée avec succès");
    } catch (error) {
      toast.error("Échec de la suppression de l'invitation");
    }finally{
      fetchInvitations();
    }
  };


  useEffect(() => {
    
    fetchInvitations();
  }, [company, getCompanyInvitations]);

 
  return (
    <div>
      <AddPartnerDialog />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Adresse Email</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date d'expiration</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} style={{ textAlign: "center" }}>
                Chargement...
              </TableCell>
            </TableRow>
          ) : (
            invitations?.map(({ _id, email, status, expires_at }) => (
              <TableRow key={_id}>
                <TableCell>{email}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell
                  style={{
                    color: new Date(expires_at) < new Date() ? "red" : "green",
                  }}
                >
                  {new Date(expires_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteInvitation(_id)}
                  >
                    <MdDeleteSweep />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

      </Table>
    </div>
  );
}
