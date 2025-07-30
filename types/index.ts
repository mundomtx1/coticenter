export type CreditTransaction = {
    credito_factura_id: number;
    usuario: string;
    numero_factura: string;
    precio: string; // Es un string, lo trataremos como número para formatear
    comision: string; // También es string
    creditos: number;
    creditos_pretty: string;
    creditos_usados: number;
    creditos_usados_pretty: string;
    estatu_credito: number; // Podríamos mapear esto a un texto
    ref_stripe: string;
    created_at: string;
};

export type DashboardStatsData = {
    total_credito: number;
    total_credito_pretty: string;
    total_credito_usados: number;
    total_credito_usados_pretty: string;
    total_usuarios: number;
};

export type MovementTransaction = {
    creditos: number;
    credito_pretty: string;
    factura_id: number | null;
    tipo_transacciones_id: number;
    tipo_transaccion: "Ingreso" | "Egreso" | string; // Hacemos string por si hay otros tipos
    created_at: string;
};

export type ClientesTransaction = {
    usuario: string;
    nombre: string;
    apellido: string;
    email: string;
    estatus: number;
    estatus_nombre: string;
    id: number;
    created_at: string;
};

export type Afiliados = {
    id: number;
    usuario: string;
    nombre: string;
    apellido: string;
    email: string;
    activo: boolean;
    autorizado: boolean;
    estatus: number;
    estatus_nombre: string;
    created_at: string;
};