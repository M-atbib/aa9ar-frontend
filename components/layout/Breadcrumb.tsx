"use client";

import {
  Breadcrumb as BreadcrumbContainer,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { ChevronRight, HomeIcon } from "lucide-react";

interface BreadcrumbProps {
  items: {
    link: string;
    title: string;
  }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <BreadcrumbContainer>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard" className="flex items-center gap-2">
            <HomeIcon className="h-4 w-4" />
            Tableau de bord
          </BreadcrumbLink>
        </BreadcrumbItem>
        {items.map((item, index) => (
          <BreadcrumbItem key={`item-${index}`}>
            <ChevronRight className="h-4 w-4" />
            <BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
}
