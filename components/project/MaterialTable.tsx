"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Material } from "@/types/folders-type";
import { useMaterialStore } from "@/stores/materialStore";
import { useParams } from "next/navigation";
import NoData from "../layout/NoData";

interface MaterialTableProps {
  data: Material[] | null;
}

export default function MaterialTable({ data }: MaterialTableProps) {
  const { id } = useParams();
  const { updateMaterial, deleteMaterial } = useMaterialStore();

  const handleUpdate = async (material: Material) => {
    try {
      await updateMaterial(material.project_id, id as string, material);
    } catch (error) {
      console.error("Failed to update material:", error);
    }
  };

  const handleDelete = async (material: Material) => {
    try {
      await deleteMaterial(material.project_id, id as string);
    } catch (error) {
      console.error("Failed to delete material:", error);
    }
  };

  return (
    <div className="border w-full">
      {data && data.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Libellé</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Unité</TableHead>
              <TableHead>Prix unitaire</TableHead>
              <TableHead>Coût total</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(data) &&
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.entry_date}</TableCell>
                  <TableCell>{item.label}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.unit_cost} DH</TableCell>
                  <TableCell>{item.quantity * item.unit_cost} DH</TableCell>
                  <TableCell>{item.note}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdate(item)}
                        className="h-8 w-8 text-blue-600 hover:text-blue-700"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item)}
                        className="h-8 w-8 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <NoData
          title="Aucun matériel"
          inform="Il n'y a aucun matériel à afficher pour le moment."
        />
      )}
    </div>
  );
}
