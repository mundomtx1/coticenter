// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Importamos una librería para manejar cookies desde el cliente
import Cookies from 'js-cookie';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/login-admin`; 

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.result) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // 1. Extraemos el token de la respuesta
      const token = data.data.token;

      // 2. Guardamos el token en localStorage para usarlo en las peticiones de API
      localStorage.setItem('auth_token', token);

      // 3. Guardamos un "flag" en una cookie para que el Middleware pueda verlo.
      //    No guardamos el token completo en la cookie por seguridad y tamaño.
      //    Simplemente una indicación de que el usuario está logueado.
      Cookies.set('session_active', 'true', { expires: 1/24, path: '/' }); // Expira en 1 hora

      // El backend de AdonisJS ya ha establecido la cookie.
      // Next.js solo necesita redirigir.
      router.push("/dashboard");

    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Por favor, introduce tus credenciales para continuar.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 py-2">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="p-6">
            <Button className="w-full cursor-pointer" type="submit" disabled={isLoading}>
              {isLoading ? "Iniciando..." : "Iniciar Sesión"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}