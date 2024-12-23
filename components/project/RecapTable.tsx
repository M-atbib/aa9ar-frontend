"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RecapTableProps {
  data: {
    date: string;
    label: string;
    quantity: number;
    measureUnit: string;
    pricePerUnit: number;
    note?: string;
  }[];
  onUpdate?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function RecapTable({ data }: RecapTableProps) {
  // Group data by label and calculate totals
  const categories = [
    "Gros oeuvre",
    "Electricite",
    "Plomberie",
    "Menuiserie bois",
    "Menuiserie aluminium",
    "Revetement",
    "Fausse plafond",
    "Peinture",
  ];

  const totals = categories.map((category) => {
    const items = data.filter((item) => item.label === category);
    const total = items.reduce(
      (sum, item) => sum + item.quantity * item.pricePerUnit,
      0
    );
    return {
      category,
      total,
      partner1Share: total * 0.5, // Assuming 50-50 split
      partner2Share: total * 0.5,
    };
  });

  return (
    <div className="border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Total Cost</TableHead>
            <TableHead>Partner1 share</TableHead>
            <TableHead>Partner2 share</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {totals.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.total.toFixed(2)} DH</TableCell>
              <TableCell>{row.partner1Share.toFixed(2)} DH</TableCell>
              <TableCell>{row.partner2Share.toFixed(2)} DH</TableCell>
            </TableRow>
          ))}
          <TableRow className="font-bold">
            <TableCell>Total</TableCell>
            <TableCell>
              {totals.reduce((sum, row) => sum + row.total, 0).toFixed(2)} DH
            </TableCell>
            <TableCell>
              {totals
                .reduce((sum, row) => sum + row.partner1Share, 0)
                .toFixed(2)}{" "}
              DH
            </TableCell>
            <TableCell>
              {totals
                .reduce((sum, row) => sum + row.partner2Share, 0)
                .toFixed(2)}{" "}
              DH
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
