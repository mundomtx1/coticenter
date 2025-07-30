"use client";

import { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/hooks/useApi';
import { CreditsDataTable } from "../components/credits-table";
import { DashboardStats } from '../components/dashboard-stats';
import { DashboardStatsData } from '@/types';

interface UserData {
  usuario: string;
}

export default function DashboardPage() {

  const [user, setUser] = useState<UserData | null>(null);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statsData, setStatsData] = useState<DashboardStatsData | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStatsData() {
      try {
        setStatsLoading(true);
        // Asegúrate de que la URL del endpoint sea la correcta
        const response = await fetchWithAuth("/master/widgets", { method: "GET" });
        
        if (!response.ok) {
          throw new Error("No se pudieron cargar las estadísticas.");
        }
        
        const result = await response.json();
        setStatsData(result.data);

      } catch (err: any) {
        setStatsError(err.message);
      } finally {
        setStatsLoading(false);
      }
    }

    const getUserData = async () => {
      try {
        // Llamamos al endpoint de verificación de sesión de AdonisJS
        const response = await fetchWithAuth('/oauth/sesion-admin', { method: 'GET' });

        if (!response.ok) {
          throw new Error('No se pudo verificar la sesión.');
        }

        const data = await response.json();

        setUser(data.usuario); // Suponiendo que la respuesta tiene un formato similar

      } catch (err: any) {
        setError(err.message);
      } finally {
        // setLoading(false);
      }
    };

    getUserData();
    loadStatsData();
  }, []);

  // if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='container mx-auto'>
      <h1 className="text-3xl font-bold mb-2">Bienvenido {user?.usuario}!</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Una vista rápida del estado actual de lidbiz.</p>

      {/* Mostramos las tarjetas de estadísticas, pasándoles sus datos y estado de carga */}
      {statsError ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
          <p className="font-bold">Error</p>
          <p>No se pudieron cargar las estadísticas: {statsError}</p>
        </div>
      ) : (
        <DashboardStats stats={statsData} isLoading={statsLoading} />
      )}

      {/* Aquí integramos la tabla de créditos */}
      <CreditsDataTable />
    </div>
  );
}