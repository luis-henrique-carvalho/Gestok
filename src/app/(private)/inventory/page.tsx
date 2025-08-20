import {
    PageContainer,
    PageContent,
    PageDescription,
    PageHeader,
    PageHeaderContent,
    PageTitle,
} from "@/components/layout/page-container";
import { DataTable } from "@/components/ui/data-table";
import { requireFullAuth } from "@/lib/auth-utils";
import { getInventory } from "./actions";
import { columns } from "./components/table/table-columns";
import DynamicPagination from "@/components/layout/dinamic-pagination";
import SearchInput from "@/components/layout/search-input";
import { Suspense } from "react";
import { InvoicesTableSkeleton } from "./components/invoices-table-skeleton";
import { redirect } from "next/navigation";

const DEFAULT_LIMIT = 10;
interface InventoryPageProps {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
}

const InventoryPage = async ({ searchParams }: InventoryPageProps) => {
    await requireFullAuth();
    const { query, page } = await searchParams;

    if (!page) {
        return redirect("/inventory?page=1");
    }

    const { data } = await getInventory({
        limit: String(DEFAULT_LIMIT),
        page: String(query ? 1 : page),
        query,
    });

    if (!data?.inventory) {
        return (
            <PageContainer>
                <PageHeader>
                    <PageHeaderContent>
                        <PageTitle>Inventário</PageTitle>
                        <PageDescription>
                            Gerencie seus produtos e estoque
                        </PageDescription>
                    </PageHeaderContent>
                </PageHeader>
                <PageContent>
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">
                            Erro ao carregar inventário. Tente novamente.
                        </p>
                    </div>
                </PageContent>
            </PageContainer>
        );
    }

    const inventory = data.inventory;

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Inventário</PageTitle>
                    <PageDescription>
                        Gerencie seus produtos e estoque
                    </PageDescription>
                </PageHeaderContent>
            </PageHeader>
            <PageContent>
                <Suspense
                    key={`${query ?? ''}-${page ?? ''}`}
                    fallback={<InvoicesTableSkeleton />}
                >
                    <SearchInput
                        placeholder="Buscar produtos..."
                    />
                    <DataTable
                        columns={columns}
                        data={inventory}
                    />
                    <DynamicPagination
                        currentPage={data.pagination.page}
                        totalPages={Math.max(data.pagination.totalPages, 1)}
                    />
                </Suspense>
            </PageContent>
        </PageContainer>
    );
}

export default InventoryPage;
