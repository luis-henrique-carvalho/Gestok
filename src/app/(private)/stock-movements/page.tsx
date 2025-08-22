import React, { Suspense } from "react";
import { requireFullAuth } from "@/lib/auth-utils";
import StockMovementsContent from "./components/stock-movements-content";
import PagesLoading from "@/components/layout/pages-loading";

interface StockMovementsPageProps {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
}

const StockMovementsPage = async ({ searchParams }: StockMovementsPageProps) => {
    await requireFullAuth();

    const { query, page } = await searchParams;

    return (
        <Suspense fallback={<PagesLoading
            title="Movimentações de Estoque"
            description="Gerencie as entradas e saídas de produtos no estoque"
            showActions={true}
            showSearch={false}
            columns={6}
            rows={10}
        />}>
            <StockMovementsContent query={query} page={page || "1"} />
        </Suspense>
    );
};

export default StockMovementsPage;
