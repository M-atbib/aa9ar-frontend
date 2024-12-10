"use client";

import { MdLogout, MdOutlineHome, MdOutlineLocalPhone } from "react-icons/md";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { LucideUserCircle } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

const navItems = [
  { label: "Tableau de bord", href: "/dashboard", icon: <MdOutlineHome /> },

  {
    label: "Modéles de documents",
    href: "/templates",
    icon: <MdOutlineLocalPhone />,
  },
];

export default function AdminNavbar() {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex justify-between items-center h-16 w-[90%] mx-auto my-5 px-5 bg-primaryDark text-white  rounded-md shadow-md">
      <Image src="/logo/main.png" alt="aa9ar" width={100} height={100} />

      <div className="flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className="flex items-center gap-2"
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <MdLogout />
        </Button>
        <Button variant="ghost" size="sm">
          <Link
            href="/profile"
            className="flex items-center gap-2 cursor-pointer"
          >
            Profile <LucideUserCircle />
          </Link>
        </Button>
      </div>
    </div>
  );
}
