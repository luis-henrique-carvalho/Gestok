"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { productTable, stockMovementsTable } from "@/drizzle/schema";
import { ProductHistoryModal } from "../product-history-modal";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

type Product = typeof productTable.$inferSelect & {
    category?: {
        id: number;
        name: string;
    } | null;
    user?: {
        id: string;
        name: string;
    } | null;
    currentStock: number;
    stockStatus: string;
};

export const columns: ColumnDef<Product>[] = [
    {
        id: "sku",
        header: "SKU",
        accessorKey: "sku",
    },
    {
        id: "name",
        header: "Nome",
        accessorKey: "name",
    },
    {
        id: "category",
        header: "Categoria",
        accessorKey: "categoryId",
        cell: (params) => {
            const categoryName = params.row.original.category?.name;
            return categoryName ? categoryName : "Sem categoria";
        },
    },
    {
        id: "currentStock",
        header: "Estoque Atual",
        accessorKey: "currentStock",
        cell: (params) => {
            const stock = params.row.original.currentStock;
            return `${stock} un`;
        },
    },
    {
        id: "stockStatus",
        header: "Status",
        accessorKey: "stockStatus",
        cell: (params) => {
            const status = params.row.original.stockStatus;
            let variant: "default" | "secondary" | "destructive" | "outline" = "default";

            switch (status) {
                case "Sem estoque":
                    variant = "destructive";
                    break;
                case "Estoque baixo":
                    variant = "secondary";
                    break;
                default:
                    variant = "default";
            }

            return <Badge variant={variant}>{status}</Badge>;
        },
    },
    {
        id: "actions",
        header: "Ações",
        accessorKey: "actions",
        cell: (params) => {
            const product = params.row.original;

            return (
                <ProductHistoryModal
                    productId={product.id}
                    productName={product.name}
                />
            );
        },
    },
];
