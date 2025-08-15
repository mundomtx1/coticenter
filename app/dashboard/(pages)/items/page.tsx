"use client";

import { ItemsDataTable } from "../../components/items-table";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PackagePlus } from 'lucide-react';

export default function ItemsPage() {
    return (
        <div className='container mx-auto'>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Productos y Servicios</h1>
                    <p className="text-gray-500">Esta es la página de gestión de Productos y Servicios (Items).</p>
                </div>
                <Button asChild variant="outline">
                    <Link href={`/dashboard/items/create`}>
                        <PackagePlus  className="mr-2 h-4 w-4" />
                        Agregar Producto o Servicio
                    </Link>
                </Button>
            </div>

            {/* <h1 className="text-3xl font-bold">Clientes</h1>
            <p className="text-gray-500 mb-6">
                Esta es la página de gestión de clientes.
            </p> */}

            {/* Aquí integramos la tabla de clientes */}
            <ItemsDataTable />

            <div className="flex items-center justify-between mb-6 mt-6">
                <h1 className="text-3xl font-bold">Productos y Servicios mas cotizados</h1>
            </div>
            
        </div>
    );
}