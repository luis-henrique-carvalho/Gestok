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
import { getProducts } from "../actions";
import { columns } from "./table/table-columns";
import AddProductButton from "./add-product-button";
import DynamicPagination from "@/components/layout/dinamic-pagination";
import SearchInput from "@/components/layout/search-input";

const DEFAULT_LIMIT = 10;

interface ProductsContentProps {
    query?: string;
    page?: string;
}

const ProductsContent = async ({ query, page }: ProductsContentProps) => {
    const { data } = await getProducts({
        limit: String(DEFAULT_LIMIT),
        page: String(query ? 1 : page),
        query,
    });

    if (!data?.products) {
        return (
            <PageContainer>
                <PageHeader>
                    <PageHeaderContent>
                        <PageTitle>Produtos</PageTitle>
                        <PageDescription>
                            Gerencie seus produtos e estoque
                        </PageDescription>
                    </PageHeaderContent>
                    <PageActions>
                        <AddProductButton />
                    </PageActions>
                </PageHeader>
                <PageContent>
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">
                            Erro ao carregar produtos. Tente novamente.
                        </p>
                    </div>
                </PageContent>
            </PageContainer>
        );
    }

    const products = data.products;

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Produtos</PageTitle>
                    <PageDescription>
                        Gerencie seus produtos e estoque
                    </PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <AddProductButton />
                </PageActions>
            </PageHeader>
            <PageContent>
                <SearchInput
                    placeholder="Buscar produtos..."
                />
                <DataTable
                    columns={columns}
                    data={(products).map((p) => ({
                        ...p,
                        createdAt: new Date(p.createdAt),
                        updatedAt: new Date(p.updatedAt),
                    }))}
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

export default ProductsContent;
