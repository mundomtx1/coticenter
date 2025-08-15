"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Hook para la redirección
import { fetchWithAuth } from '@/hooks/useApi';
import { ItemsEditar } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';

interface EditItemsPageProps {
    params: Promise<{ id: string }>;
}

export default function EditItemsPage({ params }: EditItemsPageProps) {
    const unwrappedParams = React.use(params);
    const router = useRouter();

    // Ahora accedemos a la propiedad 'id' desde el objeto desenvuelto
    const itemsId = parseInt(unwrappedParams.id, 10);

    const [formData, setFormData] = useState<Partial<ItemsEditar>>({});
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 1. Cargar los datos existentes del cliente
    useEffect(() => {
        const loadItemsData = async () => {
            if (!itemsId) return;
            try {
                const response = await fetchWithAuth(`/items/${itemsId}`, { method: "GET" });
                if (!response.ok) throw new Error("No se pudo cargar el items a editar.");
                const result = await response.json();
                setFormData(result.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadItemsData();
    }, [itemsId]);

    // 2. Manejador genérico para actualizar el estado del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    // 3. Manejador para enviar el formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError(null);

        try {
            const response = await fetchWithAuth(`/items/${itemsId}`, {
                method: 'PUT', // o 'PATCH' si solo envías los campos cambiados
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Error al actualizar el items.");

            // Redirigir de vuelta a la página de detalles después de guardar
            router.push(`/dashboard/items/${itemsId}/ficha`);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return <div className="text-center py-8">Cargando formulario...</div>;
    }

    return (
        <div className='container mx-auto'>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Editar Items</h1>
                    <p className="text-gray-500">Actualiza la información del Producto o Servicio</p>
                </div>
                <Button asChild variant="outline">
                    <Link href={`/dashboard/items/${itemsId}/ficha`}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Cancelar y Volver
                    </Link>
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Campo Nombre - Ocupa las 2 columnas en escritorio */}
                    <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" name="name" value={formData.name || ''} onChange={handleChange} required />
                    </div>

                    {/* Campo Descripción - Ocupa las 2 columnas en escritorio */}
                    <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Input id="description" name="description" value={formData.description || ''} onChange={handleChange} />
                    </div>

                    {/* Campo Precio - Ocupará la primera columna */}
                    <div className="space-y-2">
                        <Label htmlFor="price">Precio</Label>
                        <Input id="price" name="price" type="number" value={formData.price || ''} onChange={handleChange} />
                    </div>

                    {/* Campo Descuento - Ocupará la segunda columna */}
                    <div className="space-y-2">
                        <Label htmlFor="descount">Descuento (%)</Label>
                        <Input id="descount" name="descount" type="number" value={formData.descount || ''} onChange={handleChange} />
                    </div>

                    {/* Campo Estatus */}
                    <div className="space-y-2">
                        <Label htmlFor="status_id">Estatus</Label>
                        <Select name="status_id" value={String(formData.status_id || '')} onValueChange={(value) => handleSelectChange('status_id', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un estatus" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Activo</SelectItem>
                                <SelectItem value="2">Inactivo</SelectItem> {/* Asumiendo '2' como inactivo */}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                <div className="flex justify-end mt-8 border-t pt-6">
                    <Button type="submit" disabled={isSaving}  className="cursor-pointer">
                        {isSaving ? 'Guardando...' : <> <Save className="mr-2 h-4 w-4" /> Guardar Cambios </>}
                    </Button>
                </div>
            </form>
        </div>
    );
}