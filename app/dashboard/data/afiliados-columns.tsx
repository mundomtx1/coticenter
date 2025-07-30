"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Afiliados } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Afiliados>[] = [
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
        accessorKey: "autorizado",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    Autorizado
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const status = row.getValue("activo");
            let statusText = "No autorizado";
            let statusClass = "bg-gray-100 text-gray-800";

            if(status){
                statusText = "Autorizado";
                statusClass = "bg-green-100 text-green-800";
            }
        
            // Usamos un "Badge" para que se vea más bonito
            return (
                <span className={`inline-flex text-xs leading-5 font-semibold rounded-full px-3 ml-3 ${statusClass}`}>
                    {statusText}
                </span>
            );
        },
        meta: {
            displayName: "Activo",
            cellClassName: "w-[120px]", 
        }
    },

    // Columna para el Estado (mapeando el número a un texto)
    {
        accessorKey: "activo",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="cursor-pointer"
                >
                    Activo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const status = row.getValue("activo");
            let statusText = "Inactivo";
            let statusClass = "bg-gray-100 text-gray-800";

            if(status){
                statusText = "Activo";
                statusClass = "bg-green-100 text-green-800";
            }
        
            // Usamos un "Badge" para que se vea más bonito
            return (
                <span className={`inline-flex text-xs leading-5 font-semibold rounded-full px-3 ml-3 ${statusClass}`}>
                    {statusText}
                </span>
            );
        },
        meta: {
            displayName: "Activo",
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
                Fecha registro
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
            cellClassName: "w-[150px] text-right",  
        }
    },
];