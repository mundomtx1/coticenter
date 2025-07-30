"use client";

import { ClientesDataTable } from "../../components/clientes-table";

export default function ClientesPage() {
    return (
        <div className='container mx-auto'>
            <h1 className="text-3xl font-bold">Clientes</h1>
            <p className="text-gray-500 mb-6">
                Esta es la página de gestión de clientes.
            </p>

            {/* Aquí integramos la tabla de clientes */}
            <ClientesDataTable />
        </div>
    );
}