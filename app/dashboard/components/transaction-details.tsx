"use client";

import * as React from "react";
import { DataTable, PaginationMeta } from "@/components/ui/data-table";
import { fetchWithAuth } from "@/hooks/useApi";
import { MovementTransaction } from "@/types";
import { movementsColumns } from "@/app/dashboard/data/movements-columns";

interface TransactionDetailsProps {
  transactionId: number;
}

export function TransactionDetails({ transactionId }: TransactionDetailsProps) {
  const [movements, setMovements] = React.useState<MovementTransaction[]>([]);
  const [pagination, setPagination] = React.useState<PaginationMeta | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    async function loadMovements() {
      if (!transactionId) return;

      setLoading(true);
      setError(null);
      try {
        // Construimos la URL con el ID de la transacción y la página
        const response = await fetchWithAuth(
          `/master/creditos/${transactionId}/movimientos?page=${currentPage}`, // Ajusta la URL del endpoint
          { method: "GET" }
        );

        if (!response.ok) {
          throw new Error("No se pudieron cargar los movimientos.");
        }
        
        const result = await response.json();
        setMovements(result.data.data);
        setPagination(result.data.meta);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMovements();
  }, [transactionId, currentPage]); // Se vuelve a ejecutar si cambia el ID o la página

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (error) {
    return <p className="text-red-500 text-center py-4">Error: {error}</p>;
  }

  return (
    <div>
      <DataTable
        columns={movementsColumns}
        data={movements}
        isLoading={loading}
        pagination={pagination!}
        onPageChange={handlePageChange}
      />
    </div>
  );
}