import React from "react";
import {
    PageContainer,
    PageContent,
    PageDescription,
    PageHeader,
    PageHeaderContent,
    PageTitle,
} from "@/components/layout/page-container";
import { DataTable } from "@/components/ui/data-table";
import { getInventory } from "../actions";
import { columns } from "./table/table-columns";
import DynamicPagination from "@/components/layout/dinamic-pagination";
import SearchInput from "@/components/layout/search-input";

const DEFAULT_LIMIT = 10;

interface InventoryContentProps {
    query?: string;
    page?: string;
}

const InventoryContent = async ({ query, page }: InventoryContentProps) => {
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
                <SearchInput
                    placeholder="Buscar produtos..."
                />
                <DataTable
                    columns={columns}
                    data={inventory}
                />
                <div className="mt-6">
                    <DynamicPagination
                        currentPage={data.pagination.page}
                        totalPages={Math.max(data.pagination.totalPages, 1)}
                    />
                </div>
            </PageContent>
        </PageContainer>
    );
};

export default InventoryContent;
