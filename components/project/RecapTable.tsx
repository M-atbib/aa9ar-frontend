"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Recap } from "@/types/folders-type";

interface RecapTableProps {
  data: Recap[] | null;
}

export default function RecapTable({ data }: RecapTableProps) {
  // Group data by designation
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
    const item = Array.isArray(data)
      ? data.find((item) => item.designation === category)
      : null;
    return {
      category,
      total: item?.total_price || 0,
      partners: item?.partners || [],
    };
  });

  return (
    <div className="border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Total Cost</TableHead>
            {totals[0]?.partners.map((partner, index) => (
              <TableHead key={index}>{partner.name} share</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {totals.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.total.toFixed(2)} DH</TableCell>
              {row.partners.map((partner, index) => (
                <TableCell key={index}>
                  {partner.amount.toFixed(2)} DH
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow className="font-bold">
            <TableCell>Total</TableCell>
            <TableCell>
              {totals.reduce((sum, row) => sum + row.total, 0).toFixed(2)} DH
            </TableCell>
            {totals[0]?.partners.map((_, partnerIndex) => (
              <TableCell key={partnerIndex}>
                {totals
                  .reduce(
                    (sum, row) =>
                      sum + (row.partners[partnerIndex]?.amount || 0),
                    0
                  )
                  .toFixed(2)}{" "}
                DH
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
