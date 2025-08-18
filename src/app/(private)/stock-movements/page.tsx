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

export default async function StockMovementsPage() {
    await requireFullAuth();

    const stockMovementsResult = await getStockMovements({ limit: 10, offset: 0 });
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
                    data={(stockMovements?.data?.data ?? []).map((m) => ({
                        ...m,
                        createdAt: new Date(m.createdAt),
                        updatedAt: new Date(m.updatedAt),
                    }))}
                />
            </PageContent>
        </PageContainer>
    );
}
