"use client"; // Necesario para el botón de logout y useRouter
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchWithAuthLogout } from '@/hooks/useApi';
import {
  Home,
  LineChart,
  Package,
  PanelLeft,
  PanelLeftClose,
  ClipboardList,
  Users,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils"; // Utilidad de shadcn para unir clases

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  // Estado para controlar si el sidebar está colapsado
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  // Función para alternar el estado del sidebar
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Inicio" },
    { href: "/dashboard/clientes", icon: Users, label: "Clientes" },
    { href: "/dashboard/items", icon: Package, label: "Productos y Servicios" },
    { href: "/dashboard/budget", icon: ClipboardList, label: "Presupuestos" },
    // { href: "/dashboard/analytics", icon: LineChart, label: "Analíticas" },
  ];

  const handleLogout = async () => {

    try {

      // Llamamos al endpoint de verificación de sesión de AdonisJS
      await fetchWithAuthLogout('/auth/logout', { method: 'GET' });

    } catch (error) {
      console.error("Fallo en la petición de logout:", error);
      alert("Cerrando sesión...");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      {/* --- Sidebar para Escritorio --- */}
      <aside 
        className={cn(
          "hidden md:flex flex-col border-r bg-background transition-all duration-300",
          isSidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-16 items-center border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            {!isSidebarCollapsed && <span>Coticenter</span>}
          </Link>
        </div>
        <nav className="flex-grow p-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.href && "bg-muted text-primary",
                    isSidebarCollapsed && "justify-center"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto mb-5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <div className="flex flex-col flex-1">
        {/* --- Header --- */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4">
          {/* Botón para colapsar en escritorio */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hidden md:flex cursor-pointer "
          >
            {isSidebarCollapsed ? <PanelLeft /> : <PanelLeftClose />}
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          {/* Botón de menú para móvil */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="md:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <SheetHeader className="h-0 overflow-hidden">
                <SheetTitle className="sr-only">Menú Principal</SheetTitle>
              </SheetHeader>

              <div className="flex h-16 items-center border-b px-6">
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                  <Package className="h-6 w-6" />
                  <span>Mi Empresa</span>
                </Link>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                          pathname === item.href && "bg-muted text-primary"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Aquí puedes añadir otros elementos del header, como el perfil del usuario */}
          <div className="ml-auto">
            {/* ... Botón de perfil, etc. ... */}
          </div>
        </header>

        {/* --- Contenido Principal --- */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}