"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DataTable, PaginationMeta } from "@/components/ui/data-table";
import { fetchWithAuth } from "@/hooks/useApi";
import { Items } from "@/types";
import { columns as columnDef } from "@/app/dashboard/data/items-columns";

export function ItemsDataTable() {
    const router = useRouter();
    const [data, setData] = useState<Items[]>([]);
    const [pagination, setPagination] = useState<PaginationMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Creamos una nueva definición de columnas que incluye la función en 'meta'
    const columns = React.useMemo(() => {
        // Tomamos la primera columna de acciones (la última) y le añadimos la función
        const actionColumn = columnDef.find(c => c.id === 'actions');
        if (actionColumn) {
            actionColumn.meta = { ...actionColumn.meta };
        }
        return columnDef;
    }, [router]);

    // Estado para los filtros que se enviarán a la API
    const [filters, setFilters] = useState({
        page: 1,
        limit: 25,
        search: '', // Para el campo de búsqueda
    });

    // El useEffect ahora se encargará de llamar a la API cuando los filtros cambien.
    useEffect(() => {
        // Definimos la función para obtener datos DENTRO del efecto.
        const loadData = async () => {

            setLoading(true);
            setError(null);

            try {
                const params = new URLSearchParams();
                params.append('page', String(filters.page));
                params.append('limit', String(filters.limit));

                if (filters.search) {
                    params.append('search', filters.search);
                }

                const response = await fetchWithAuth(`/items?${params.toString()}`, { method: "GET" });

                if (!response.ok) {
                    // Intenta obtener un mensaje de error más específico si es posible
                    const errorData = await response.json().catch(() => null);
                    throw new Error(errorData?.message || "Error al obtener los datos.");
                }
                
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
        
        // Este efecto se volverá a ejecutar solo cuando el estado de los filtros cambie.
    }, [filters]); 
    
    const handlePageChange = useCallback((newPage: number) => {
        setFilters(prevFilters => ({ ...prevFilters, page: newPage }));
    }, []);

    const handleSearch = useCallback((query: string) => {
        setFilters(prevFilters => ({ ...prevFilters, search: query, page: 1 }));
    }, []); 

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Listado de items</h2>

            {/* Mostramos el error global por encima de la tabla si ocurre */}
            {error && <p className="text-red-500 text-center py-4">Error: {error}</p>}

            <DataTable 
                columns={columns} 
                data={data}
                isLoading={loading} // <<< Pasamos el estado de carga aquí
                pagination={pagination!} // El '!' indica a TS que no será null aquí
                onPageChange={handlePageChange}
                onSearch={handleSearch}
            />
        </div>
    );
}