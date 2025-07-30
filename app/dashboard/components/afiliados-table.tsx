"use client";

import React, { useState, useEffect, useCallback } from "react";
import { DataTable, PaginationMeta } from "@/components/ui/data-table";
import { fetchWithAuth } from "@/hooks/useApi";
import { Afiliados } from "@/types";
import { columns } from "@/app/dashboard/data/afiliados-columns";

interface AfiliadosDataTableProps {
  clientId: number;
}

export function AfiliadosDataTable({ clientId }: AfiliadosDataTableProps) {
  const [data, setData] = useState<Afiliados[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ page: 1, limit: 10, search: '' });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          page: String(filters.page),
          limit: String(filters.limit),
        });
        if (filters.search) params.append('search', filters.search);

        // Usamos el clientId en la URL del endpoint
        const response = await fetchWithAuth(`/master/usuarios/${clientId}/afiliados?${params.toString()}`, { method: "GET" });

        if (!response.ok) throw new Error("Error al obtener los afiliados.");
        
        const result = await response.json();
        setData(result.data.data);
        setPagination(result.data.meta);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [filters, clientId]); // <<< Añadimos clientId a las dependencias

  const handlePageChange = useCallback((newPage: number) => setFilters(f => ({ ...f, page: newPage })), []);
  const handleSearch = useCallback((query: string) => setFilters(f => ({ ...f, search: query, page: 1 })), []);

  return (
    <div>
      {error && <p className="text-red-500 text-center py-4">{error}</p>}

      <DataTable 
        columns={columns} 
        data={data}
        isLoading={loading}
        pagination={pagination!}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        searchPlaceholder="Buscar afiliado..."
      />
    </div>
  );
}