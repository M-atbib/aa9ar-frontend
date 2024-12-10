"use client";

import { MdOutlineHome, MdOutlineLocalPhone } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

const navItems = [
  { label: "Accueil", href: "/", icon: <MdOutlineHome /> },
  {
    label: "À propos de nous",
    href: "/about",
    icon: <IoMdInformationCircleOutline />,
  },
  { label: "Contactez-nous", href: "/contact", icon: <MdOutlineLocalPhone /> },
];

export default function HomeNavbar() {
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
        <Button size="sm">
          <Link href="/signup" className="flex items-center gap-2">
            S&apos;inscrire
          </Link>
        </Button>
        <Button variant="outline" size="sm">
          <Link href="/login" className="flex items-center gap-2">
            Se connecter
          </Link>
        </Button>
      </div>
    </div>
  );
}
