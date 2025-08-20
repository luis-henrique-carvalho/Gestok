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
import { getInventory } from "./actions";
import { columns } from "./components/table/table-columns";
import { SearchInventory } from "./components/search-inventory";
import DynamicPagination from "@/components/layout/dinamic-pagination";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

interface InventoryPageProps {
    searchParams: {
        page?: string;
        limit?: string;
        search?: string;
    }
}

export default async function InventoryPage({ searchParams }: InventoryPageProps) {
    await requireFullAuth();

    const params = await searchParams
    const currentPage = params.page || DEFAULT_PAGE;
    const currentLimit = params?.limit || DEFAULT_LIMIT;
    const searchName = params?.search || "";

    const inventoryResult = await getInventory({
        limit: String(currentLimit),
        page: String(currentPage),
        searchName,
    });

    if (!inventoryResult.data?.success || !inventoryResult.data.data) {
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

    const inventory = inventoryResult.data.data;

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
                <div className="mb-4">
                    <SearchInventory />
                </div>
                <DataTable
                    columns={columns}
                    data={inventory.data.map((item) => {
                        // Determinar o status do estoque
                        let stockStatus = "Normal";
                        if (item.currentStock <= 0) {
                            stockStatus = "Sem estoque";
                        } else if (item.currentStock <= 5) {
                            stockStatus = "Estoque baixo";
                        }

                        return {
                            ...item,
                            createdAt: new Date(item.createdAt),
                            updatedAt: new Date(item.updatedAt),
                            stockStatus,
                            category: item.categoryName ? { id: item.categoryId || 0, name: item.categoryName } : null,
                            user: null, // Não precisamos do user na tabela
                        };
                    })}
                />
                <div className="mt-6">
                    <DynamicPagination
                        currentPage={inventory.page}
                        totalPages={Math.max(inventory.totalPages, 1)}
                    />
                </div>
            </PageContent>
        </PageContainer>
    );
}
