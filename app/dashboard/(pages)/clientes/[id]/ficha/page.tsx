"use client";

import React, {useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";
import Link from "next/link";
import { fetchWithAuth } from '@/hooks/useApi';
import { Cliente } from "@/types";

// 1. Actualiza la interfaz para indicar que params es una Promesa
interface ClientePageProps {
    params: Promise<{ id: string }>;
}

export default function ClientePage({ params }: ClientePageProps) {
    // 2. Desenvuelve la promesa para obtener el objeto de parámetros real
    const unwrappedParams = React.use(params);

    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Ahora accedemos a la propiedad 'id' desde el objeto desenvuelto
    const clientId = parseInt(unwrappedParams.id, 10);

    useEffect(() => {
        const loadClienteData = async () => {

            if (!clientId) return;

            try {
                const response = await fetchWithAuth(`/clients/${clientId}`, { method: "GET" });

                if (!response.ok) {
                    throw new Error("Error al obtener la información del cliente.");
                }
                
                const result = await response.json();
                
                setCliente(result.data);

            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadClienteData();
    }, [clientId]);

    if (loading) {
        return <div className="text-center py-8">Cargando información del cliente...</div>;
    }

    if (error) {
        return <p className="text-red-500 text-center py-4">{error}</p>;
    }

    return (
        <div className='container mx-auto'>
            {/* ... Tu JSX no necesita cambios ... */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Cliente</h1>
                    <p className="text-gray-500">
                        Detalles personales y de la cuenta.
                    </p>
                </div>
                
                <div className="flex items-center space-x-2">
                    <Button asChild variant="outline">
                        <Link href="/dashboard/clientes">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver a Clientes
                        </Link>
                    </Button>
                </div>

            </div>
            {
                cliente?(
                    <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between px-4 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Información del Cliente
                            </h3>

                            <div className="flex items-center space-x-2">
                                <Button asChild>
                                    <Link href={`/dashboard/clientes/${clientId}/edit`}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Editar Cliente
                                    </Link>
                                </Button>
                            </div>
                        </div>
                       
                        <div className="border-t border-gray-200">
                            <dl>
                                {/* ... el resto de tu <dl> ... */}
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Nombre Completo</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">{`${cliente.name} ${cliente.lastname}`}</dd>
                                </div>

                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{cliente.email}</dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Telefono</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{cliente.phone}</dd>
                                </div>

                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Documento</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{cliente.document}</dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Dirección</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{cliente.address}</dd>
                                </div>

                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Tipo de Cliente</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{cliente.type_name}</dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Estatus</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-md ${cliente.status_id === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {cliente.status_name}
                                        </span>
                                    </dd>
                                </div>
                                
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Fechas</dt>
                                    <dd className="mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">
                                        Creado: {cliente.created_at} <br/>
                                        Editado: {cliente.updated_at}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                ):(
                    <p className="text-center text-gray-500">No se encontró información del cliente.</p>
                )
            }
        </div>
    );
}