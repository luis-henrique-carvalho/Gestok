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

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

interface ProductsPageProps {
    searchParams: {
        page?: string;
        limit?: string;
        search?: string;
    }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    await requireFullAuth();

    const params = await searchParams
    const currentPage = params.page || DEFAULT_PAGE;
    const currentLimit = params?.limit || DEFAULT_LIMIT;
    const searchName = params?.search || "";

    const productsResult = await getProducts({
        limit: currentLimit,
        page: currentPage,
        searchName,
    });

    if (!productsResult.data) {
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

    const products = productsResult.data;

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
                <DataTable
                    columns={columns}
                    data={(products.data ?? []).map((p) => ({
                        ...p,
                        createdAt: new Date(p.createdAt),
                        updatedAt: new Date(p.updatedAt),
                    }))}
                />
                <div className="mt-6">
                    <DynamicPagination
                        currentPage={products.page || DEFAULT_PAGE}
                        totalPages={Math.max(products.totalPages || 1, 1)}
                    />
                </div>
            </PageContent>
        </PageContainer>
    );
}
