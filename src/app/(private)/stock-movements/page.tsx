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

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

interface StockMovementsPageProps {
    searchParams: {
        page?: string;
        limit?: string;
    }
}

export default async function StockMovementsPage({ searchParams }: StockMovementsPageProps) {
    await requireFullAuth();

    const currentPage = Number(searchParams.page) || DEFAULT_PAGE;
    const currentLimit = Number(searchParams.limit) || DEFAULT_LIMIT;

    const stockMovementsResult = await getStockMovements({ limit: currentLimit, page: currentPage });
    const stockMovements = stockMovementsResult.data;

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
                    data={stockMovements?.data?.map((m) => ({
                        ...m,
                        createdAt: new Date(m.createdAt),
                        updatedAt: new Date(m.updatedAt),
                    })) || []}
                />
                <div className="mt-6">
                    <DynamicPagination
                        currentPage={stockMovements?.page || 1}
                        totalPages={Math.max(stockMovements?.totalPages || 1, 1)}
                    />
                </div>
            </PageContent>
        </PageContainer>
    );
}
