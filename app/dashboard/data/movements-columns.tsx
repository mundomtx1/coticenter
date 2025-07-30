"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MovementTransaction } from "@/types";
import { cn } from "@/lib/utils";

export const movementsColumns: ColumnDef<MovementTransaction>[] = [
  {
    accessorKey: "tipo_transacciones_id",
    header: "Tipo",
    cell: ({ row }) => {
      const type = row.original.tipo_transacciones_id;
      const typeName = row.original.tipo_transaccion;
      const isIncome = type === 6;

      return (
        <span
          className={cn(
            "font-semibold",
            isIncome ? "text-green-600" : "text-red-600"
          )}
        >
          {typeName}
        </span>
      );
    },
    meta: {
      displayName: "Tipo",
      cellClassName: "w-[150px]", 
    }
  },
  {
    accessorKey: "credito_pretty",
    header: "Monto",
    cell: ({ row }) => {
      const isIncome = row.original.tipo_transacciones_id === 6;
      const amount = row.getValue("credito_pretty") as string;
      return (
        <div className="text-left font-mono">
            {isIncome ? `+${amount}` : `-${amount}`}
        </div>
      )
    },
    meta: {
      displayName: "Monto"
    }
  },
  {
    accessorKey: "created_at",
    header: "Fecha",
    meta: {
      displayName: "Fecha",
      cellClassName: "w-[150px]", 
    }
  },
];