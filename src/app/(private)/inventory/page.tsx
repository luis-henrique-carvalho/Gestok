import React, { Suspense } from "react";
import { requireFullAuth } from "@/lib/auth-utils";
import InventoryContent from "./components/inventory-content";
import PagesLoading from "@/components/layout/pages-loading";

interface InventoryPageProps {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
}

const InventoryPage = async ({ searchParams }: InventoryPageProps) => {
    await requireFullAuth();

    const { query, page } = await searchParams;

    return (
        <Suspense fallback={<PagesLoading
            title="Inventário"
            description="Gerencie seus produtos e estoque"
            showActions={false}
            showSearch={true}
            columns={5}
            rows={10}
        />}>
            <InventoryContent query={query} page={page || "1"} />
        </Suspense>
    );
};

export default InventoryPage;
