"use client";
import { FaPeopleGroup } from "react-icons/fa6";
import { BsFillBuildingsFill } from "react-icons/bs";
import { IoDocuments } from "react-icons/io5";
import { FaMoneyBillWave } from "react-icons/fa";
import { BsBricks } from "react-icons/bs";
import { MdArrowForward } from "react-icons/md";
import Link from "next/link";

export default function Folders() {
  const id = 1;

  const folders = [
    { name: "Materiaux", icon: <BsBricks />, link: `/project/${id}/material` },
    {
      name: "Effectifs",
      icon: <FaPeopleGroup />,
      link: `/project/${id}/effectif`,
    },
    {
      name: "Unites",
      icon: <BsFillBuildingsFill />,
      link: `/project/${id}/units`,
    },
    {
      name: "Documents administratifs",
      icon: <IoDocuments />,
      link: `/project/${id}/legal-paper`,
    },
    {
      name: "Autres depenses",
      icon: <FaMoneyBillWave />,
      link: `/project/${id}/other-expenses`,
    },
  ];

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {folders.map((folder) => (
        <Link
          key={folder.name}
          href={folder.link}
          className="min-w-[20vw] flex items-center gap-3"
        >
          <div className="text-3xl bg-primaryDark text-white rounded-md p-4">
            {folder.icon}
          </div>
          <p className="text-xl font-medium">{folder.name}</p>
          <MdArrowForward className="w-5 h-5 text-primaryDark" />
        </Link>
      ))}
    </div>
  );
}
