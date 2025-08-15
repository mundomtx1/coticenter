"use client";

import React, {useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";
import Link from "next/link";
import { fetchWithAuth } from '@/hooks/useApi';
import { Items } from "@/types";

// 1. Actualiza la interfaz para indicar que params es una Promesa
interface ItemPageProps {
    params: Promise<{ id: string }>;
}

export default function FichaItemsPage({ params }: ItemPageProps) {
    // 2. Desenvuelve la promesa para obtener el objeto de parámetros real
    const unwrappedParams = React.use(params);

    const [item, setItem] = useState<Items | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Ahora accedemos a la propiedad 'id' desde el objeto desenvuelto
    const itemId = parseInt(unwrappedParams.id, 10);

    useEffect(() => {
        const loadItemsData = async () => {

            if (!itemId) return;

            try {
                const response = await fetchWithAuth(`/items/${itemId}`, { method: "GET" });

                if (!response.ok) {
                    throw new Error("Error al obtener la información del Items.");
                }
                
                const result = await response.json();
                
                setItem(result.data);

            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadItemsData();
    }, [itemId]);

    if (loading) {
        return <div className="text-center py-8">Cargando información del items...</div>;
    }

    if (error) {
        return <p className="text-red-500 text-center py-4">{error}</p>;
    }

    return (
        <div className='container mx-auto'>
            {/* ... Tu JSX no necesita cambios ... */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Productos y Servicios</h1>
                    <p className="text-gray-500">
                        Detalles del item (producto o servicio) seleccionado.
                    </p>
                </div>
                
                <div className="flex items-center space-x-2">
                    <Button asChild variant="outline">
                        <Link href="/dashboard/items">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver a Items
                        </Link>
                    </Button>
                </div>

            </div>
            {
                item?(
                    <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between px-4 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Información de Item (Producto y Servicios)
                            </h3>

                            <div className="flex items-center space-x-2">
                                <Button asChild>
                                    <Link href={`/dashboard/items/${itemId}/edit`}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Editar Items
                                    </Link>
                                </Button>
                            </div>
                        </div>
                       
                        <div className="border-t border-gray-200">
                            <dl>
                                {/* ... el resto de tu <dl> ... */}
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Nombre</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">{item.name}</dd>
                                </div>

                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Descripción</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{item.description}</dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Precio</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{item.price}</dd>
                                </div>

                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Descuento</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{item.descount}%</dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Estatus</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-md ${item.status_id === 1 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {item.status_name}
                                        </span>
                                    </dd>
                                </div>
                                
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Fechas</dt>
                                    <dd className="mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">
                                        Creado: {item.created_at} <br/>
                                        Editado: {item.updated_at}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                ):(
                    <p className="text-center text-gray-500">No se encontró información del items.</p>
                )
            }
        </div>
    );
}