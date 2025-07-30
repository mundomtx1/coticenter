// app/dashboard/components/dashboard-stats.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardStatsData } from "@/types";
import { Users, Wallet, TrendingDown } from "lucide-react";
import * as React from "react";

// Propiedades que el componente principal recibirá
interface DashboardStatsProps {
  stats?: DashboardStatsData | null;
  isLoading: boolean;
}

// Un sub-componente para hacer cada tarjeta reutilizable
const StatCard = ({
    title,
    value,
    icon: Icon,
    isLoading,
}: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    isLoading: boolean;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <Skeleton className="h-8 w-3/4" />
      ) : (
        <div className="text-2xl font-bold">{value}</div>
      )}
    </CardContent>
  </Card>
);

// El componente principal que exportamos
export function DashboardStats({ stats, isLoading }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
    <StatCard
        title="Créditos Disponibles"
        value={stats?.total_credito_pretty ?? "..."}
        icon={Wallet}
        isLoading={isLoading}
    />
    <StatCard
        title="Créditos Usados"
        value={stats?.total_credito_usados_pretty ?? "..."}
        icon={TrendingDown}
        isLoading={isLoading}
    />
    <StatCard
        title="Total Clientes"
        value={stats?.total_usuarios ?? "..."}
        icon={Users}
        isLoading={isLoading}
    />
    </div>
  );
}