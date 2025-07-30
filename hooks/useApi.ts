// Importamos una librería para manejar cookies desde el cliente
import Cookies from 'js-cookie';

// Función wrapper para fetch que añade automáticamente el token de autenticación
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    // Obtenemos el token desde localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  
    // Creamos las cabeceras por defecto
    const headers = new Headers(options.headers || {});
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
  
    // Si tenemos un token, lo añadimos a la cabecera de Authorization
    if (token) {
      headers.set('Authorization', `Bearer ${token}`); // AdonisJS espera "Bearer <token>"
    }
  
    // Hacemos la petición con las nuevas cabeceras
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      ...options,
      headers,
    });
  
    // Si la respuesta es 401 (No Autorizado), significa que el token es inválido o expiró.
    // Aquí podemos limpiar la sesión y redirigir al login.
    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      Cookies.remove('session_active');
      // Redirigir al login. Como esto es una librería, la redirección es mejor manejarla donde se llama la función.
      window.location.href = '/login'; 
      // Lanzamos un error para detener la ejecución posterior
      throw new Error('Sesión expirada o inválida.');
    }
  
    return response;
}

// Función wrapper para fetch que elimina la sesion de autenticación
export async function fetchWithAuthLogout(url: string, options: RequestInit = {}) {
  // Obtenemos el token desde localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

  // Creamos las cabeceras por defecto
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  // Si tenemos un token, lo añadimos a la cabecera de Authorization
  if (token) {
    headers.set('Authorization', token); // AdonisJS espera "Bearer <token>"
  }

  // Hacemos la petición con las nuevas cabeceras
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers,
  });

  // Si la respuesta es 401 (No Autorizado), significa que el token es inválido o expiró.
  // Aquí podemos limpiar la sesión y redirigir al login.
  if (response.status === 401 || response.status === 200) {
    // 1. Elimina el token del localStorage
    localStorage.removeItem('auth_token');

    // 2. Elimina la cookie que usa el middleware
    Cookies.remove('session_active', { path: '/' });

    // Redirigir al login. Como esto es una librería, la redirección es mejor manejarla donde se llama la función.
    window.location.href = '/login'; 
    // Lanzamos un error para detener la ejecución posterior
    throw new Error('Sesión expirada o inválida.');
  }

  return response;
}