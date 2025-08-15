"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Items } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Eye, Trash2, Pencil } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const columns: ColumnDef<Items>[] = [
    {
        accessorKey: "name",
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
            const name = row.getValue("name") as string;
            return <div className="text-left font-medium px-3 capitalize">{name}</div>;
        },
        meta: {
            displayName: "Nombre", // Nombre para el menú
            cellClassName: "w-[300px]", 
        }
    },

    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    Descripción
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const description = row.getValue("description") as string;
            return <div className="text-left font-medium px-3">{description}</div>;
        },
        meta: {
            displayName: "Descripción", // Nombre para el menú
            cellClassName: "", 
        }
    },

    {
        accessorKey: "price",
        header: ({ column }) => {
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
        cell: ({ row }) => {
            // Mostramos el valor ya formateado que nos da la API
            return <div className="text-left font-medium px-3">{row.getValue("price")}</div>;
        },
        meta: {
            displayName: "Precio", // Nombre para el menú
            cellClassName: "w-[150px]", 
        }
    },

    {
        accessorKey: "descount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    Descuento (%)
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            // Mostramos el valor ya formateado que nos da la API
            return <div className="text-left font-medium px-3">{row.getValue("descount")}%</div>;
        },
        meta: {
            displayName: "Descuento", // Nombre para el menú
            cellClassName: "w-[150px]", 
        }
    },

    // Columna para el Estado (mapeando el número a un texto)
    {
        accessorKey: "status_id",
        header: "Estado",
        cell: ({ row }) => {
            const status = row.getValue("status_id");
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
                Registrado
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
        },
        cell: ({ row }) => {
            // El formato ya es amigable, así que solo lo mostramos
            return <div className="px-3">{row.getValue("created_at")}</div>
        },
        meta: {
            displayName: "Registrado",
            cellClassName: "w-[150px]",  
        }
    },

    // Opcional: Columna de Acciones (si quieres añadir botones de "Ver", "Editar", etc.)
    {
        id: "actions",
        cell: ({ row }) => {
            const item: Items = row.original;

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
                        <DropdownMenuItem>
                            <Link href={`/dashboard/items/${item.id}/ficha`}>
                                <Eye className="ml-2 h-4 w-4 me-2 inline-flex " /> Ver mas
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`/dashboard/items/${item.id}/edit`}>
                                <Pencil className="ml-2 h-4 w-4 me-2 inline-flex " /> Actualizar
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <Link href={`/dashboard/items/${item.id}/ficha`}>
                                <Trash2 className="ml-2 h-4 w-4 me-2 inline-flex " /> Eliminar
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
        meta:{
            cellClassName: "w-[60px] text-right", 
        }
    },
];