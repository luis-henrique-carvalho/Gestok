import {
    PageActions,
    PageContainer,
    PageContent,
    PageDescription,
    PageHeader,
    PageHeaderContent,
    PageTitle,
} from "@/components/layout/page-container";
import { DataTable } from "@/components/ui/data-table";
import { requireFullAuth } from "@/lib/auth-utils";
import { getStockMovements } from "./actions/index";
import { columns } from "./components/table/table-columns";
import AddStockMovementButton from "./components/add-stock-movement-button";
import DynamicPagination from "@/components/layout/dinamic-pagination";
import { redirect } from "next/navigation";

const DEFAULT_LIMIT = 10;

interface StockMovementsPageProps {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
}

export default async function StockMovementsPage({ searchParams }: StockMovementsPageProps) {
    await requireFullAuth();

    const { query, page } = await searchParams;

    if (!page) {
        return redirect("/stock-movements?page=1");
    }

    const { data } = await getStockMovements({
        limit: String(DEFAULT_LIMIT),
        page: String(query ? 1 : page),
    });

    if (!data?.stockMovements) {
        return (
            <PageContainer>
                <PageHeader>
                    <PageHeaderContent>
                        <PageTitle>Movimentações de Estoque</PageTitle>
                        <PageDescription>
                            Gerencie as entradas e saídas de produtos no estoque
                        </PageDescription>
                    </PageHeaderContent>
                    <PageActions>
                        <AddStockMovementButton />
                    </PageActions>
                </PageHeader>
                <PageContent>
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">
                            Erro ao carregar movimentações de estoque. Tente novamente.
                        </p>
                    </div>
                </PageContent>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Movimentações de Estoque</PageTitle>
                    <PageDescription>
                        Gerencie as entradas e saídas de produtos no estoque
                    </PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <AddStockMovementButton />
                </PageActions>
            </PageHeader>
            <PageContent>
                <DataTable
                    columns={columns}
                    data={data?.stockMovements?.map((m) => ({
                        ...m,
                        createdAt: new Date(m.createdAt),
                        updatedAt: new Date(m.updatedAt),
                    })) || []}
                />
                <div className="mt-6">
                    <DynamicPagination
                        currentPage={data?.pagination?.page || 1}
                        totalPages={Math.max(data?.pagination?.totalPages || 1, 1)}
                    />
                </div>
            </PageContent>
        </PageContainer>
    );
}
