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

interface OtherExpenseTableProps {
  data: {
    date: string;
    label: string;
    quantity: number;
    pricePerUnit: number;
    note?: string;
    partner1Share: number;
    partner2Share: number;
  }[];
  onUpdate?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function OtherExpenseTable({
  data,
  onUpdate,
  onDelete,
}: OtherExpenseTableProps) {
  return (
    <div className="border w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Libellé</TableHead>
            <TableHead>Quantité</TableHead>
            <TableHead>Coût total</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Partner1 share</TableHead>
            <TableHead>Partner2 share</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.label}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.quantity * item.pricePerUnit} DH</TableCell>
              <TableCell>{item.note}</TableCell>
              <TableCell>{item.partner1Share}</TableCell>
              <TableCell>{item.partner2Share}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onUpdate?.(index)}
                    className="h-8 w-8 text-blue-600 hover:text-blue-700"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete?.(index)}
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
    </div>
  );
}
