// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
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
import logo from "@/assets/images/logo.svg"


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

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`; 

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
    <main 
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1724235858460-25d5504d952a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
      <div className="flex items-center justify-center min-h-screen w-full bg-black/10">

        <Card className="w-full max-w-sm">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl mx-autos">
                <Image 
                  src={logo} 
                  alt="Coticenter" 
                  width={180} 
                  height={40}
                  className="mx-20"
                />
              </CardTitle>
              <CardDescription className="text-center">
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
                  placeholder="Correo electrónico"
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
                  placeholder="Contraseña"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="p-6">
              <Button className="w-full bg-cyan-800 hover:bg-cyan-900 text-white cursor-pointer" type="submit" disabled={isLoading}>
                {isLoading ? "Iniciando..." : "Iniciar Sesión"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      
      </div>
    </main>
  );
}