"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useProjectStore } from "@/stores/projectStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NoData from "@/components/layout/NoData";
import { Skeleton } from "@/components/ui/skeleton";
import Breadcrumb from "@/components/layout/Breadcrumb";

export default function ProjectDetails() {
  const { id } = useParams();
  const { currentProject, getProject } = useProjectStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        try {
          await getProject(id as string);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchProject();
  }, [id, getProject]);

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-8 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <NoData
        title="Project not found"
        inform="The requested project could not be found."
      />
    );
  }

  return (
    <div className="p-4 space-y-8">
      <Breadcrumb
        items={[{ link: `/project/${id}`, title: "Détails du projet" }]}
      />
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-xl font-semibold text-primaryDark">
                  {currentProject.name}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-xl font-semibold text-primaryDark">
                  {currentProject.status}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-xl font-semibold text-primaryDark">
                  {currentProject.address}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">City</p>
                <p className="text-xl font-semibold text-primaryDark">
                  {currentProject.city}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Total Budget</p>
                  <p className="text-2xl font-bold text-green-600">
                    {currentProject.total_budget.toLocaleString()} DH
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Current Expenses</p>
                  <p className="text-2xl font-bold text-red-500">
                    {currentProject.current_expenses.toLocaleString()} DH
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Start Date</p>
                  <p className="text-xl font-semibold text-blue-500">
                    {new Date(currentProject.start_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">End Date</p>
                  <p className="text-xl font-semibold text-blue-500">
                    {new Date(currentProject.end_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Terrain Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Surface</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {currentProject.terrain.surface.toLocaleString()} m²
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Price</p>
                  <p className="text-2xl font-bold text-violet-600">
                    {currentProject.terrain.price.toLocaleString()} DH
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Borders</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {currentProject.terrain.borders}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Number of Floors</p>
                  <p className="text-2xl font-bold text-fuchsia-600">
                    {currentProject.terrain.number_of_floors}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Apartments Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Count</p>
                  <p className="text-3xl font-bold text-cyan-600">
                    {currentProject.global_apartments_info.count}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Profit Margin</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {currentProject.global_apartments_info.profit_margin}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Commercial Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Count</p>
                  <p className="text-3xl font-bold text-cyan-600">
                    {currentProject.global_commercial_info.count}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Profit Margin</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {currentProject.global_commercial_info.profit_margin}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Partnership Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium">Partner Company</p>
                <p className="text-xl font-semibold text-primaryDark">
                  ACME Construction Ltd
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Partnership Type</p>
                <p className="text-xl font-semibold text-primaryDark">
                  Joint Venture
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Ownership Share</p>
                <p className="text-xl font-semibold text-primaryDark">50%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
