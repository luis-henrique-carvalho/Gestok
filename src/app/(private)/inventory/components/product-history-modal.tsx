"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, TrendingUp, TrendingDown } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { getProductHistory } from "../actions";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

interface ProductHistoryModalProps {
    productId: number;
    productName: string;
}

export function ProductHistoryModal({ productId, productName }: ProductHistoryModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const { execute, result, isExecuting } = useAction(getProductHistory, {
        onSuccess: () => {
            // Modal já está aberto, não precisa fazer nada
        },
    });

    const handleOpen = () => {
        setIsOpen(true);
        execute({ productId, page: 1, limit: 10 });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        execute({ productId, page, limit: 10 });
    };

    const data = result.data?.data;
    const movements = data?.movements || [];
    const pagination = data?.pagination;

    const getMovementReasonLabel = (reason: string) => {
        switch (reason) {
            case "supplier_purchase":
                return "Compra do Fornecedor";
            case "customer_sale":
                return "Venda ao Cliente";
            case "stock_replenishment":
                return "Reposição de Estoque";
            default:
                return reason;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleOpen}>
                    <Eye className="mr-2 h-4 w-4" />
                    Ver histórico completo
                </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Histórico de Movimentações</DialogTitle>
                    <DialogDescription>
                        Histórico completo de movimentações para: <strong>{productName}</strong>
                    </DialogDescription>
                </DialogHeader>

                {isExecuting ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="text-muted-foreground">Carregando histórico...</div>
                    </div>
                ) : movements.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">
                            Nenhuma movimentação encontrada para este produto.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Data</TableHead>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead>Quantidade</TableHead>
                                    <TableHead>Motivo</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {movements.map((movement) => (
                                    <TableRow key={movement.id}>
                                        <TableCell>
                                            {dayjs(movement.createdAt).format("DD/MM/YYYY HH:mm")}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {movement.movementType === "in" ? (
                                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                                ) : (
                                                    <TrendingDown className="h-4 w-4 text-red-600" />
                                                )}
                                                <Badge variant={movement.movementType === "in" ? "default" : "secondary"}>
                                                    {movement.movementType === "in" ? "Entrada" : "Saída"}
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <span className={movement.movementType === "in" ? "text-green-600" : "text-red-600"}>
                                                {movement.movementType === "in" ? "+" : "-"}{movement.quantity}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {getMovementReasonLabel(movement.movementReason)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {pagination && pagination.totalPages > 1 && (
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                    Página {pagination.page} de {pagination.totalPages}
                                    ({pagination.totalItems} movimentações)
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={pagination.page <= 1}
                                        onClick={() => handlePageChange(pagination.page - 1)}
                                    >
                                        Anterior
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={pagination.page >= pagination.totalPages}
                                        onClick={() => handlePageChange(pagination.page + 1)}
                                    >
                                        Próxima
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
