"use client";

import React from "react";
import { AfiliadosDataTable } from "@/app/dashboard/components/afiliados-table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Next.js pasa los parámetros de la URL como props a la página
interface AfiliadosPageProps {
    // La definición de la prop no cambia, pero su naturaleza sí
    params: Promise<{ id: string }>;
}

export default function AfiliadosPage({ params }: AfiliadosPageProps) {
    const unwrappedParams = React.use(params);

    // Ahora accedemos a la propiedad 'id' desde el objeto desenvuelto
    const clientId = parseInt(unwrappedParams.id, 10);

    return (
        <div className='container mx-auto'>
        <div className="flex items-center justify-between mb-6">
            <div>
            <h1 className="text-3xl font-bold">Afiliados</h1>
            <p className="text-gray-500">
                Lista de afiliados para el cliente ID: {clientId}
            </p>
            </div>
            
            <Button asChild variant="outline">
            <Link href="/dashboard/clientes">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Clientes
            </Link>
            </Button>
        </div>

        {/* Aquí integramos la tabla de afiliados, pasándole el ID */}
        <AfiliadosDataTable clientId={clientId} />
        </div>
    );
}