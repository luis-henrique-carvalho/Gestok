"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis
} from "@/components/ui/pagination";
import { useQueryState } from "nuqs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface DynamicPaginationProps {
    currentPage: number;
    totalPages: number;
}

function DynamicPagination({ currentPage, totalPages }: DynamicPaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [page, setPage] = useQueryState("page", {
        parse: (value) => parseInt(value) || 1,
        serialize: (value) => value.toString(),
    });

    // Sincroniza o estado local com os searchParams
    useEffect(() => {
        if (page !== currentPage) {
            setPage(currentPage);
        }
    }, [currentPage, page, setPage]);

    const getVisiblePages = () => {
        const delta = 2;
        const pages = [];

        // Calcula o range de páginas ao redor da página atual
        const start = Math.max(1, currentPage - delta);
        const end = Math.min(totalPages, currentPage + delta);

        // Adiciona a primeira página se não estiver no range
        if (start > 1) {
            pages.push(1);
            if (start > 2) {
                pages.push("...");
            }
        }

        // Adiciona o range de páginas
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        // Adiciona a última página se não estiver no range
        if (end < totalPages) {
            if (end < totalPages - 1) {
                pages.push("...");
            }
            pages.push(totalPages);
        }

        return pages;
    };

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages || newPage === currentPage) {
            return;
        }

        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>

                {getVisiblePages().map((page, index) => (
                    <PaginationItem key={index}>
                        {page === "..." ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                onClick={() => handlePageChange(page as number)}
                                isActive={currentPage === page}
                                className="cursor-pointer"
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default DynamicPagination;
