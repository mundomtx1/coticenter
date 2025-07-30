"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ClientesTransaction } from "@/types";
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

export const columns: ColumnDef<ClientesTransaction>[] = [
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

    {
        accessorKey: "nombre",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    Nombre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            // Mostramos el valor ya formateado que nos da la API
            return <div className="text-left font-medium px-3">{row.getValue("nombre")}</div>;
        },
        meta: {
            displayName: "Nombre", // Nombre para el menú
            cellClassName: "w-[150px]", 
        }
    },

    {
        accessorKey: "apellido",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    Apellido
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            // Mostramos el valor ya formateado que nos da la API
            return <div className="text-left font-medium px-3">{row.getValue("apellido")}</div>;
        },
        meta: {
            displayName: "Apellido", // Nombre para el menú
            cellClassName: "w-[150px]", 
        }
    },

    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            // Mostramos el valor ya formateado que nos da la API
            return <div className="text-left font-medium px-3">{row.getValue("email")}</div>;
        },
        meta: {
            displayName: "Email" // Nombre para el menú
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
                    statusText = "Activo";
                    statusClass = "bg-green-100 text-green-800";
                break;
                case 2:
                    statusText = "Inactivo";
                    statusClass = "bg-yellow-100 text-yellow-800";
                break;
                case 18:
                    statusText = "Bloqueado";
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
            const client: ClientesTransaction = row.original;

            // Accedemos a la función desde meta.
            const viewAffiliatesFn = column.columnDef.meta?.viewAffiliates;

            // const handleApproveCredit = () => {
            //     // Aquí podrías llamar a una API para aprobar la compra
            //     // y luego refrescar los datos de la tabla.
            //     if (confirm(`¿Estás seguro de que quieres aprobar la compra de crédito para la factura ${ClientesTransaction.id}?`)) {
            //       console.log("Aprobando compra:", ClientesTransaction);
            //       alert(`Compra de crédito aprobada para la factura: ${ClientesTransaction.id}`);
            //     }
            // };

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
                            onClick={() => viewAffiliatesFn?.(client.id)}
                            disabled={!viewAffiliatesFn} // Deshabilitamos si la función no se pasó
                            className="cursor-pointer"
                        >
                            Ver afiliados
                        </DropdownMenuItem>
                        
                        {/* Opcional: Mostrar la opción de aprobar solo si el estado es 'Pendiente' */}
                        {/* {ClientesTransaction.estatus === 1 && (
                        <DropdownMenuItem onClick={handleApproveCredit}>
                            Aprobar Compra de Crédito
                        </DropdownMenuItem>
                        )} */}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
        meta:{
            cellClassName: "w-[60px] text-right", 
        }
    },
];