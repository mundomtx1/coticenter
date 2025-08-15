"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Hook para la redirección
import { fetchWithAuth } from '@/hooks/useApi';
import { ItemsCrear } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';

export default function CreateItemsPage() {

    const router = useRouter(); 
    const [formData, setFormData] = useState<Partial<ItemsCrear>>({});
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 2. Manejador genérico para actualizar el estado del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 3. Manejador para enviar el formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError(null);

        try {
            const response = await fetchWithAuth(`/items/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Error al actualizar el items.");

            // Redirigir de vuelta a la página de detalles después de guardar
            router.push(`/dashboard/items/`);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className='container mx-auto'>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Agregar Producto o Servicio</h1>
                    <p className="text-gray-500">Agrega un nuevo Items (Producto o Servicios)</p>
                </div>
                <Button asChild variant="outline">
                    <Link href={`/dashboard/items/`}>
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
                </div>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                <div className="flex justify-end mt-8 border-t pt-6">
                    <Button type="submit" disabled={isSaving} className="cursor-pointer">
                        {isSaving ? 'Guardando...' : <> <Save className="mr-2 h-4 w-4" /> Guardar</>}
                    </Button>
                </div>
            </form>
        </div>
    );
}