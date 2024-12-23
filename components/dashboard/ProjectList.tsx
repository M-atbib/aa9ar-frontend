"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Button } from "../ui/button";
import { useProjectStore } from "@/stores/projectStore";
import { Skeleton } from "../ui/skeleton";

export default function ProjectList({ isLoading }: { isLoading: boolean }) {
  const router = useRouter();
  const { projects } = useProjectStore();

  const handleDelete = (id: string) => {
    console.log(id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading ? (
        Array.from({ length: 2 }).map((_, index) => (
          <Card key={index} className=" bg-primaryDark text-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <Skeleton className="bg-white/20 w-[250px] h-[24px] mb-2" />
                <Skeleton className="bg-white/20 w-[200px] h-[20px]" />
              </div>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Skeleton className="bg-white/20 w-[240px] h-[20px]" />
                </li>
                <li>
                  <Skeleton className="bg-white/20 w-[200px] h-[20px]" />
                </li>
                <li>
                  <Skeleton className="bg-white/20 w-[200px] h-[20px]" />
                </li>
                <li>
                  <Skeleton className="bg-white/20 w-[170px] h-[20px]" />
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex items-center justify-end">
              <Skeleton className="bg-white/20 w-[150px] ml-auto h-[40px]" />
            </CardFooter>
          </Card>
        ))
      ) : (
        <>
          {projects.map((project) => (
            <Card key={project.id} className="bg-primaryDark text-white">
              <CardHeader className="flex flex-row items-center justify-between relative">
                <div>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.address}</CardDescription>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:bg-primary/20 rounded-full absolute top-6 right-6">
                    <BsThreeDotsVertical className="h-5 w-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <Link
                        href={`/project/${project.id}/details`}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Details du projet</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2 cursor-pointer text-red-600"
                      onClick={() => handleDelete(project.id)}
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
                    <span className="font-bold">Budget:</span>{" "}
                    {project.total_budget} Dh
                  </li>
                  <li>
                    <span className="font-bold">Start Date:</span>{" "}
                    {new Date(project.start_date).toLocaleDateString()}
                  </li>
                  <li>
                    <span className="font-bold">End Date:</span>{" "}
                    {new Date(project.end_date).toLocaleDateString()}
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex items-end justify-end">
                <Link href={`/project/${project.id}`}>
                  <Button className="w-full" variant="secondary">
                    Inspecter les Dossiers
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </>
      )}
      <Card
        className="flex flex-col items-center justify-center border-dashed border-2 border-primary rounded-lg text-primary cursor-pointer h-full max-h-[300px] min-h-[250px]"
        onClick={() => router.push("/project-add")}
      >
        <PlusCircle className="h-10 w-10 mb-2" />
        <span>Ajouter nouveau projet</span>
      </Card>
    </div>
  );
}
