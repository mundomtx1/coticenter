import '@tanstack/react-table'

declare module '@tanstack/react-table' {
    // Añadimos la propiedad 'displayName' a las meta-propiedades de la columna
    interface ColumnMeta<TData extends RowData, TValue> {
        displayName?: string
        viewMovements?: (transaction: CreditTransaction) => void; 
        viewAffiliates?: (clientId: number) => void;
        cellClassName?: string; 
    }
}