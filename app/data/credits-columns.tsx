"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CreditTransaction } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<CreditTransaction>[] = [
    {
        accessorKey: "usuario",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="cursor-pointer"
                >
                Usuario
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            // Mostramos el valor ya formateado que nos da la API
            return <div className="text-left font-medium px-3">{row.getValue("usuario")}</div>;
        },
        meta: {
            displayName: "Usuario", // Nombre para el menú
            cellClassName: "w-[150px]", 
        }
    },

    // Columna para el Número de Factura
    {
        accessorKey: "numero_factura",
        header: "No. Factura",
        meta: {
            displayName: "No. Factura"
        }
    },

    // Columna para Créditos (usando el valor "pretty" que ya viene)
    {
        accessorKey: "precio_pretty",
        header: ({ column }) => {
            // Usamos 'creditos' (el número) para ordenar, pero mostramos 'creditos_pretty'
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    Precio
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        // Ordenamiento personalizado: le decimos que ordene por el campo numérico 'creditos'
        sortingFn: (rowA, rowB, columnId) => {
            const numA = rowA.original.creditos;
            const numB = rowB.original.creditos;
            return numA < numB ? -1 : numA > numB ? 1 : 0;
        },
        cell: ({ row }) => {
            // Mostramos el valor ya formateado que nos da la API
            return <div className="text-left font-medium px-3">{row.getValue("precio_pretty")}</div>;
        },
        meta: {
            displayName: "Precio",
            cellClassName: "w-[150px]", 
        }
    },

    // Columna para Créditos (usando el valor "pretty" que ya viene)
    {
        accessorKey: "creditos_pretty",
        header: ({ column }) => {
        // Usamos 'creditos' (el número) para ordenar, pero mostramos 'creditos_pretty'
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="cursor-pointer"
            >
            Créditos Comprados
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        );
        },
        // Ordenamiento personalizado: le decimos que ordene por el campo numérico 'creditos'
        sortingFn: (rowA, rowB, columnId) => {
            const numA = rowA.original.creditos;
            const numB = rowB.original.creditos;
            return numA < numB ? -1 : numA > numB ? 1 : 0;
        },
        cell: ({ row }) => {
            // Mostramos el valor ya formateado que nos da la API
            return <div className="text-left font-medium px-3 text-green-500">{row.getValue("creditos_pretty")}</div>;
        },
        meta: {
            displayName: "Créditos Comprados",
            cellClassName: "w-[150px]", 
        }
    },

    // Columna para Créditos Usados (usando el valor "pretty" que ya viene)
    {
        accessorKey: "creditos_usados_pretty",
        header: ({ column }) => {
            // Usamos 'creditos_usados' (el número) para ordenar, pero mostramos 'creditos_usados_pretty'
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                     className="cursor-pointer"
                >
                    Créditos Usados
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        // Ordenamiento personalizado: le decimos que ordene por el campo numérico 'creditos'
        sortingFn: (rowA, rowB, columnId) => {
            const numA = rowA.original.creditos;
            const numB = rowB.original.creditos;
            return numA < numB ? -1 : numA > numB ? 1 : 0;
        },
        cell: ({ row }) => {
            // Mostramos el valor ya formateado que nos da la API
            return <div className="text-left font-medium px-3 text-red-500">{row.getValue("creditos_usados_pretty")}</div>;
        },
        meta: {
            displayName: "Créditos Usados",
            cellClassName: "w-[150px]", 
        }
    },

    // Columna para el Estado (mapeando el número a un texto)
    {
        accessorKey: "estatus",
        header: "Estado",
        cell: ({ row }) => {
            const status = row.getValue("estatus");
            let statusText = "Desconocido";
            let statusClass = "bg-gray-100 text-gray-800";

            switch (status) {
                case 1:
                    statusText = "Pendiente";
                    statusClass = "bg-yellow-100 text-yellow-800";
                break;
                case 2:
                    statusText = "Facturado";
                    statusClass = "bg-green-100 text-green-800";
                break;
                case 3:
                    statusText = "Cancelado";
                    statusClass = "bg-red-100 text-red-800";
                break;
                case 4:
                    statusText = "Expirada";
                    statusClass = "bg-red-100 text-red-800";
                break;
            }
        
            // Usamos un "Badge" para que se vea más bonito
            return (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}>
                    {statusText}
                </span>
            );
        },
        meta: {
            displayName: "Estado",
            cellClassName: "w-[120px]", 
        }
    },

    // Columna para la Fecha de Creación
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="cursor-pointer"
              >
                Fecha
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
        },
        cell: ({ row }) => {
            // El formato ya es amigable, así que solo lo mostramos
            return <div className="px-3">{row.getValue("created_at")}</div>
        },
        meta: {
            displayName: "Fecha",
            cellClassName: "w-[150px]",  
        }
    },

    // Opcional: Columna de Acciones (si quieres añadir botones de "Ver", "Editar", etc.)
    {
        id: "actions",
        cell: ({ row, column }) => {
            const transaction:any = row.original;

            console.log('transaction')
            console.log(transaction)

            // Accedemos a la función desde meta.
            const viewMovementsFn = column.columnDef.meta?.viewMovements;

            // Funciones de ejemplo para las acciones
            const handleViewMovements = () => {
                // En un caso real, aquí podrías navegar a otra página:
                // router.push(`/dashboard/credits/${transaction.credito_factura_id}/movements`);
                alert(`Viendo movimientos de la factura: ${transaction.numero_factura}`);
            };

            const handleApproveCredit = () => {
                // Aquí podrías llamar a una API para aprobar la compra
                // y luego refrescar los datos de la tabla.
                if (confirm(`¿Estás seguro de que quieres aprobar la compra de crédito para la factura ${transaction.numero_factura}?`)) {
                  console.log("Aprobando compra:", transaction);
                  alert(`Compra de crédito aprobada para la factura: ${transaction.numero_factura}`);
                }
              };

              return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => viewMovementsFn?.(transaction)}
                            disabled={!viewMovementsFn} // Deshabilitamos si la función no se pasó
                            className="cursor-pointer"
                        >
                            Ver Movimientos
                        </DropdownMenuItem>
                        
                        {/* Opcional: Mostrar la opción de aprobar solo si el estado es 'Pendiente' */}
                        {transaction.estatus === 1 && (
                        <DropdownMenuItem onClick={handleApproveCredit}>
                            Aprobar Compra de Crédito
                        </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
        meta: {
            cellClassName: "w-[6+0px] text-right", 
        }
    },
];