import React from "react";
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
import { getStockMovements } from "../actions";
import { columns } from "./table/table-columns";
import AddStockMovementButton from "./add-stock-movement-button";
import DynamicPagination from "@/components/layout/dinamic-pagination";

const DEFAULT_LIMIT = 10;

interface StockMovementsContentProps {
    query?: string;
    page?: string;
}

const StockMovementsContent = async ({ query, page }: StockMovementsContentProps) => {
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
};

export default StockMovementsContent;
