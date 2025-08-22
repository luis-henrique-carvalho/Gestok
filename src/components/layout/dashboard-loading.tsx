import { Skeleton } from "@/components/ui/skeleton";
import {
    PageContainer,
    PageContent,
    PageDescription,
    PageHeader,
    PageHeaderContent,
    PageTitle,
} from "@/components/layout/page-container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DashboardLoading = () => {
    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Dashboard</PageTitle>
                    <PageDescription>Tenha a visão geral do seu negócio</PageDescription>
                </PageHeaderContent>
            </PageHeader>

            <PageContent>
                {/* Stats Cards Skeleton */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Card key={index} className="transition-all duration-200">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="space-y-1">
                                    <Skeleton className="h-4 w-24" />
                                </div>
                                <Skeleton className="h-10 w-10 rounded-lg" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-8 w-16 mb-1" />
                                <Skeleton className="h-3 w-32" />
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Charts and Table Grid Skeleton */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2.25fr_1fr]">
                    {/* Area Chart Skeleton */}
                    <Card className="pt-0">
                        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                            <div className="grid flex-1 gap-1">
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-4 w-64" />
                            </div>
                        </CardHeader>
                        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                            <Skeleton className="h-[250px] w-full rounded-md" />
                        </CardContent>
                    </Card>

                    {/* Table Skeleton */}
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-4 w-48" />
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>
                                                <Skeleton className="h-4 w-16" />
                                            </TableHead>
                                            <TableHead>
                                                <Skeleton className="h-4 w-12" />
                                            </TableHead>
                                            <TableHead>
                                                <Skeleton className="h-4 w-20" />
                                            </TableHead>
                                            <TableHead>
                                                <Skeleton className="h-4 w-16" />
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Skeleton className="h-4 w-24" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton className="h-6 w-16 rounded-full" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton className="h-4 w-12" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton className="h-4 w-20" />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </PageContent>
        </PageContainer>
    );
};

export default DashboardLoading;
