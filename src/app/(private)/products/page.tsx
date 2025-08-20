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
import { getProducts } from "./actions";
import { columns } from "./components/table/table-columns";
import AddProductButton from "./components/add-product-button";
import DynamicPagination from "@/components/layout/dinamic-pagination";
import SearchInput from "@/components/layout/search-input";
import { redirect } from "next/navigation";

const DEFAULT_LIMIT = 10;

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    await requireFullAuth();

    const { query, page } = await searchParams;

    if (!page) {
        return redirect("/products?page=1");
    }

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
}
