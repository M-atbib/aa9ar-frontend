"use client";

import { PiChartLineDownBold, PiChartLineUpBold } from "react-icons/pi";
import { Card } from "../ui/card";
import { useProjectStore } from "@/stores/projectStore";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
export default function ProjectKpis() {
  const { projectKpis } = useProjectStore();

  const formatNumber = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}Mrd`; // Milliard
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`; // Million
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`; // Mille
    }
    return value.toFixed(1);
  };

  const kpis = [
    {
      name: "Total des pertes",
      value: formatNumber(projectKpis?.total_losses || 0),
      icon: <PiChartLineDownBold />,
    },
    {
      name: "Total restant",
      value: formatNumber(projectKpis?.remaining_total || 0),
      icon: <FaHandHoldingDollar />,
    },
    {
      name: "Profit attendu",
      value: formatNumber(projectKpis?.expected_profit || 0),
      icon: <PiChartLineUpBold />,
    },
    {
      name: "Unités vendues",
      value: projectKpis?.breakdown?.sold_units || 0,
      icon: <FaDollarSign />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card
          className="p-5 bg-primaryGradient text-offWhite flex flex-col justify-between gap-6"
          key={kpi.name}
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold">{kpi.name}</h3>
            <div className="text-4xl">{kpi.icon}</div>
          </div>
          <p className="text-5xl font-bold">{kpi.value}</p>
        </Card>
      ))}
    </div>
  );
}
