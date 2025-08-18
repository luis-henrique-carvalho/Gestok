"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

import TableActions from "./table-actions";
import { stockMovementsTable } from "@/drizzle/schema";

type StockMovement = typeof stockMovementsTable.$inferSelect & {
    product?: {
        id: number;
        name: string;
        sku: string;
    } | null;
    user?: {
        id: string;
        name: string;
    } | null;
};

export const columns: ColumnDef<StockMovement>[] = [
    {
        id: "product",
        header: "Produto",
        accessorKey: "productId",
        cell: (params) => {
            const product = params.row.original.product;
            return product ? `${product.name} (${product.sku})` : "Produto não encontrado";
        },
    },
    {
        id: "quantity",
        header: "Quantidade",
        accessorKey: "quantity",
        cell: (params) => {
            const quantity = params.row.original.quantity;
            const movementType = params.row.original.movementType;

            return (
                <span className={movementType === "out" ? "text-red-600" : "text-green-600"}>
                    {movementType === "out" ? "-" : "+"}{quantity}
                </span>
            );
        },
    },
    {
        id: "movementType",
        header: "Tipo",
        accessorKey: "movementType",
        cell: (params) => {
            const movementType = params.row.original.movementType;

            return (
                <Badge variant={movementType === "in" ? "default" : "destructive"}>
                    {movementType === "in" ? "Entrada" : "Saída"}
                </Badge>
            );
        },
    },
    {
        id: "movementReason",
        header: "Motivo",
        accessorKey: "movementReason",
        cell: (params) => {
            const reason = params.row.original.movementReason;

            const reasonLabels = {
                supplier_purchase: "Compra de Fornecedor",
                customer_sale: "Venda para Cliente",
                stock_replenishment: "Reposição de Estoque",
            };

            return reasonLabels[reason as keyof typeof reasonLabels] || reason;
        },
    },
    {
        id: "createdAt",
        header: "Data",
        accessorKey: "createdAt",
        cell: (params) => {
            const date = new Date(params.row.original.createdAt);
            return date.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        },
    },
    {
        id: "actions",
        header: "Ações",
        accessorKey: "actions",
        cell: (params) => {
            const stockMovement = params.row.original;

            return <TableActions stockMovement={stockMovement} />;
        },
    },
];
