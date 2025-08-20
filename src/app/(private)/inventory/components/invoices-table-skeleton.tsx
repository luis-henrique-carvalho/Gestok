import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function InvoicesTableSkeleton() {
    return (
        <div className="space-y-4">
            {/* Search Input Skeleton */}
            <div className="flex items-center space-x-2">
                <Skeleton className="h-10 w-[300px]" />
            </div>

            {/* Table Skeleton */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Skeleton className="h-4 w-12" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="h-4 w-16" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="h-4 w-20" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="h-4 w-24" />
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
                                    <Skeleton className="h-4 w-16" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-32" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-20" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-12" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-8 w-16" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Skeleton */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                </div>
            </div>
        </div>
    );
}
