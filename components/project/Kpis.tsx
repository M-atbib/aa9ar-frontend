"use client";

import { TbMeterSquare } from "react-icons/tb";
import { FaTools } from "react-icons/fa";
import { PiChartLineUpBold } from "react-icons/pi";
import { AiOutlineFileDone } from "react-icons/ai";
import { Card } from "../ui/card";

export default function ProjectKpis() {
  const kpis = [
    { name: "Avancement des travaux", value: 10, icon: <FaTools /> },
    { name: "Ecart budgétaire", value: 10, icon: <PiChartLineUpBold /> },
    { name: "Délai d'achèvement", value: 10, icon: <AiOutlineFileDone /> },
    {
      name: "Coût des matériaux au mètre carré",
      value: 10,
      icon: <TbMeterSquare />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card
          className="p-4 bg-primaryGradient text-white flex flex-col justify-between gap-4"
          key={kpi.name}
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold">{kpi.name}</h3>
            <div className="text-3xl">{kpi.icon}</div>
          </div>
          <p className="text-4xl font-bold">{kpi.value}</p>
        </Card>
      ))}
    </div>
  );
}
