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
import { Workforce } from "@/types/folders-type";
import { useParams } from "next/navigation";
import { useWorkforceStore } from "@/stores/workforceStore";
import NoData from "../layout/NoData";

interface EffectifTableProps {
  data: Workforce[];
}

export default function EffectifTable({ data }: EffectifTableProps) {
  const { id } = useParams();
  const { updateWorkforce, deleteWorkforce } = useWorkforceStore();

  const handleUpdate = async (workforce: Workforce) => {
    try {
      await updateWorkforce(workforce.project_id, id as string, workforce);
    } catch (error) {
      console.error("Failed to update workforce:", error);
    }
  };

  const handleDelete = async (workforce: Workforce) => {
    try {
      await deleteWorkforce(workforce.project_id, id as string);
    } catch (error) {
      console.error("Failed to delete workforce:", error);
    }
  };
  return (
    <div className="border w-full">
      {data.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Libellé</TableHead>
              <TableHead>Coût total</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.entry_date}</TableCell>
                <TableCell>{item.label}</TableCell>
                <TableCell>{item.total_cost}</TableCell>
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
          title="Aucune main d'oeuvre"
          inform="Il n'y a aucune main d'oeuvre à afficher pour le moment."
        />
      )}
    </div>
  );
}
