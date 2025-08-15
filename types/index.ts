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
    prospects: number;
    clients: string;
};

export type MovementTransaction = {
    creditos: number;
    credito_pretty: string;
    factura_id: number | null;
    tipo_transacciones_id: number;
    tipo_transaccion: "Ingreso" | "Egreso" | string; // Hacemos string por si hay otros tipos
    created_at: string;
};

export type Cliente = {
    id: number;
    name: string;
    lastname: string;
    email: string;
    document: string;
    phone: string;
    address: string;
    status_id: number;
    status_name: string;
    type_id: number;
    type_name: string;
    created_at: string;
    updated_at: string;
};

export type ClienteEditar = {
    name: string;
	lastname: string;
	document: string;
	address: string;
	phone: string; 
	email: string;
	type_id: number;
	status_id: number;
}

export type ClienteCrear = {
    name: string;
	lastname: string;
	document: string;
	address: string;
	phone: string; 
	email: string;
	type_id: number;
}

export type Items = {
    id: number;
    name: string;
    description: string;
    price: string;
    descount: string;
    status_id: number;
    status_name: string;
    created_at: string;
    updated_at: string;
};

export type ItemsCrear = {
    name: string;
	description: string;
	price: number;
	descount: number;
}

export type ItemsEditar = {
    name: string;
	description: string;
	price: number;
	descount: number;
	status_id: number; 
}

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