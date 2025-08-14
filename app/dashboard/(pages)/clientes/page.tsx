"use client";

import { ClientesDataTable } from "../../components/clientes-table";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';

export default function ClientesPage() {
    return (
        <div className='container mx-auto'>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Clientes</h1>
                    <p className="text-gray-500">Esta es la página de gestión de clientes.</p>
                </div>
                <Button asChild variant="outline">
                    <Link href={`/dashboard/clientes/create`}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Registrar Cliente
                    </Link>
                </Button>
            </div>

            {/* <h1 className="text-3xl font-bold">Clientes</h1>
            <p className="text-gray-500 mb-6">
                Esta es la página de gestión de clientes.
            </p> */}

            {/* Aquí integramos la tabla de clientes */}
            <ClientesDataTable />
        </div>
    );
}