"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Eye, PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProjectList() {
  const router = useRouter();

  const projects = [
    {
      id: "1",
      title: "Project 1",
      address: "Casablanca",
      budget: 100000,
      status: "En cours",
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: "2",
      title: "Project 2",
      address: "Casablanca",
      budget: 100000,
      status: "En cours",
      startDate: new Date(),
      endDate: new Date(),
    },
  ];

  const handleDelete = (title: string) => {
    console.log(title);
  };

  const handleAdd = () => {
    router.push("/project-add");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <Link key={project.title} href={`/project/${project.id}`}>
          <Card className="bg-primaryDark text-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.address}</CardDescription>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className="hover:bg-primary/20 rounded-full">
                  <BsThreeDotsVertical className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Link href={`/project/${project.id}/details`}>
                      <Eye className="h-4 w-4" />
                      <span>Voir plus</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer text-red-600"
                    onClick={() => handleDelete(project.title)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Supprimer</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>

            <CardContent>
              <ul>
                <li>
                  <span className="font-bold">Status:</span> {project.status}
                </li>
                <li>
                  <span className="font-bold">Budget:</span> {project.budget}
                </li>
                <li>
                  <span className="font-bold">Start Date:</span>{" "}
                  {project.startDate.toLocaleDateString()}
                </li>
                <li>
                  <span className="font-bold">End Date:</span>{" "}
                  {project.endDate.toLocaleDateString()}
                </li>
              </ul>
            </CardContent>
          </Card>
        </Link>
      ))}

      <Card
        className="flex items-center justify-center border-dashed border-2 border-primary rounded-lg text-primary cursor-pointer"
        onClick={() => handleAdd()}
      >
        <PlusCircle className="h-10 w-10" />
      </Card>
    </div>
  );
}
