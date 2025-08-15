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

export default async function ProductsPage() {
    await requireFullAuth();

    const productsResult = await getProducts({});
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
                    data={(products?.data ?? []).map((p) => ({
                        ...p,
                        createdAt: new Date(p.createdAt),
                        updatedAt: new Date(p.updatedAt),
                    }))}
                />
            </PageContent>
        </PageContainer>
    );
}
