"use client";

import { MdAttachMoney, MdBarChart } from "react-icons/md";
import { GrLineChart } from "react-icons/gr";
import { TbMeterSquare } from "react-icons/tb";

import { Card } from "../ui/card";
import { useCompanyStore } from "@/stores/companyStore";

export default function DashboardKpis() {
  const { companyKpis } = useCompanyStore();

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
      name: "Retour sur investissement",
      value:
        formatNumber(companyKpis[0]?.roi_metrics?.roi_percentage || 0) + "%",
      icon: <MdAttachMoney />,
    },
    {
      name: "Valeur actuel nette",
      value: formatNumber(
        companyKpis[0]?.cumulative_profit?.actual_profit || 0
      ),
      icon: <MdBarChart />,
    },
    {
      name: "Marge bénéficiaire brute",
      value: formatNumber(companyKpis[0]?.roi_metrics?.total_revenue || 0),
      icon: <GrLineChart />,
    },
    {
      name: "Cout au metre carré",
      value: formatNumber(companyKpis[0]?.roi_metrics?.total_expenses || 0),
      icon: <TbMeterSquare />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card
          className="p-5 bg-primaryGradient text-white flex flex-col justify-between gap-6"
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
