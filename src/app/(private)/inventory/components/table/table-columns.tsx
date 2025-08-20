"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductHistoryModal } from "../product-history-modal";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

type Product = {
    id: number;
    name: string;
    sku: string;
    categoryName: string;
    currentStock: number;
}

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
        id: "categoryName",
        header: "Categoria",
        accessorKey: "categoryName",
    },
    {
        id: "currentStock",
        header: "Estoque Atual",
        accessorKey: "currentStock",
        cell: (params) => {
            const stock = params.row.original.currentStock;

            return (
                <span className={stock > 0 ? "text-green-600" : "text-red-600"}>
                    {stock > 0 ? "+" : ""}{stock} un
                </span>
            );
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
