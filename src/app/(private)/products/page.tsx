import React, { Suspense } from "react";
import { requireFullAuth } from "@/lib/auth-utils";
import ProductsContent from "./components/products-content";
import PagesLoading from "@/components/layout/pages-loading";

interface ProductsPageProps {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
    await requireFullAuth();

    const { query, page } = await searchParams;

    return (
        <Suspense fallback={<PagesLoading
            title="Produtos"
            description="Gerencie seus produtos e estoque"
            showActions={true}
            showSearch={true}
            columns={6}
            rows={10}
        />}>
            <ProductsContent query={query} page={page || "1"} />
        </Suspense>
    );
};

export default ProductsPage;
