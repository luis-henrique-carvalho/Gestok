import { Skeleton } from "@/components/ui/skeleton";
import {
    PageActions,
    PageContainer,
    PageContent,
    PageDescription,
    PageHeader,
    PageHeaderContent,
    PageTitle,
} from "@/components/layout/page-container";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PagesLoadingProps {
    title?: string;
    description?: string;
    showActions?: boolean;
    showSearch?: boolean;
    columns?: number;
    rows?: number;
}

const PagesLoading = ({
    title = "Carregando...",
    description = "Aguarde enquanto carregamos os dados",
    showActions = false,
    showSearch = true,
    columns = 5,
    rows = 10,
}: PagesLoadingProps) => {
    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>{title}</PageTitle>
                    <PageDescription>{description}</PageDescription>
                </PageHeaderContent>
                {showActions && (
                    <PageActions>
                        <Skeleton className="h-10 w-[140px]" />
                    </PageActions>
                )}
            </PageHeader>

            <PageContent>
                {/* Search Input Skeleton */}
                {showSearch && (
                    <div className="mb-4">
                        <Skeleton className="h-10 w-[300px]" />
                    </div>
                )}

                {/* Table Skeleton */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {Array.from({ length: columns }).map((_, index) => (
                                    <TableHead key={index}>
                                        <Skeleton className="h-4 w-16" />
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: rows }).map((_, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {Array.from({ length: columns }).map((_, colIndex) => (
                                        <TableCell key={colIndex}>
                                            {colIndex === columns - 1 ? (
                                                // Last column usually has actions/buttons
                                                <div className="flex items-center space-x-2">
                                                    <Skeleton className="h-8 w-8" />
                                                    <Skeleton className="h-8 w-8" />
                                                </div>
                                            ) : (
                                                <Skeleton className="h-4 w-24" />
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination Skeleton */}
                <div className="mt-6 flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                    </div>
                </div>
            </PageContent>
        </PageContainer>
    );
};

export default PagesLoading;
