"use client";

import React, { useState, useEffect, useCallback } from "react";
import { DataTable, PaginationMeta } from "@/components/ui/data-table";
import { fetchWithAuth } from "@/hooks/useApi";
import { CreditTransaction } from "@/types";
import { columns as columnDef } from "@/app/data/credits-columns";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { TransactionDetails } from "./transaction-details";

// 3. El componente principal que obtiene los datos
export function CreditsDataTable() {
    
    const [data, setData] = useState<CreditTransaction[]>([]);
    const [pagination, setPagination] = useState<PaginationMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [selectedTransaction, setSelectedTransaction] = React.useState<CreditTransaction | null>(null);

    // Función que abrirá el diálogo
    const handleViewMovements = (transaction: CreditTransaction) => {
        setSelectedTransaction(transaction);
        setIsDialogOpen(true);
    };

    // Creamos una nueva definición de columnas que incluye la función en 'meta'
    const columns = React.useMemo(
        () => {
        // Tomamos la primera columna de acciones (la última) y le añadimos la función
        const actionColumn = columnDef.find(c => c.id === 'actions');
        if (actionColumn) {
            actionColumn.meta = { ...actionColumn.meta, viewMovements: handleViewMovements };
        }
        return columnDef;
        },
        [] // Se calcula solo una vez
    );

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

                const response = await fetchWithAuth(`/master/creditos?${params.toString()}`, { method: "GET" });

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
            <h2 className="text-2xl font-bold mb-4">Transacciones de Crédito</h2>

            {/* Mostramos el error global por encima de la tabla si ocurre */}
            {error && <p className="text-red-500 text-center py-4">Error: {error}</p>}

            <DataTable 
                columns={columns} 
                data={data}
                isLoading={loading} // <<< Pasamos el estado de carga aquí
                pagination={pagination!} // El '!' indica a TS que no será null aquí
                onPageChange={handlePageChange}
                onSearch={handleSearch}
                searchPlaceholder="Buscar por usuario o No. de factura..."
            />
            
            {/* --- Renderizado del Dialog ACTUALIZADO --- */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-4xl"> {/* Lo hacemos un poco más grande */}
                <DialogHeader>
                    <DialogTitle>Movimientos de la Factura</DialogTitle>
                    <DialogDescription>
                    Mostrando los movimientos asociados a la factura: {selectedTransaction?.numero_factura}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    {selectedTransaction ? (
                    // Renderizamos el componente de detalles, pasándole el ID.
                    <TransactionDetails transactionId={selectedTransaction.credito_factura_id} />
                    ) : (
                    <p>Cargando detalles...</p>
                    )}
                </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}