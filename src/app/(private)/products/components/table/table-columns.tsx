"use client";

import { ColumnDef } from "@tanstack/react-table";

import TableActions from "./table-actions";
import { productTable } from "@/drizzle/schema";

type Product = typeof productTable.$inferSelect & {
  category?: {
    id: number;
    name: string;
  } | null;
  user?: {
    id: string;
    name: string;
  } | null;
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "name",
    header: "Nome",
    accessorKey: "name",
  },
  {
    id: "price",
    header: "Preço",
    accessorKey: "price",
    cell: (params) => {
      const price = Number(params.row.original.price);

      return price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  {
    id: "sku",
    header: "SKU",
    accessorKey: "sku",
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
    id: "user",
    header: "Usuário",
    accessorKey: "user.name",
  },
  {
    id: "actions",
    header: "Ações",
    accessorKey: "actions",
    cell: (params) => {
      const product = params.row.original;

      return <TableActions product={product} />;
    },
  },
];
